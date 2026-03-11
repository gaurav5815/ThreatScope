from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from datetime import datetime
import json
import random

app = FastAPI(title="ThreatScope X Backend", version="1.0.0")

# Security and CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev only, restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "ok", "message": "ThreatScope X API is running"}

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

# Temporary mock WebSocket for testing connection
@app.websocket("/ws/threats")
async def websocket_threats(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Simulate real-time threat data
            mock_threat = {
                "source_ip": f"{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}",
                "target_ip": f"{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}",
                "source_country": random.choice(["US", "CN", "RU", "IR", "KP", "BR", "IN", "DE"]),
                "target_country": random.choice(["US", "UK", "JP", "AU", "FR", "CA"]),
                "attack_type": random.choice(["DDoS", "Malware", "Phishing", "Ransomware", "Exploit"]),
                "severity": random.choice(["Low", "Medium", "High", "Critical"]),
                "timestamp": datetime.now().isoformat()
            }
            await websocket.send_json(mock_threat)
            await asyncio.sleep(1.5)
    except Exception as e:
        print(f"WebSocket Error: {e}")
    finally:
        await websocket.close()
