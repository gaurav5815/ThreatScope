<div align="center">
  <h1>🛡️ ThreatScope</h1>
  <p><strong>Real-time Cyber Threat Intelligence Visualization Platform</strong></p>
</div>

## 📖 Project Overview
**ThreatScope** is a real-time cyber threat intelligence visualization platform that displays live cyber attack events on a global map. Designed for security analysts and enthusiasts, it helps monitor, analyze, and understand cyber threats as they occur around the world through an interactive, visually stunning interface.

---

## ✨ Key Features
- **🌍 Global Threat Map**: Real-time cyber attack visualization on an interactive 3D world map with zoom and globe navigation.
- **⚡ Live Event Stream**: Consumes live threat data via WebSocket for up-to-the-second intelligence.
- **📊 Interactive Dashboard**: Keep track of global statistics, critical threats, and high-severity incidents.
- **📍 Region Intelligence**: Clickable country drill-downs that reveal specific inbound and outbound attacks.
- **🛡️ Threat Categorization**: Tracks multiple attack protocols including:
  - `OAS` (On-Access Scan)
  - `ODS` (On-Demand Scan)
  - `MAV` (Mail Anti-Virus)
  - `WAV` (Web Anti-Virus)
  - `IDS` (Intrusion Detection)
  - `VUL` (Vulnerability)
  - `KAS` (Anti-Spam)
  - `RMW` (Ransomware)
- **📡 Event Logging**: A live-scrolling feed of raw attack data (source, target, severity, type).

---

## 🏗️ System Architecture

ThreatScope is divided into two distinct parts:
1. **The Backend Engine (FastAPI)**: Serves a high-performance WebSocket connection that generates and broadcasts live simulated threat data.
2. **The Frontend Map (React + WebGL)**: Subscribes to the WebSocket stream and dynamically renders 3D arcs and impact points on a custom terrain utilizing WebGL/Deck.gl.

---

## 💻 Tech Stack

| Component | Technology |
| --- | --- |
| **Frontend Framework** | React + Vite + JavaScript |
| **Styling & UI** | Tailwind CSS + Lucide Icons |
| **Visualization** | Deck.gl, WebGL, GeoJSON |
| **State Management** | Zustand |
| **Backend API** | Python, FastAPI |
| **Real-Time Data** | WebSockets |

--- 

## 🚀 Installation Guide

Follow these steps to set up ThreatScope locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [Python](https://www.python.org/downloads/) (3.9+)

### 1. Clone the Repository
```bash
git clone https://github.com/gaurav5815/ThreatScope.git
cd ThreatScope
```

---

## 🏁 Running the Project

You will need to run the **Backend** and the **Frontend** in two separate terminals.

### Terminal 1: Start the Backend (FastAPI + WebSockets)
```bash
cd backend

# Create a virtual environment (Optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows use: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload --port 8000
```

### Terminal 2: Start the Frontend (Vite + React)
```bash
cd threatscope-ui

# Install Node modules
npm install

# Start the Vite development server
npm run dev
```

The application will be available at `http://localhost:5173` (or the port specified by Vite).

---

## 📂 Project Folder Structure

```text
ThreatScope/
├── backend/
│   ├── main.py                # FastAPI Application & WebSocket Logic
│   └── requirements.txt       # Python Dependencies
├── threatscope-ui/
│   ├── src/
│   │   ├── components/        # React Components (ThreatMap, ThreatStats)
│   │   ├── hooks/             # Custom Hooks (useThreatStream)
│   │   ├── App.jsx            # Main Application View
│   │   ├── index.css          # Tailwind & Map Overlays
│   │   └── store.js           # Zustand State Management
│   ├── package.json           # Node Dependencies
│   └── tailwind.config.js     # Tailwind Configuration
└── README.md                  # Project Documentation
```

---

## 📸 Screenshots / Demo

*(Add high-quality screenshots or a GIF here showcasing your 3D map, live feed, and region intelligence panels)*

![Dashboard Preview](placeholder-dashboard.png)
![Region Filter](placeholder-region.png)

---

## 🔮 Future Improvements
- [ ] Integration with real-world Threat Intelligence APIs (e.g., AlienVault OTX, VirusTotal).
- [ ] Add historical data filtering and playback functionality.
- [ ] Implement database integration (MongoDB/PostgreSQL) to persist analytics.
- [ ] Create a light-mode theme variant.
- [ ] Advanced threat correlations and graph visualization.

---

## 🤝 Contribution Guidelines
Contributions, issues, and feature requests are welcome! 
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author Information
**Gaurav**  
**Rohan Yadav**  
*Cybersecurity Enthusiast & Developer*  
- GitHub: [@gaurav5815](https://github.com/gaurav5815)
- GitHub: [@rohan1205](https://github.com/rohan1205)


---
*If you find this project useful or interesting, please leave a ⭐️ on the repository!*
