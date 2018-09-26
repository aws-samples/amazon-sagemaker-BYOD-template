FROM mxnet/python
WORKDIR /tmp

COPY ./code .

# Entrypoint script comes from sagemaker_container_support
ENTRYPOINT ["/usr/bin/python", "/tmp/train.py"]
