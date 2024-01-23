import requests

from openai import OpenAI
from dotenv import load_dotenv
import os
load_dotenv()

API_KEY = os.getenv("API_KEY")
SE_ID = os.getenv("SE_ID")
city = 'frm frontend'
search_query = 'current diseases in' + city 

url = 'https://www.googleapis.com/customsearch/v1'
params = {
    'q': search_query,
    'key': API_KEY,
    'cx':SE_ID,
    'gl': 'Asia'  
}

response = requests.get(url , params=params)
results = response.json()['items']


file = open(r"f:\Geo\GeoHealth\backend\diseases.txt" , 'w')
for item in results:
    file.write(item['title'])
file.close()
file = open(r"f:\Geo\GeoHealth\backend\diseases.txt" , 'r') 
 
client = OpenAI()

completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[{"role": "user", "content":'Extract and list disease names without numbering from the foll text ' + file.read() }],
)

print(completion.choices[0].message.content)
