NAME=byod-serve
DSTZIP=../../build/$NAME.zip

docker run --volume=$(realpath ../../)/mock/serve/opt:/opt \
    -p 8080:8080 \
    --env SAGEMAKER_BATCH=false \
    --env SAGEMAKER_MAX_PAYLOAD_IN_MB=0 \
    --env SAGEMAKER_BATCH_STRATEGY=SINGLE_RECORD \
    --env SAGEMAKER_MAX_CONCURRENT_TRANSFORMS=0 \
    $NAME serve
