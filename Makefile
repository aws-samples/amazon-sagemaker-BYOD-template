.PHONY:containers assets template build

all:containers template assets

build:
	mkdir -p build; mkdir -p ./template/build

containers: build
	rm build/containers.zip; cd containers && zip -r -q ../build/containers.zip .

template: build
	./template/bin/check.js

assets: build
	cp template/assets/* build && cp -r mock/train/opt/ml/input/data build
