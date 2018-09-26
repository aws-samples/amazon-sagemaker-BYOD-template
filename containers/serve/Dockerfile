FROM mxnet/python
WORKDIR /tmp

COPY ./code .
RUN pip install flask
# Entrypoint script comes from sagemaker_container_support
ENTRYPOINT ["/usr/bin/python", "/tmp/serve.py"]
