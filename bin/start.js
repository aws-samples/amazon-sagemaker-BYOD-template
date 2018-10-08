#! /usr/bin/env node
var aws=require('../template/bin/aws')
var sns=new aws.SNS()
var config=require('../config')
var GetOutput=require('../template/bin/output').run



GetOutput().then(async output=>{
    var result=await sns.publish({
        Message:"{}",
        TopicArn:output.StartSNS
    }).promise()
    console.log("SageBuild pipeline started succesfully")
    console.log(result)
})
.catch(e=>{
    console.log("SageBuild pipeline failed")
    console.log(e)
})
