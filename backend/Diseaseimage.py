import requests
from dotenv import load_dotenv
import os
load_dotenv()

API_KEY = os.getenv("API_KEY")
SE_ID = os.getenv("SE_ID")
Diseasename = 'frm frontend'

search_query = Diseasename + 'information'

url = 'https://www.googleapis.com/customsearch/v1'
params = {
    'q': search_query,
    'key': API_KEY,
    'cx':SE_ID,
    'searchType':'image' 
}

response = requests.get(url , params=params)
results = response.json()['items']

for item in results:
    print(item['link']) 