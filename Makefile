.PHONY:containers

containers:
	make -C containers/serve; make -C containers/train
