from flask import Flask, request, jsonify
from flask_cors import CORS
from vncorenlp import VnCoreNLP
from utils import *
import json

#Set up Flask:
app = Flask(__name__)
#Set up Flask to bypass CORS at the front end:
cors = CORS(app)


@app.route("/receiver", methods=["POST"])

def postME():
    
    data = request.get_json()
    text = data['text']

    annotated_text = annotator.annotate(text)
    annotated_text = annotated_text['sentences']
    tmp = {}
    for i, at in enumerate(annotated_text):
        tmp[i] = at
    annotated_text = tmp

    response = question_generation(annotated_text, patterns)
    return jsonify(response)


#Run the app:
if __name__ == "__main__": 
    
    pattern_path = 'C:/Users/trung/Desktop/DA_CNTT2/02.SOURCE/CODE/QG_V2_1/pattern/pattern.txt'
    
    annotator = VnCoreNLP(address="http://127.0.0.1", port=9000)

    with open(pattern_path, "r", encoding="utf8") as f:
        patterns = f.read().split('\n')

    app.run(debug=True)