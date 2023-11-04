
from pymongo import MongoClient
client = MongoClient("mongodb://0.0.0.0:27017/geoHealthDB")
from pygooglenews import GoogleNews
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app) 
@app.route('/api/send-receive-data', methods=['POST'])
def send_receive_data():
    if request.method == 'POST':
        data = request.json  # Access the data sent from the frontend

        # Process the data here
        received_data = data['data']
        # Do something with received_data
        print(received_data)
        # Send a response back to the frontend
        response_data = {'message': 'Data received and processed'}
        return jsonify(response_data)
    
    gn = GoogleNews()

    stories = []
    s = gn.search( received_data , when = '48h')
    newsitem = s['entries']
    for item in newsitem:
        story = {      
            'title': item.title,
            'link': item.link,
            'summary': item.summary,
        
        }
        stories.append(story) 
    print(stories)

        
if __name__ == '__main__':
    app.run()
