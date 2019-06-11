FROM mxnet/python

COPY ./code /opt/program

# Entrypoint script comes from sagemaker_container_support
ENTRYPOINT ["/usr/bin/python3", "/opt/program/train.py"]
#ENTRYPOINT ["ls","/opt"]
