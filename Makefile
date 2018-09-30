.PHONY:containers

all:containers template

containers:
	rm build/containers.zip; cd containers && zip -r -q ../build/containers.zip .

template:
	./template/bin/check.js
