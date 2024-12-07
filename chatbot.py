from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from flask_cors import CORS


# Load API key from environment variable
genai.configure(api_key="AIzaSyDpGtDua31yth1EoyTWtA3CU_OZPm2SPhc")
model = genai.GenerativeModel('gemini-1.5-flash')

app = Flask(__name__)

CORS(app)

@app.route('/query', methods=['POST'])
def query():
    try:
        query = request.json.get('query', '')
        if not query:
            return jsonify({'error': 'Query is required'}), 400
        
        response = model.generate_content(query)
        return jsonify({'response': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True,port=5888)