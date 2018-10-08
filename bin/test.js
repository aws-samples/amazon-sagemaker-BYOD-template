#! /usr/bin/env node
var aws=require('../template/bin/aws')
var sagemaker=new aws.SageMakerRuntime()
var GetOutput=require('../template/bin/output').run


GetOutput().then(async output=>{
    var result=await sagemaker.invokeEndpoint({
        EndpointName:output.Endpoint,
        Body:JSON.stringify({})
    }).promise()

    console.log(result.Body.toString())
})



