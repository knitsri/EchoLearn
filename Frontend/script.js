console.log("Script loaded successfully");

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }
});

function protectRoute(requiresAuth) {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (requiresAuth && !isLoggedIn) {
        window.location.href = 'login.html';
    }
}
window.checkAuth = protectRoute;

function initTheme() {
    const htmlElement = document.documentElement;
    const btn = document.getElementById('theme-toggle');
    if (!htmlElement) return;

    const savedTheme = localStorage.getItem('echoTheme');
    if (savedTheme === 'light') {
        htmlElement.classList.remove('dark');
    } else {
        htmlElement.classList.add('dark');
    }

    if (btn) {
        btn.addEventListener('click', () => {
            const isDarkMode = htmlElement.classList.contains('dark');
            htmlElement.classList.add('transition-colors', 'duration-700');
            if (isDarkMode) {
                htmlElement.classList.remove('dark');
                localStorage.setItem('echoTheme', 'light');
            } else {
                htmlElement.classList.add('dark');
                localStorage.setItem('echoTheme', 'dark');
            }
        });
    }
}

function handleSignup(e) {
    if (e) e.preventDefault();
    console.log("Signup clicked");

    const nameEl = document.getElementById('signup-name');
    const emailEl = document.getElementById('signup-email');
    const passwordEl = document.getElementById('signup-password');

    if (!nameEl || !emailEl || !passwordEl) return;

    const name = nameEl.value;
    const email = emailEl.value;
    const password = passwordEl.value;

    localStorage.setItem('echoUser', JSON.stringify({ name, email, password }));
    window.location.href = 'login.html';
}

function handleLogin(e) {
    if (e) e.preventDefault();
    console.log("Login clicked");

    const emailEl = document.getElementById("login-email");
    const passwordEl = document.getElementById("login-password");

    if (!emailEl || !passwordEl) return;
    const email = emailEl.value;

    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("currentUser", email);
    window.location.href = "home.html";
}

function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// ------------------------
// Kids Mode Logic
// ------------------------


// Expanded objects with 9 items per category
const kidsObjects = {
    fruits: [
        { name: 'Apple', img: 'https://images.unsplash.com/photo-1584306670957-acf935f5033c?q=80&w=1286&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', color: 'red' },
        { name: 'Banana', img: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=400&q=80', color: 'yellow' },
        { name: 'Orange', img: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&q=80', color: 'orange' },
        { name: 'Strawberry', img: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80', color: 'pink' },
        { name: 'Grapes', img: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&q=80', color: 'purple' },
        { name: 'Watermelon', img: 'https://plus.unsplash.com/premium_photo-1674382739371-57254fd9a9e4?q=80&w=1227&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', color: 'green' },
        { name: 'Mango', img: 'https://images.unsplash.com/photo-1519096845289-95806ee03a1a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', color: 'yellow' },
        { name: 'Pineapple', img: 'https://images.unsplash.com/photo-1587883012610-e3df17d41270?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', color: 'yellow' },
        { name: 'Cherry', img: 'https://plus.unsplash.com/premium_photo-1688671923138-ff74e0f9a810?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', color: 'red' }
    ],
    veggies: [
        { name: 'Carrot', img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80', color: 'orange' },
        { name: 'Broccoli', img: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&q=80', color: 'green' },
        { name: 'Tomato', img: 'https://images.unsplash.com/photo-1444731961956-751ed90465a5?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', color: 'red' },
        { name: 'Cucumber', img: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400&q=80', color: 'green' },
        { name: 'Bell Pepper', img: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&q=80', color: 'red' },
        { name: 'Corn', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&q=80', color: 'yellow' },
        { name: 'Potato', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80', color: 'brown' },
        { name: 'Onion', img: 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=400&q=80', color: 'purple' },
        { name: 'Spinach', img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=2875&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', color: 'green' }
    ],
    numbers: [
        { name: 'One', img: 'https://i.pinimg.com/1200x/93/fe/a6/93fea6fdfccc59cec1898fcaac829ede.jpg', color: 'blue' },
        { name: 'Two', img: 'https://i.pinimg.com/1200x/c3/89/91/c389910a19c5acc92228a83b00fdd4e0.jpg', color: 'purple' },
        { name: 'Three', img: 'https://i.pinimg.com/1200x/12/be/ae/12beae3c92989b14b4faeda121acb297.jpg', color: 'green' },
        { name: 'Four', img: 'https://i.pinimg.com/736x/96/1f/0a/961f0af7afed6885887c57b03aac268c.jpg', color: 'orange' },
        { name: 'Five', img: 'https://i.pinimg.com/736x/96/56/8d/96568d6c451d79ef738ea44cce6acb6a.jpg', color: 'red' },
        { name: 'Six', img: 'https://i.pinimg.com/1200x/92/0c/e0/920ce0fd6aa58908b1c07e65f93cf469.jpg', color: 'pink' },
        { name: 'Seven', img: 'https://i.pinimg.com/1200x/2a/e8/42/2ae842988655d7980605600546cd2ecf.jpg', color: 'indigo' },
        { name: 'Eight', img: 'https://i.pinimg.com/736x/fa/2e/34/fa2e3405fec22fccd0c788e5c40763b0.jpg', color: 'violet' },
        { name: 'Nine', img: 'https://i.pinimg.com/1200x/ce/e7/93/cee793897a9856578d22cddc3f9b1795.jpg', color: 'cyan' }
    ],
    alphabets: [
        { name: 'A for Apple', img: 'https://i.pinimg.com/1200x/23/61/c9/2361c9b0105aa88901658a0c3698ea2e.jpg', color: 'red' },
        { name: 'B for Ball', img: 'https://i.pinimg.com/736x/3e/87/64/3e87649e104d35eb5d293a7cd6110737.jpg', color: 'blue' },
        { name: 'C for Cat', img: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80', color: 'orange' },
        { name: 'D for Dog', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80', color: 'brown' },
        { name: 'E for Elephant', img: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&q=80', color: 'gray' },
        { name: 'F for Fish', img: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=400&q=80', color: 'blue' },
        { name: 'G for Giraffe', img: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=400&q=80', color: 'yellow' },
        { name: 'H for House', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&q=80', color: 'red' },
        { name: 'I for Ice cream', img: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&q=80', color: 'pink' }
    ],
    animals: [
        { name: 'Lion', img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&q=80', color: 'orange' },
        { name: 'Elephant', img: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&q=80', color: 'gray' },
        { name: 'Giraffe', img: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=400&q=80', color: 'yellow' },
        { name: 'Monkey', img: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=400&q=80', color: 'brown' },
        { name: 'Zebra', img: 'https://i.pinimg.com/736x/ae/69/d3/ae69d3631d06e1aab1ee0d1349f654ad.jpg', color: 'black' },
        { name: 'Tiger', img: 'https://images.unsplash.com/photo-1549480017-d76466a4b7e8?w=400&q=80', color: 'orange' },
        { name: 'Bear', img: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=400&q=80', color: 'brown' },
        { name: 'Penguin', img: 'https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?w=400&q=80', color: 'black' },
        { name: 'Kangaroo', img: 'https://i.pinimg.com/736x/11/6a/b0/116ab03b067bef14e5297b4657f27de9.jpg', color: 'brown' }
    ]
};



function initKidsMode() {
    console.log("initKidsMode called");
    const grid = document.getElementById('objects-grid');
    const filterBtn = document.querySelector('.obj-filter');
    if (grid && filterBtn) {
        filterObjects('fruits', filterBtn);
    }
}

function switchKidsTab(tab, btn) {
    const objView = document.getElementById('kids-objects-view');
    const storyView = document.getElementById('kids-story-view');

    if (objView) objView.classList.add('hidden');
    if (storyView) storyView.classList.add('hidden');

    document.querySelectorAll('#tab-objects, #tab-story').forEach(b => {
        if (b) b.className = 'w-full flex items-center space-x-3 p-4 rounded-2xl bg-transparent text-gray-600 dark:text-gray-400 font-medium hover:bg-white/40 dark:hover:bg-white/5 border-2 border-transparent transition-all transform hover:scale-105';
    });

    const targetView = document.getElementById(`kids-${tab}-view`);
    if (targetView) targetView.classList.remove('hidden');

    if (btn) btn.className = `w-full flex items-center space-x-3 p-4 rounded-2xl bg-kidsBlue/20 text-kidsBlue font-bold border-2 border-kidsBlue/30 transition-all transform hover:scale-105 shadow-sm`;
}

function filterObjects(category, btn) {
    const grid = document.getElementById('objects-grid');
    if (!grid) return;
    grid.innerHTML = '';

    document.querySelectorAll('.obj-filter').forEach(b => {
        if (b) b.className = 'obj-filter px-5 py-2 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-white transition-all font-medium text-sm';
    });

    const colorMap = { fruits: 'red', veggies: 'green', numbers: 'blue' };
    const c = colorMap[category] || 'blue';
    if (btn) btn.className = `obj-filter px-5 py-2 rounded-full bg-${c}-100 dark:bg-${c}-900/30 text-${c}-600 dark:text-${c}-400 font-bold shadow-sm transition-all text-sm`;

    if (!kidsObjects[category]) return;

    kidsObjects[category].forEach(obj => {
        grid.innerHTML += `
            <div class="group relative cursor-pointer" onclick="playKidsSound(this, '${obj.name}', '${category}')">
                <div class="aspect-square rounded-[2rem] overflow-hidden relative shadow-lg group-hover:-translate-y-3 transition-all duration-300 border-4 border-transparent hover:border-${obj.color}-400/50">
                    <img src="${obj.img}" alt="${obj.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                        <span class="text-white font-bold text-2xl tracking-wide flex items-center bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm"><i class="ri-volume-up-line mr-2"></i> ${obj.name}</span>
                    </div>
                </div>
            </div>`;
    });
}

async function playKidsSound(element, name, category) {
    try {
        if (element) {
            const card = element.querySelector('div');
            if (card) {
                card.style.transform = 'scale(0.9) translateY(10px)';
                setTimeout(() => { card.style.transform = ''; }, 150);
            }
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: name, category })
        }

        const res = await fetch("http://127.0.0.1:5000/api/speak", options)

        const data = await res.json();
        console.log(data);

        const audio = new Audio(`data:audio/mp3;base64,${data.audio_base64}`);
        audio.play();
    }

    catch (e) {
        console.error(e);
    }
}


let currentAudio = null;

function typeWriter(text, element, speed = 25) {
    element.innerHTML = "";
    let i = 0;

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }

    typing();
}

let currentLanguage = null;

async function toggleKidsStory(btn) {

    if (!btn) return;

    const icon = btn.querySelector('#story-icon');
    const textContainer = document.getElementById('story-text');
    const btnText = document.getElementById("story-btn-text");
    const language = document.getElementById("story-language").value;


    if (currentLanguage && currentLanguage !== language) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
    }

    currentLanguage = language;

    // 👉 Pause / Resume
    if (currentAudio) {
        if (!currentAudio.paused) {
            currentAudio.pause();
            icon.className = 'ri-play-fill mr-2 text-2xl';
            btnText.innerText = "Resume Story";
        } else {
            currentAudio.play();
            icon.className = 'ri-pause-fill mr-2 text-2xl';
            btnText.innerText = "Pause Story";
        }
        return;
    }

    try {
        textContainer.innerText = "Creating your story...";
        textContainer.classList.remove("text-left");
        textContainer.classList.add("text-center");

        icon.className = 'ri-loader-4-line animate-spin mr-2 text-2xl';
        btnText.innerText = "Generating...";
        btn.disabled = true;

        const res = await fetch("http://127.0.0.1:5000/api/story", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ language })
        });

        const data = await res.json();

        textContainer.classList.remove("text-center");
        textContainer.classList.add("text-left");

        typeWriter(data.story, textContainer, 10);

        currentAudio = new Audio(`data:audio/mp3;base64,${data.audio_base64}`);
        currentAudio.play();

        icon.className = 'ri-pause-fill mr-2 text-2xl';
        btnText.innerText = "Pause Story";
        btn.disabled = false;

        currentAudio.onended = () => {
            currentAudio = null;
            icon.className = 'ri-play-fill mr-2 text-2xl';
            btnText.innerText = "Start Story";
        };

    } catch (e) {
        console.error(e);
        textContainer.innerText = "Something went wrong...";
        icon.className = 'ri-play-fill mr-2 text-2xl';
        btnText.innerText = "Start Story";
        btn.disabled = false;
    }
}


// ------------------------
// Students Mode Logic
// ------------------------

function switchStudentsTab(tab, btn) {
    const conceptView = document.getElementById('students-concept-view');
    const quizView = document.getElementById('students-quiz-view');
    const remindersView = document.getElementById('students-reminders-view');

    if (conceptView) conceptView.classList.add('hidden');
    if (quizView) quizView.classList.add('hidden');
    if (remindersView) remindersView.classList.add('hidden');

    document.querySelectorAll('.students-tab').forEach(b => {
        if (b) b.className = 'students-tab w-full flex items-center space-x-3 p-4 rounded-2xl bg-transparent text-gray-600 dark:text-gray-400 font-medium hover:bg-white/40 dark:hover:bg-white/5 border-2 border-transparent transition-all transform hover:scale-105';
    });

    const targetView = document.getElementById(`students-${tab}-view`);
    if (targetView) targetView.classList.remove('hidden');
    if (btn) btn.className = `students-tab w-full flex items-center space-x-3 p-4 rounded-2xl bg-neonPurple/20 text-neonPurple font-bold border-2 border-neonPurple/30 transition-all transform hover:scale-105 shadow-sm`;
}


function toggleAudio(btn) {
    const audio = btn.audio;
    if (!audio) return;

    // 🔥 stop any other playing audio
    document.querySelectorAll("button").forEach(b => {
        if (b.audio && b !== btn) {
            b.audio.pause();
            b.innerText = "▶ Play";
        }
    });

    if (audio.paused) {
        audio.play();
        btn.innerText = "⏸ Pause";
    } else {
        audio.pause();
        btn.innerText = "▶ Play";
    }
}


async function handleChatSubmit(e) {
    if (e.key !== 'Enter') return;

    const input = document.getElementById('chat-input');
    const container = document.getElementById('chat-container');
    const typingIndicator = document.getElementById('ai-typing-indicator');

    if (!input || input.value.trim() === '') return;

    const userText = input.value;


    const userDiv = document.createElement('div');
    userDiv.className = 'flex items-start flex-row-reverse animate-enter-slide-up';
    userDiv.innerHTML = `
        <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mt-1 ml-4">
            <i class="ri-user-smile-fill text-gray-500 dark:text-gray-300"></i>
        </div>
        <div class="bg-gradient-to-r from-neonBlue to-neonPurple p-4 rounded-2xl rounded-tr-none shadow-md max-w-[80%] text-white text-lg font-medium">
            ${userText}
        </div>
    `;

    container.appendChild(userDiv);
    input.value = "";

    typingIndicator.classList.remove('hidden');
    container.appendChild(typingIndicator);

    container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth"
    });

    try {
        const res = await fetch("http://127.0.0.1:5000/api/explain", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ topic: userText })
        });

        const data = await res.json();

        typingIndicator.classList.add('hidden');

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        const aiDiv = document.createElement('div');
        aiDiv.className = 'flex items-start space-x-4 animate-enter-slide-up';
        aiDiv.innerHTML = `
            <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-neonBlue to-neonPurple flex items-center justify-center mt-1">
                <i class="ri-robot-2-line text-white text-sm"></i>
            </div>
            <div class="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] text-gray-800 dark:text-gray-200 text-lg">
                <p>${data.text}</p>

                <button onclick="toggleAudio(this)" 
                    class="mt-3 px-4 py-2 text-sm rounded-full bg-neonBlue/20 text-neonBlue hover:bg-neonBlue/30 transition">
                    ▶ Play
                </button>
            </div>
        `;

        container.appendChild(aiDiv);

        const audio = new Audio(`data:audio/mp3;base64,${data.audio_base64}`);

        const playBtn = aiDiv.querySelector("button");
        playBtn.audio = audio;

        audio.play();
        playBtn.innerText = "⏸ Pause";

        container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth"
        });

    } catch (err) {
        console.error(err);
        typingIndicator.classList.add('hidden');
    }
}


// ---------------- GENERATE QUIZ ----------------
async function generateQuiz() {
    const topic = document.getElementById("quiz-topic").value;
    if (!topic.trim()) return;

    const btn = document.getElementById("generate-quiz-btn");
    btn.innerText = "Loading...";

    const res = await fetch("http://127.0.0.1:5000/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic })
    });

    const data = await res.json();

    quizData = data.quiz;
    console.log("quizData", quizData)
    currentIndex = 0;

    btn.innerText = "Generate Test";

    document.getElementById("quiz-area").classList.remove("hidden");

    showQuestion();
}

async function speak(text) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch("http://127.0.0.1:5000/api/speak/quiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text })
            });

            const data = await res.json();

            if (!data.audio) {
                console.error("No audio:", data);
                resolve(); // don’t block UI
                return;
            }

            const audio = new Audio("data:audio/mp3;base64," + data.audio);

            audio.onended = () => resolve(); // 🔥 wait until finished
            audio.onerror = () => resolve();

            audio.play();

        } catch (err) {
            console.error(err);
            resolve();
        }
    });
}

// ---------------- SHOW QUESTION ----------------
async function showQuestion() {
    document.getElementById("quiz-topic").value = "";
    const q = quizData[currentIndex];
    selectedAnswer = null;

    const area = document.getElementById("quiz-area");

    // 🔥 show loading BEFORE voice
    area.innerHTML = `<p class="text-center text-lg">🎧 Listening...</p>`;

    const textToSpeak = q.question + ". " + q.options.join(", ");

    // 🔊 Speak first
    await speak(textToSpeak);

    // 🧠 THEN render UI
    area.innerHTML = `
        <div class="flex justify-between mb-4 text-sm text-gray-500">
            <span>Question ${currentIndex + 1} of ${quizData.length}</span>
        </div>

        <h3 class="text-2xl font-bold mb-6">${q.question}</h3>

        <div class="space-y-3">
            ${q.options.map(opt => `
                <button onclick="selectAnswer('${opt}')"
                    class="quiz-btn w-full text-left p-4 rounded-xl border hover:border-blue-400">
                    ${opt}
                </button>
            `).join("")}
        </div>

      <button onclick="submitAnswer()" 
        class="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-neonBlue to-neonPurple text-white font-semibold shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:scale-105 hover:shadow-[0_0_25px_rgba(138,43,226,0.6)] transition-all duration-300">
        Submit
      </button>

        <div id="result" class="mt-4"></div>
    `;
}


// ---------------- SELECT ----------------
function selectAnswer(option) {
    selectedAnswer = option;

    document.querySelectorAll(".quiz-btn").forEach(btn => {
        btn.classList.remove("bg-blue-200");
        if (btn.innerText === option) {
            btn.classList.add(
                "bg-white/20",
                "backdrop-blur-md",
                "border",
                "border-neonBlue",
                "text-white",
                "scale-105"
            );
        }
    });
}

// ---------------- SUBMIT ----------------
async function submitAnswer() {
    const q = quizData[currentIndex];
    const resultDiv = document.getElementById("result");

    if (!selectedAnswer) return;

    // 🔥 STEP 1: Show loading
    resultDiv.innerHTML = `
        <div class="text-center text-lg animate-pulse">
            🎧 Checking answer...
        </div>
    `;

    // 🔥 STEP 2: Disable buttons
    document.querySelectorAll(".quiz-btn").forEach(btn => {
        btn.disabled = true;
        btn.classList.add("opacity-50");
    });

    let speechText = "";
    let resultHTML = "";

    if (selectedAnswer === q.correct) {
        speechText = "Correct. " + q.explanation;
        resultHTML = `
            <p class="text-green-600 font-bold">Correct ✅</p>
            <p>${q.explanation}</p>
        `;
    } else {
        speechText = `Wrong. Correct answer is ${q.correct}. ${q.explanation}`;
        resultHTML = `
            <p class="text-red-600 font-bold">Wrong ❌</p>
            <p>Correct Answer: ${q.correct}</p>
            <p>${q.explanation}</p>
        `;
    }

    // 🔊 STEP 3: Speak
    await speak(speechText);

    // 🔥 STEP 4: SHOW RESULT (THIS WAS MISSING ❗)
    resultDiv.innerHTML = resultHTML + `
        <button onclick="nextQuestion()" 
            class="mt-4 bg-purple-500 text-white px-4 py-2 rounded">
            Next →
        </button>
    `;
}

// ---------------- NEXT ----------------
function nextQuestion() {
    currentIndex++;

    if (currentIndex < quizData.length) {
        showQuestion();
    } else {
        document.getElementById("quiz-area").innerHTML =
            `<h2 class="text-2xl">Quiz Completed 🎉</h2>`;
    }
}



function addReminder() {
    const input = document.getElementById('reminder-input');
    const timeInput = document.getElementById('reminder-time');

    if (!input || !timeInput || input.value.trim() === '' || timeInput.value.trim() === '') return;

    const task = input.value.trim();
    const time = timeInput.value;

    const id = Date.now();

    addReminderDOM(task, time, true, id);

    const reminders = JSON.parse(localStorage.getItem('echoRemindersData') || '[]');
    reminders.unshift({ task, time, id });
    localStorage.setItem('echoRemindersData', JSON.stringify(reminders));

    // 🔥 SET TIMER
    scheduleReminder(task, time, id);

    input.value = '';
    timeInput.value = '';
}

function addReminderDOM(task, time, animate, id) {
    const tbody = document.getElementById('reminders-table-body');
    if (!tbody) return;

    const tr = document.createElement('tr');
    tr.setAttribute("data-id", id);

    tr.className = `group hover:bg-white/40 dark:hover:bg-white/5 transition-colors cursor-pointer ${animate ? 'animate-enter-slide-up' : ''}`;

    tr.innerHTML = `
        <td class="py-4 px-6 text-gray-800 dark:text-gray-200 font-medium">
            <div class="flex items-center space-x-3">
                <i class="ri-checkbox-blank-circle-line text-neonBlue"></i>
                <span>${task}</span>
            </div>
        </td>
        <td class="py-4 px-6 text-neonPurple font-bold">
            ${time}
        </td>
    `;

    tbody.insertBefore(tr, tbody.firstChild);
}

function scheduleReminder(task, time, id) {

    const now = new Date();
    const [hours, minutes] = time.split(":").map(Number);

    const reminderTime = new Date();
    reminderTime.setHours(hours);
    reminderTime.setMinutes(minutes);
    reminderTime.setSeconds(0);

    if (reminderTime < now) {
        reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const delay = reminderTime - now;

    setTimeout(async () => {
        await triggerReminder(task, id);
    }, delay);
}

async function triggerReminder(task, id) {

    try {
        const res = await fetch("http://127.0.0.1:5000/api/speak", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: task,
                category: "reminder"
            })
        });

        const data = await res.json();

        const audio = new Audio(`data:audio/mp3;base64,${data.audio_base64}`);
        audio.play();

        alert("Reminder: " + task);

        // 🔥 REMOVE FROM TABLE
        const row = document.querySelector(`[data-id="${id}"]`);
        if (row) row.remove();

        // 🔥 REMOVE FROM STORAGE
        let reminders = JSON.parse(localStorage.getItem('echoRemindersData') || '[]');
        reminders = reminders.filter(r => r.id !== id);
        localStorage.setItem('echoRemindersData', JSON.stringify(reminders));

    } catch (err) {
        console.error(err);
    }
}

function loadReminders() {
    const list = document.getElementById('reminders-table-body');
    if (!list) return;

    const reminders = JSON.parse(localStorage.getItem('echoRemindersData') || '[]');
    list.innerHTML = '';

    reminders.forEach(r => {
        addReminderDOM(r.task, r.time, false, r.id);

        scheduleReminder(r.task, r.time, r.id);
    });
}



window.removeReminder = function (rowEle, taskStr) {
    if (!rowEle) return;
    rowEle.style.opacity = '0';
    rowEle.style.transform = 'translateX(20px)';
    rowEle.style.transition = 'all 0.3s ease';

    setTimeout(() => {
        rowEle.remove();
        let reminders = JSON.parse(localStorage.getItem('echoRemindersData') || '[]');
        reminders = reminders.filter(r => r.task !== taskStr);
        localStorage.setItem('echoRemindersData', JSON.stringify(reminders));
    }, 300);
}
