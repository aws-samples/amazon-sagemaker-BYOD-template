from flask import Flask 
from flask import json

app=Flask(__name__)
@app.route("/ping",methods=["GET"])
def ping():
    return "hello"

@app.route("/invocations",methods=["POST"])
def invoc():
    return "hello"

@app.route("/execution-parameters",methods=["GET"])
def params():
    return json.dumps({
        "MaxConcurrentTransforms": 8,
        "BatchStrategy": "MULTI_RECORD",
        "MaxPayloadInMB": 6
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
