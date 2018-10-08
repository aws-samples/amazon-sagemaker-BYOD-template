.PHONY:containers assets template

all:containers template assets

containers:
	rm build/containers.zip; cd containers && zip -r -q ../build/containers.zip .

template:
	./template/bin/check.js

assets:
	cp template/assets/* build && cp -r mock/train/opt/ml/input/data build
