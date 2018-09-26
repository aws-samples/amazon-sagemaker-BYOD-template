all:../template.json ../assets/notebooks.zip

../template.json:index.js cfn/* 
	node ./bin/check.js 

../assets/notebooks.zip:sagebuild/notebook
	zip -rvj ../assets/notebooks.zip sagebuild/notebook/*;
