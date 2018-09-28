var aws=require('aws-sdk')
var response = require('cfn-response')
aws.config.region=process.env.AWS_REGION
var s3=new aws.S3()

exports.handler=function(event,context,callback){
    console.log(JSON.stringify(event,null,2))
    var params=event.ResourceProperties
    delete params.ServiceToken
    delete params.Version
    if(event.RequestType!=="Delete"){
        s3.listObjectsV2(params.src).promise()
        .then(results=>{
            console.log(results)
            return Promise.all(results.Contents.map(x=>s3.copyObject({
                Bucket:params.dst.Bucket,
                CopySource:`/${params.src.Bucket}/${x.Key}`,
                Key:x.Key
            }).promise()))
        })
        .then(()=>response.send(event, context, response.SUCCESS))
        .catch(e=>{
            console.log(e)
            response.send(event, context, response.FAILED)
        })
    }else{
        response.send(event, context, response.SUCCESS)
    }
}   
