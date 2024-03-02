from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/prediction', methods=['POST'])
def prediction():
    data = request.get_json()
    return 


if __name__ == '__main__':
    app.run( port=8000)

