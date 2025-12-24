# 📦 ComponentAI – AI Powered UI Component Generator

ComponentAI is a **frontend-only AI powered web application** that allows developers to generate modern UI components using **natural language prompts**.  
It uses **Google Gemini AI** to generate clean **HTML / CSS / Tailwind / Bootstrap** components and provides a **live code editor and preview** experience.

---

## 🚀 Live Demo

🔗 **Live URL:**  
https://componentai-zeta.vercel.app/

---

## ✨ Features

### 🧠 AI-Powered Code Generation
- Generate UI components using natural language
- Powered by **Google Gemini API**
- Supports multiple frameworks

### 🎨 Framework Support
- HTML + CSS  
- HTML + Tailwind CSS  
- HTML + Bootstrap  
- HTML + CSS + JavaScript  
- HTML + Tailwind + Bootstrap  

### 🧩 Live Editor & Preview
- Monaco Editor (VS Code-like experience)
- Real-time code preview
- Fullscreen preview mode
- Safe preview using **iframe sandboxing**

### 🌗 Theme & Personalization
- Dark / Light theme toggle
- Editor font size control
- Persistent user settings using **localStorage**

### 👤 Guest Profile (Frontend-Only)
- Generated components count
- Recent component history
- Restore previous components
- Clear history

### ⚙️ Settings Panel
- Editor font size adjustment
- Toggle AI code comments
- Persistent preferences

### 📂 History Management
- Stores last **5 generated components**
- Restore any previous generation
- LocalStorage-based (no backend)

---

## 🛠️ Tech Stack

| Category     | Technology |
|--------------|------------|
| Frontend     | React + Vite |
| Styling      | Tailwind CSS + CSS Variables |
| AI           | Google Gemini API |
| Code Editor  | Monaco Editor |
| UI Icons     | React Icons |
| Routing      | React Router |
| Deployment   | Vercel / GitHub Pages |

---

## 📁 Project Structure
```text
componentai/
│
├── public/
│ └── index.html
│
├── src/
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── Editor.jsx
│ │ ├── Preview.jsx
│ │ ├── SettingsPanel.jsx
│ │ └── HistoryPanel.jsx
│ │
│ ├── pages/
│ │ ├── Home.jsx
│ │ └── NoPage.jsx
│ │
│ ├── utils/
│ │ ├── gemini.js
│ │ └── storage.js
│ │
│ ├── hooks/
│ │ └── useTheme.js
│ │
│ ├── App.jsx
│ ├── main.jsx
│ ├── index.css
│
├── .env
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```


---

## 🔑 Environment Variables

This project uses environment variables for API security.

Create a `.env` file in the root directory:

```text
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```


---

## ⚠️ Important Notes

- The `.env` file is ignored by Git
- This is a **frontend-only project**; API key is still visible in the browser
- Suitable for **demos and learning**, not production use

---

## 🧪 Running Locally

### 1️⃣ Clone the Repository

git clone https://github.com/tanishq-agrawal/componentai

```js
cd componentai
```

### 2️⃣ Install Dependencies

```js
npm install
```

### 3️⃣ Start Development Server

```js
npm run dev
```


---

## 🌍 Deployment

### ✅ Vercel (Recommended)
- Zero-config deployment
- Automatic builds on Git push
- Best for frontend-only apps

### ✅ GitHub Pages
- Static deployment
- Requires Vite base configuration
- Ideal for demos

---

## 🔐 Security Notes
- No backend authentication
- Guest user only
- API key exposed in frontend (demo-only)
- History & settings stored in `localStorage`

---

## 🧠 Known Limitations
- Frontend-only (no backend)
- API key visible in browser
- AI output size limited to prevent browser freeze
- Preview navigation disabled via iframe sandbox

---

## 📌 Future Improvements
- Backend proxy for API security
- User authentication
- Export to React components
- Prompt templates
- Shareable component links
- Team workspace support

---

## 📜 License

This project is for **learning and demonstration purposes**.  
Feel free to fork and modify.

---

## 🙌 Author

**ComponentAI**  
Built with ❤️ using **React, Vite, and Google Gemini**

⭐ If you like this project, consider **starring the repository!**




