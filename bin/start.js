#! /usr/bin/env node
var aws=require('../template/bin/aws')
var sns=new aws.SNS()
var cloudformation=new aws.CloudFormation()
var step=new aws.StepFunctions()
var config=require('../config')
var GetOutput=require('../template/bin/output').run



GetOutput().then(async output=>{
    var result=await sns.publish({
        Message:"{}",
        TopicArn:output.StartSNS
    }).promise()
    console.log("SageBuild pipeline started succesfully")
    console.log(result)
    return output
})
.then(async output=>{
    return new Promise(async (res,rej)=>{
        next()
        async function next(){
            var executions=await step.listExecutions({
                stateMachineArn:output.StateMachine,
                statusFilter:"RUNNING"
            }).promise()

            if(executions.executions.length>0){
                console.log('.')
                setTimeout(x=>next(),5000)
            }else{
                console.log('finished')
                res()
            }
        }
    })
})
.catch(e=>{
    console.log("SageBuild pipeline failed")
    console.log(e)
})
