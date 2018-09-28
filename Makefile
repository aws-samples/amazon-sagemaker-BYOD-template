.PHONY:containers

all:containers template

containers:
	make -C containers/serve; make -C containers/train

template:
	./template/bin/check.js
