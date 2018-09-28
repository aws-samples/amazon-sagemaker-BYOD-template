#! /usr/bin/env node
var lodash=require('lodash')
var spawn=require('child_process').spawn

var NAME="byod-serve"
var env=require('./env')

var env_string=lodash.toPairs(env).map(x=>`--env ${x[0]}=${JSON.stringify(x[1])}`)
var args=[
    `--volume=$(realpath ../../)/mock/serve/opt:/opt`,
    `-p 8080:8080`,
    `--env SAGEMAKER_BATCH=false`,
    `--env SAGEMAKER_MAX_PAYLOAD_IN_MB=0`,
    `--env SAGEMAKER_BATCH_STRATEGY=SINGLE_RECORD`,
    `--env SAGEMAKER_MAX_CONCURRENT_TRANSFORMS=0`,
    `${env_string}`,
    `${NAME} serve`
]

var run=spawn("docker run",args,{shell:true})

run.stdout.on('data', (data) => {
    console.log(data.toString())
});

run.stderr.on('data', (data) => {
    console.log(data.toString())
});

run.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
