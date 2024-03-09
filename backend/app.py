# Import necessary libraries
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import requests
from openai import OpenAI
from dotenv import load_dotenv
import os
import requests
from bs4 import BeautifulSoup

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
    print(city)
    # print(API_KEY)
    # print(SE_ID)
    # Construct search query
    search_query = f'current diseases in {city} 2024'

    # Google Custom Search API parameters
    url = 'https://www.googleapis.com/customsearch/v1' 
    params = {
        'q': search_query, 
        'key': API_KEY,
        'cx': SE_ID,
        'gl': 'Asia',
        'dateRestrict': '2024-01-01:2024-02-29'
    }
    
    # Make the request to Google Custom Search API
    response = requests.get(url, params=params)
  
    results = response.json().get('items', [])
    
    # print(results)
    # Write results to a file
    # with open(r"f:\Geo\GeoHealth\backend\diseases.txt", 'w') as file:
    #     for item in results:
    #         file.write(item['title'])

    # # Read content from the file
    # with open(r"f:\Geo\GeoHealth\backend\diseases.txt", 'r') as file:   
    #     content = file.read()
    titles = [item['title'] for item in results] 
    
    links = [{'title': item['title'], 'link': item.get('link')} for item in results]
    # Convert titles to a single string
    content = '\n'.join(titles)
    print(links)
    print(content)
    # Use OpenAI to process the content
    client = OpenAI()
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": f'Extract and list only exact disease names seperated by comma from the following text: {content}'}],
    )
    result_dict = {
        'result': completion.choices[0].message.content,
        'links': links
    }
    return jsonify(result_dict)

# @app.route('/get_disease_info', methods=['POST'])
# def get_diseases():
#     disease = request.json.get('disease')
#     client = OpenAI()
#     completion = client.chat.completions.create(
#         model="gpt-3.5-turbo",
#         messages=[{"role": "user", "content": f': {content}'}],
#     )
#     return jsonify({'result': completion.choices[0] .message.content})

@app.route('/get_info', methods=['POST'])
def get_info():

    disease = request.json.get('disease')
    query = request.json.get('query')
    print(disease)
    print(query)
    search_query = f'cdc gov {disease}'
    url = 'https://www.googleapis.com/customsearch/v1' 
    params = {
        'q': search_query, 
        'key': API_KEY,
        'cx': SE_ID,
        
    }

    response = requests.get(url, params=params)
    results = response.json()
   
    if 'items' in results:
         cdclink = results['items'][0]['link']

    if cdclink.endswith('/index.html'):
        cdclink = cdclink.rsplit('/index.html', 1)[0]
    
    newlink = cdclink + query
    print(newlink)
    web = requests.get(newlink )
    
    soup = BeautifulSoup(web.content , "html.parser")

    syndicate_elements = soup.find_all(class_="syndicate")
    if len(syndicate_elements) >= 2:
        second_syndicate = syndicate_elements[1]  # Index 1 corresponds to the second element
        symp = ''
        for child in second_syndicate.children:
            print(child.text)
            symp = symp + child.text
        return jsonify({'result': symp})
    else:
        newlink = cdclink + '/about' + query
        print(newlink)
        web = requests.get(newlink )
        if len(syndicate_elements) >= 2:
            soup = BeautifulSoup(web.content , "html.parser") 
            syndicate_elements = soup.find_all(class_="syndicate")
            second_syndicate = syndicate_elements[1]  # Index 1 corresponds to the second element
            sympa = ''
            for child in second_syndicate.children:
                print(child.text)
                sympa = sympa + child.text
            return jsonify({'result': sympa})
        
    return jsonify({'result': 'No information available'})
# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
