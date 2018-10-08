FROM mxnet/python

COPY ./code /opt/program
RUN pip install flask
# Entrypoint script comes from sagemaker_container_support
ENTRYPOINT ["/usr/bin/python", "/opt/program/serve.py"]
