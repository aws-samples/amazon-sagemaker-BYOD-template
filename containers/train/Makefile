NAME=byod-train
DSTZIP=../../build/$(NAME).zip
.PHONY: run

$(DSTZIP): 
	echo "Building $(NAME) zip "; rm $(DSTZIP);  zip -r -q $(DSTZIP) . 

build:./*
	docker build -t ${NAME} .

run:
	docker run --volume=$(realpath ../../)/mock/train/opt:/opt ${NAME} train	
