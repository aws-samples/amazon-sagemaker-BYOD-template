# SageMaker Serving Container (hosting & batch)
This directory provides a base SageMaker serving container to start development. 

## files

- Dockerfile
This is the Dockerfile for your training container.

- code/*
Place/develop your code in this directory. 

- env.js
Edit this file to set environmental variables for your container. 

- test.js
This is the test script for your container. Edit this to send test data to your container. 

## Commands/scripts

- run the following to package your container's code into a zip file (to be used with aws-sagemaker-build)
```shell
make
```

- run the following to build your container locally
```shell
make build
```

- run the following to start your container 
```shell
./start.sh
```

- to run the test request edit ./test.js and run. You need to start your container first before you can send request to it.
```shell
./test.js
```
