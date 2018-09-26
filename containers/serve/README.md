# SageMaker Serving Container (hosting & batch)

- run the following to package your container into zip file (to be used with aws-sagemaker-build)
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

- to run the test request edit ./test.js and run 
```shell
./test.js
```
