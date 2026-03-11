from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import threading
import time
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)

# MongoDB Connection
client = MongoClient("mongodb://localhost:27017/")
db = client["threatscope"]
collection = db["threats"]

# -------------------------------
# Countries / attack definitions
# -------------------------------

countries = [
"USA","China","Russia","India","Germany","UK","Brazil","Canada",
"France","Australia","Japan","South Korea","Iran","Netherlands","Singapore"
]

attack_types = ["DDoS","Malware","Phishing","Ransomware"]
severities = ["Low","Medium","High"]

# -------------------------------
# Generate simulated cyber attack
# -------------------------------

def generate_threat():

    threat = {
        "ip": f"192.168.{random.randint(1,255)}.{random.randint(1,255)}",
        "country": random.choice(countries),
        "type": random.choice(attack_types),
        "severity": random.choice(severities),
        "time": datetime.now().isoformat()
    }

    collection.insert_one(threat)

    print("New Threat:", threat)

# -------------------------------
# Background real-time generator
# -------------------------------

def threat_loop():

    while True:
        generate_threat()
        time.sleep(2)   # generate new attack every 2 seconds

# -------------------------------
# API ROUTES
# -------------------------------

@app.route("/")
def home():
    return "ThreatScope Backend Running"


@app.route("/threats")
def get_threats():

    threats = list(
        collection
        .find({}, {"_id": 0})
        .sort("time", -1)      # newest threats first
        .limit(50)             # only latest 50
    )

    return jsonify(threats)

# -------------------------------
# Start background thread
# -------------------------------

thread = threading.Thread(target=threat_loop)
thread.daemon = True
thread.start()

# -------------------------------
# Run Flask server
# -------------------------------

if __name__ == "__main__":
    app.run(debug=True)