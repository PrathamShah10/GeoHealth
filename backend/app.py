# Import necessary libraries
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import requests
from openai import OpenAI
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)
# OpenAI credentials
API_KEY = os.getenv("API_KEY")
SE_ID = os.getenv("SE_ID")

# Define endpoint to receive city from frontend
@app.route('/get_diseases', methods=['POST'])
def get_diseases():
    # Get city from the frontend
    city = request.json.get('city')
    
    # Construct search query
    search_query = f'current diseases in {city}'

    # Google Custom Search API parameters
    url = 'https://www.googleapis.com/customsearch/v1' 
    params = {
        'q': search_query,
        'key': API_KEY,
        'cx': SE_ID,
        'gl': 'Asia',
        'dateRestrict': '2023-11-01:2024-01-19'
    }
    
    # Make the request to Google Custom Search API
    response = requests.get(url, params=params)
    results = response.json().get('items', [])

    # Write results to a file
    # with open(r"f:\Geo\GeoHealth\backend\diseases.txt", 'w') as file:
    #     for item in results:
    #         file.write(item['title'])

    # # Read content from the file
    # with open(r"f:\Geo\GeoHealth\backend\diseases.txt", 'r') as file:   
    #     content = file.read()
    titles = [item['title'] for item in results]

    # Convert titles to a single string
    content = '\n'.join(titles)
    
    # Use OpenAI to process the content
    client = OpenAI()
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": f'Extract and list only exact disease names seperated by comma from the following text: {content}'}],
    )
    return jsonify({'result': completion.choices[0] .message.content})
    
# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
