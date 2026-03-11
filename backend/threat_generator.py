import random
from pymongo import MongoClient
from datetime import datetime

client = MongoClient("mongodb://localhost:27017/")
db = client["threatscope"]
collection = db["threats"]

countries = ["USA","China","Russia","India","Germany"]
types = ["Malware","Phishing","DDoS","Ransomware"]

def generate_threat():

    threat = {
        "ip": f"192.168.{random.randint(1,255)}.{random.randint(1,255)}",
        "country": random.choice(countries),
        "type": random.choice(types),
        "severity": random.choice(["Low","Medium","High"]),
        "time": str(datetime.now())
    }

    collection.insert_one(threat)

    return threat