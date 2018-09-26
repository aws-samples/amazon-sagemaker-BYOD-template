NAME=byod-train

docker run --volume=$(realpath ../../)/mock/train/opt:/opt $NAME train	
