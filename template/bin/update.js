#! /usr/bin/env node
process.env.AWS_PROFILE=require('./config').profile
var check=require('./check')
var aws=require('aws-sdk')
var config=require('./config')
var cf=new aws.CloudFormation({region:config.region})
var name=require('./name')
var wait=require('./wait')
var bucket=require('./config').assetBucket
var prefix=require('./config').assetPrefix
key=`${prefix}/BYOD.json`

if(require.main===module){
    run()
}

async function run(){
    var template=await check()
    console.log(config.parameters)
    var result=await cf.updateStack({
        StackName:await name.get(),
        Capabilities:["CAPABILITY_NAMED_IAM"],
        TemplateURL:`http://s3.amazonaws.com/${bucket}/${key}`,
        Parameters:Object.keys(config.parameters)
            .map(param=>{return{
                ParameterKey:param,
                ParameterValue:config.parameters[param]
            }})
    }).promise()
    await wait()
}
