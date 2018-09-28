# SageMaker Training Container
This directory provides a base SageMaker training container to start development. 

## files

- Dockerfile
This is the Dockerfile for your training container.

- code/*
Place/develop your code in this directory. 

## Commands/scripts
- run the following to package your container into zip file (to be used with aws-sagemaker-build)
```shell
make
```

- run the following to build your container locally
```shell
make build
```

- run the following to test/run your container
```shell
./start.sh
```
