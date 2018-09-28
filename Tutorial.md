# Amazon SageMaker BYOD tutorial!
In this tutorial you will write, test, and deploy a customer docker container for Amazon SageMaker.

## Setup
- follow the instructions under "Prerequisites" and "Setup" in the [README.md](README.md)
- If you are using Cloud9, familiarze yourself with the Cloud9 IDE. You will need to run CLI commands and edit files. see [here](https://docs.aws.amazon.com/cloud9/latest/user-guide/tutorial.html) for a tutorial on Cloud9

## Training Container Development
First, we will create the Training container. This container will contain the code for training your algorithm, reading in data from a directory, and saving your model. 

### Configure Mock Directory
Will need to configure out train mock directory, this mocks the environment your containers will see when running on SageMaker. The Train directory is located in /mock/train. 

- run the following command to initialize the directory.
```shell
./bin/train-init.js
```

- 
- edit hyperparameters
- edit dataconfig
- add data

### Write Training Code
- edit train.py

### Edit Dockerfile
- edit Dockerfile

### Test Locally
- run ./test.js

## Serving Container Development

### Configure Mock Direcotory
- edit env.js
- run bin/serve-init.js

### Write Serving Code
- edit code/serve.py

### Edit Dockerfile
- edit Dockerfile

### Test Locally
- in one terminal run ./serve.js
- inanother terminal run ./test.js

## Testing on SageMaker

### package containers
- run make build

### Launch SageBuild template
- run npm up

### Run testing notebook
- go to cloudformation
- open up Jupyter notebook
- go to notebook
- work through that notebook to test 


