#  EchoLearn – Voice-Based AI Learning Platform

EchoLearn is a voice-first AI learning platform designed to make learning simple, interactive, and engaging.

It transforms traditional learning into an immersive experience using storytelling, analogies, and real-time voice interaction.

---

##  Problem Statement

- Students often struggle to understand complex concepts due to traditional teaching methods.
- Kids require engaging and interactive learning instead of passive memorization.
- Lack of voice-based and personalized learning systems.

---

##  Solution

EchoLearn provides a voice-driven AI learning system where:

- Concepts are explained using stories and analogies
- Kids interact with learning through audio and visuals
- Users receive real-time voice responses

---

##  Features

###  Kids Mode
- Tap objects (fruits, animals, numbers) to hear their names
- Real-world animal sound interaction
- AI-generated bedtime stories
- Multi-language storytelling (English, Hindi, Telugu)

---

###  Students Mode

####  Concept Explainer
- Ask any topic
- AI explains using storytelling and analogies
- Voice-based explanation using Murf AI

#### 🧠 Quiz Generator
- Enter a topic
- AI generates questions dynamically
- Interactive answer selection

####  Smart Reminders
- Add study tasks with time
- Voice alerts for reminders
- Tasks auto-removed after completion

---

## ⚙️ Tech Stack

### Frontend
- HTML
- Tailwind CSS
- JavaScript

### Backend
- Python (Flask)

### APIs & AI
- Gemini API (content generation)
- Murf AI (text-to-speech)

---

## 🚀 How It Works

1. User gives input (topic / interaction)
2. Gemini AI generates content (story, explanation, quiz)
3. Murf AI converts text into voice
4. Frontend plays the audio output

---

## 📂 Project Structure


EchoLearn/
│── Frontend/
│── Backend/
│ ├── app.py
│ ├── requirements.txt
│ ├── .env (not included in repo)
│── README.md


---

## ⚡ How to Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/knitsri/EchoLearn.git
cd EchoLearn/Backend


2️⃣ Install dependencies
pip3 install -r requirements.txt


3️⃣ Create .env file

Inside the Backend folder, create a file named .env and add:

MURF_API_KEY=your_murf_api_key
GEMINI_API_KEY=your_gemini_api_key

4️⃣ Run backend server
python3 app.py

Server will start at:

http://127.0.0.1:5000


5️⃣ Run frontend

Open the frontend HTML files in your browser

Ensure backend is running before using features