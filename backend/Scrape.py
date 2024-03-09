import requests
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import requests
from openai import OpenAI
from dotenv import load_dotenv
import os
from bs4 import BeautifulSoup
load_dotenv()
app = Flask(__name__)

API_KEY = os.getenv("API_KEY")
SE_ID = os.getenv("SE_ID")


if __name__ == '__main__':
    app.run(debug=True)

    