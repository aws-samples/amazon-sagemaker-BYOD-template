# SageMaker BYOD template and tutorial

[Amazon SageMaker](https://aws.amazon.com/sagemaker/) is a powerful tool for training machine learning models and scale and reliable deploying them. With Docker containers you make your own SageMaker Algorithms or migrate your existing models. This repository explains how to build, develop, and deploy these containers.

## Prerequisites
This repository has been tested in the following environments. You can use either your own linux/Mac machine (local machine or on AWS) or in a [AWS Cloud9](https://aws.amazon.com/cloud9/) instance. 

### Setting up your own environment
- Run Linux. (tested on Amazon Linux)
- Install npm >5 and node >8. ([instructions](https://nodejs.org/en/download/))
- Install Docker. ([instructions](https://runnable.com/docker/install-docker-on-linux)]
- Clone this repo.
- Set up an AWS account. ([instructions](https://AWS.amazon.com/free/?sc_channel=PS&sc_campaign=acquisition_US&sc_publisher=google&sc_medium=cloud_computing_b&sc_content=AWS_account_bmm_control_q32016&sc_detail=%2BAWS%20%2Baccount&sc_category=cloud_computing&sc_segment=102882724242&sc_matchtype=b&sc_country=US&s_kwcid=AL!4422!3!102882724242!b!!g!!%2BAWS%20%2Baccount&ef_id=WS3s1AAAAJur-Oj2:20170825145941:s))
- Configure AWS CLI and a local credentials file. ([instructions](http://docs.AWS.amazon.com/cli/latest/userguide/cli-chap-welcome.html))  

### Using Cloud9
- If you dont already have a Cloud9 instance launch one. [instructions](https://docs.aws.amazon.com/cloud9/latest/user-guide/get-started.html)
- see [here](https://docs.aws.amazon.com/cloud9/latest/user-guide/tutorial.html#tutorial-menu-bar) for a tour of the Cloud9 IDE.
- run this command to update the node version on your cloud9 instance:
```shell
nvm install node
```

## Setup

- clone this repository
```shell
git clone https://github.com/aws-samples/amazon-sagemaker-BYOD-template.git
```
- install dependencies
```shell 
npm install
```
- copy config
```shell
cp config.js.example config.js
```

- edit config.js
| param | description | 
|-------|-------------|
|region | the AWS region to launch stacks in |
|profile| the AWS credential profile to use |
|assetBucket| The name of an S3 bucket to store artifacts |
|assetPrefix| The prefix to use when storing artifacts in the assetBucket |
| params | do not edit this field |

## Tutorial
see the [tutorial](Tutorial.md) for an end to end tutorial on developing your custom SageMaker containers!

## Mock File System
The mock directory contains files and folders to mock the SageMaker environment that containers run it. These directories are used to local run and test your containers. See [here](mock) for instructions on how to configure for you use case. 

## Local Development
The containers directory provides the code to start development of SageMaker containers along with code to run and test locally using the mock file system.

### Training Container
see [here](containers/train) for details.

### Serving Container
see [here](containers/serve) for details.

## Deployment
You can use the aws-sagemaker-build project to deploy and test your code in sagemaker. Run the following to launch the sagebuild cloudformation stack configured to run your containers, copying information from the mock file system:
```shell
npm run up
```

You can update your stack by running:
```shell
npm run update
```

And you can delete your stack by running:
```shell
npm run down
```

### SageMaker build
for more details of the SageMaker build project see the github project [here](https://github.com/aws-samples/aws-sagemaker-build)

