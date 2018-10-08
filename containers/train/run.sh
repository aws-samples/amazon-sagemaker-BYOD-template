NAME=byod-train

docker run --volume=$(realpath ../../)/mock/train/opt/ml:/opt/ml $NAME train	
