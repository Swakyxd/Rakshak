# Rakshak — AI-Powered Urban Safety Dashboard

Rakshak is an intelligent, real-time safety and emergency response platform designed to ensure personal security using AI, data analytics, and geolocation services. It provides live urban safety heatmaps, safe route recommendations, predictive analytics, and instant alerts to help users and city officials make informed safety decisions.

---

## 🚀 Features

- **Real-time Safety Heatmap:** Visualize safe, medium, and high-risk zones across the city.
- **AI-Powered Predictions:** Machine learning algorithms predict potential safety risks before they occur.
- **Safe Route Planner:** Get optimal routes that prioritize your safety.
- **Incident Reporting:** Report and view real-time safety incidents.
- **Data-driven Insights:** Analytics and reporting for city planners and citizens.
- **Emergency SOS:** Instantly alert trusted contacts and authorities in case of danger.
- **Modern UI:** Futuristic, glassmorphic design with responsive layouts.

---

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **State Management:** React Context, React Query
- **Mapping:** Mapbox API (or similar)
- **AI/ML:** Python (for backend risk prediction, not included here)
- **Build Tools:** Vite, SWC
- **Testing:** Vitest, Testing Library
- **Icons:** Lucide

---

## 📦 Project Structure

```
Rakshak/
├── public/
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   ├── index.css
│   └── main.tsx
├── tailwind.config.ts
├── vite.config.ts
├── vitest.config.ts
├── package.json
└── README.md
```

---

## 🖥 Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/rakshak.git
    cd rakshak
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    - Copy `.env.local.example` to `.env.local` and fill in your API keys (e.g., Mapbox).

4. **Run the development server:**
    ```bash
    npm run dev
    ```

5. **Run tests:**
    ```bash
    npm test
    ```

---

## 📊 Safety Color System

- **Safe Zone:** Green (`--safe`)
- **Medium Risk:** Orange (`--medium-risk`)
- **High Risk:** Red (`--high-risk`)
- **Accent:** Blue (`--accent`)

> These are defined in `src/index.css` and `tailwind.config.ts`.

---

## 📄 License

MIT

---

