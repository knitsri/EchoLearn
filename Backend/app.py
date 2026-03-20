# type: ignore
from flask import Flask, request, jsonify
# type: ignore
import requests
import tempfile
import base64
# type: ignore
from flask_cors import CORS
# type: ignore
from google import genai
import re,json
# type: ignore
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

MURF_API_KEY = os.getenv("MURF_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


client = genai.Client(api_key=GEMINI_API_KEY)


def generate_speech(text,voice_id,locale,rate,pitch,style) :
    url = "https://global.api.murf.ai/v1/speech/stream"
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
    headers = {
        "api-key": MURF_API_KEY,
        "Content-Type": "application/json"
    }

    data = {
    "voice_id": voice_id,
    "text": text,
    "locale": locale,
    "model": "FALCON",
    "format": "MP3",
    "sampleRate": 24000,
    "channelType": "MONO",
    "rate": rate,
    "pitch": pitch,
    "style": style
    }

    response = requests.post(url, headers=headers, json=data, stream=True)

    if response.status_code == 200:
        with open(temp_file.name, "wb") as f:
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:
                    f.write(chunk)
    else:
        print(f"Error: {response.status_code}")
    return temp_file

def generate_story(language):
    prompt = f"""
    Generate a bedtime story for kids in {language}.

    The story should:
    - Be 9 to 10 sentences long
    - Sound like a grandmother telling a story
    - Include suspense and curiosity
    - Use simple and easy words for kids
    - Add natural pauses using "..." frequently
    - Feel emotional, warm, and engaging
    - Not be too fast-paced

    The story should feel like:
    "Once upon a time... there was something mysterious..."

    Make it very engaging and magical.
    """
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    return response.text
     

@app.route("/api/speak",methods=["POST"])
def speak() :
    data = request.json
    name = data.get("text")
    category = data.get("category")


    if category == "reminder":
        final_text = f"Hello........ this is your reminder..... {name}...... please take action now..."
    elif category == "alphabets":
          final_text = name
    else:
        final_text = f"This is  ........... {name}."

   
    audio_file = generate_speech(final_text,"Isha","en-IN",0.5,5,"expressive")

    if not audio_file:
            return jsonify({"error": "Murf API failed"}), 500

    with open(audio_file.name, "rb") as f:
        audio_bytes = f.read()

    encoded_audio = base64.b64encode(audio_bytes).decode("utf-8")

    return jsonify({
        "audio_base64": encoded_audio
    })

@app.route("/api/speak/quiz",methods=["POST"])
def speak_quiz():
    try:
        text = request.json.get("text")

        audio_file = generate_speech(
            text,
            "Isha",
            "en-IN",
            -8,
            1.0,
            "Conversational"
        )

        if not audio_file:
            return jsonify({"error": "Audio generation failed"}), 500

        with open(audio_file.name, "rb") as f:
            audio_bytes = f.read()

        return jsonify({
            "audio": base64.b64encode(audio_bytes).decode("utf-8")
        })

    except Exception as e:
        print("Speech error:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/story", methods=["POST"])
def story():

    data = request.json
    language = data.get("language")
    story_text = generate_story(language)
    audio_file = generate_speech(story_text,"Isha","en-IN",0.7,0.9,"Narration")

    if not audio_file:
        return jsonify({"error": "Audio failed"}), 500
    with open(audio_file.name, "rb") as f:
        audio_bytes = f.read()

    encoded_audio = base64.b64encode(audio_bytes).decode("utf-8")

    return jsonify({
        "story": story_text,
        "audio_base64": encoded_audio
    })


@app.route("/api/explain", methods=["POST"])
def explain():

    data = request.json
    topic = data.get("topic")

    prompt = f"""
        You are a friendly and intelligent teacher who explains concepts in the most simple and engaging way.

        Explain the topic: "{topic}"

        Follow these rules strictly:

        1. Start with a simple, real-life analogy or short story that relates to the concept.
        2. Use that analogy to explain the concept step by step.
        3. Use very simple language so that even a beginner can understand.
        4. Avoid technical jargon unless absolutely necessary.
        5. If a difficult term is used, explain it immediately in simple words.
        6. Make the explanation feel like a conversation, not like a textbook.
        7. Add natural pauses using "..." to make it suitable for voice narration.
        8. Keep the tone warm, friendly, and slightly expressive (like a good teacher).
        9. Make the explanation detailed but easy to follow (around 8–12 sentences).
        10. End with a short summary in one sentence.

        Important:
        The explanation should feel like storytelling + teaching combined.

        Example style:
        "Imagine you are..."
        "Think of it like..."
        "Now slowly you can see..." 

        Make the explanation engaging and memorable.
        """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    explanation = response.text if response.text else "Sorry, couldn't explain."

    audio_file = generate_speech(explanation, "Isha", "en-IN",-12,0.9,"Conversational")

    with open(audio_file.name, "rb") as f:
        audio_bytes = f.read()

    encoded_audio = base64.b64encode(audio_bytes).decode("utf-8")

    return jsonify({
        "text": explanation,
        "audio_base64": encoded_audio
    })

def generate_quiz(topic):
  
    prompt = f"""
        Generate 5 MCQ questions on topic: {topic}

        STRICT FORMAT (valid JSON only):

        [
        {{
            "question": "Question text",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correct": "Option A",
            "explanation": "Simple explanation of the answer"
        }}
        ]

        Rules:
        - Return ONLY JSON
        - No text before or after JSON
        - Explanation must be present for every question
        """
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    text = response.text.strip()

    text = re.sub(r"```json|```", "", text)

    match = re.search(r"\[.*\]", text, re.DOTALL)

    if not match:
        print(" RAW RESPONSE:", text)
        return None

    try:
        return json.loads(match.group())
    except Exception as e:
        print("JSON PARSE ERROR:", e)
        return None


@app.route("/api/quiz", methods=["POST", "OPTIONS"])
def quiz():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200

    topic = request.json.get("topic")

    quiz_data = generate_quiz(topic)

    if not quiz_data:
        return jsonify({"error": "Quiz failed"}), 500

    return jsonify({"quiz": quiz_data})

app.run(debug=True)