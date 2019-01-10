# Amazon SageMaker BYOD tutorial!
In this tutorial you will write, test, and deploy a customer docker container for Amazon SageMaker. We will focus on the mechanics of using these tools and not on actual ML algorithm implementation. 

## Setup
- follow the instructions under "Prerequisites" and "Setup" in the [README.md](README.md)
- If you are using Cloud9, familiarze yourself with the Cloud9 IDE. You will need to run CLI commands and edit files. see [here](https://docs.aws.amazon.com/cloud9/latest/user-guide/tutorial.html) for a tutorial on Cloud9
- If you are using JupyterLab, then you can familiarze yourself with interface by following this [tutorial](https://jupyterlab.readthedocs.io/en/stable/user/interface.html)

## Training Container Development
First, we will create the Training container. This container will contain the code for training your algorithm, reading in data from a directory, and saving your model. 

### Configure Mock Directory
Will need to configure out train mock directory, this mocks the environment your containers will see when running on SageMaker. The Train directory is located in /mock/train. 

- run the following command to initialize the directory.
```shell
./bin/train-init.js
```

- edit the mock/train/opt/ml/input/config/hyperparameters.json to look like this:
```json
{
    "name":"test",
    "x":"1"
}
```
- save your changes. 
- edit the mock/train/opt/ml/input/config/inputdataconfig.json to look like this:
```json
{
    "train":{
        "ContentType":"application/json",
        "TrainingInputMode":"File",
        "S3DistributionType":"FullyReplicated",
        "RecordWrapperType":"None"
    }
}
```
- save your changes
- edit the mock/train/opt/ml/input/data/train/train.json to look like this:
```json
{
    "y":2
}
```
- save your changes

### Write Training Code
Now that our mock directory is set up we will now write our training code. Note: we will not really be writing a training algorithm but instead focus on how we access and manipulate data.

The code and files our our training algorithm is in containers/train/code

- edit the containers/train/code/train.py to look like this
```python
import json
import pprint
import os
pp = pprint.PrettyPrinter(indent=4)

print("starting training")

with open('/opt/ml/input/config/hyperparameters.json') as json_data:
    hyperparameters = json.load(json_data)

print("hyperparameters")
pp.pprint(hyperparameters)

with open('/opt/ml/input/config/inputdataconfig.json') as json_data:
    inputdata = json.load(json_data)

print("inputdata")
pp.pprint(inputdata)

train_data_folder='/opt/ml/input/data/{}'.format(inputdata.keys()[0])
data_file=os.listdir(train_data_folder)[0]
with open('/opt/ml/input/data/{}/{}'.format(inputdata.keys()[0],data_file)) as json_data:
    data=json.load(json_data)
    
print("data")
pp.pprint(data)

result=int(hyperparameters["x"])*data["y"]

model={
    "result":result,
    "name":hyperparameters["name"]
}

print("model")
pp.pprint(model)
output_file='/opt/ml/model/model.json'
print("saving model to {}".format(output_file))

with open(output_file, 'w') as outfile:
    json.dump(model, outfile)
```
- 

### Edit Dockerfile
Now you could edit the Dockerfile but we do not need to for this tutorial. 

### Test Locally
- go to the containers/train directory
```shell
cd ./containers/train
```

- in the containers/train directory run
```shell 
make build
```

- next, run
```shell
./run.sh
```

If you get an error update your train.py, and re-run the previous two commands. You can combine the two commands together like this:
```shell
make build && ./run.sh
```

when run successfuly you should have a file at mock/train/opt/ml/model/model.json that looks like this
```json
{
    "result": 2, 
    "name": "test"
}
```
## Serving Container Development
Next, we will write the server docker container. This container needs to implement a basic web server with a few routes. In our example we will use a [Flask](http://flask.pocoo.org/) web server in Python.

### Configure mock directory
We need to configure our serve mock directory and environmental variables.

- edit containers/server/env.js to look like this:
```js
module.exports={
    message:"hello world"
}
```

- go back to the root of the project 
```shell
cd ../../
```
- next run
```shell
./bin/serve-init.sh
```
this will set up of the mock directory and copy over the mock/train/opt/ml/model to mock/server/opt/ml/model

### Write Serving Code
Now we will write our web server

- edit containers/server/code/serve.py to look like this:
```js
from flask import Flask 
from flask import json, request
import os 

with open('/opt/ml/model/model.json') as json_data:
    model = json.load(json_data)
    
app=Flask(__name__)
@app.route("/ping",methods=["GET"])
def ping():
    return "hello"

@app.route("/invocations",methods=["POST"])
def invoc():
    return json.dumps({
        "name": model["name"],
        "message": os.environ["message"],
        "result": request.json["value"]*model["result"]
    })

@app.route("/execution-parameters",methods=["GET"])
def params():
    return json.dumps({
        "MaxConcurrentTransforms": 8,
        "BatchStrategy": "MULTI_RECORD",
        "MaxPayloadInMB": 6
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
```

### Edit Dockerfile
You could edit the Dockerfile to customize the server environment but we do not need to for this tutorial.

### Test Locally
- go to the containers/serve directory
```shell
cd containers/serve/
```

- build your container running:
```shell
make build
```

- edit the containers/server/test.js to look like this:
```js
#! /usr/bin/env node
var axios=require('axios')

run()
async function run(){
    try{
        var ping=await axios.get("http://localhost:8080/ping")    
        console.log(ping.data)
        
        var params=await axios.get("http://localhost:8080/execution-parameters")
        console.log(params.data)

        var invoc=await axios.post("http://localhost:8080/invocations",{
            value:10
        })    
        console.log(invoc.data)
        
    }catch(e){
        console.log(e.response)
    }
}
```

- To start your container/server run:
```shell
./start.js
```

- open up a new terminal 
    - Cloud9:go to window->new terminal
    - JupyterLab:file->new->terminal) 
run the following to go to the serve directory
```shell
#for Cloud9
cd amazon-sagemaker-BYOD-template/containers/serve/ 
#or for Jupyter
cd SageMaker/amazon-sagemaker-BYOD-template/containers/serve/ 
```
and run the following to send test request to your server:
```shell
./test.js
```
you will then see the response from the three request types: ping,execute-parameters, and 
invocations

If you get errors edit your serve.py and run the following to rebuild and restart your server:
```shell
make build && ./start.js
```

## Testing on SageMaker
We will now build and deploy our docker containers using [aws-sagemaker-build](https://github.com/aws-samples/aws-sagemaker-build). This project will automate all the details of building our containers, training the algorithm, and deploying the model to an Amazon SageMaker endpoint. First, go back to the root of the project.
```shell
cd ../../
```

### package containers
We will need to package up the code for our containers into a zip file so the AWS CodeBuild can build the containers. Do this with the following command.
```shell
make
```

### Launch SageBuild template
Next, we will upload our container zip files and mock data to S3 (to the AssetBucket given in your config.js). Then we will launch the SageBuild CloudFormation template. You do this with the following command:
```shell 
npm run up
```

### Test
Next, we start the build/train/deploy pipeline by publishing the to start SNS topic given by SageBuild. Do this with the following command:
```shell
./bin/start.js
```

You can then go to the StepFunctionURL output of the cloudformation template to follow the status of your pipeline. If you deploy fails, you can make changes to your code and redeploy by running:
```shell
npm run update
```
and then starting a new deploy by running:
```shell
./bin/start.js
```

While that is running, edit the test script /bin/test.js to look like this:
```js
#! /usr/bin/env node
var aws=require('../template/bin/aws')
var sagemaker=new aws.SageMakerRuntime()
var GetOutput=require('../template/bin/output').run


GetOutput().then(async output=>{
    var result=await sagemaker.invokeEndpoint({
        EndpointName:output.Endpoint,
        Body:JSON.stringify({
            value:10 
        }),
        ContentType:"application/json"
    }).promise()

    console.log(result.Body.toString())
})

```

When your deployment has finished successfully you can run this script to test your endpoint:
```shell
./bin/test.js
```

## Clean

When you are done you can tear down the aws-sagemaker-guard resources by running:
```shell
npm run down
```

