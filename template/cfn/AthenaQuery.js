var response = require('cfn-response')
var aws=require('aws-sdk')
aws.config.region=process.env.AWS_REGION
var athena=new aws.Athena()

exports.handler=function(event,context,callback){
    console.log(JSON.stringify(event,null,2))
    
    var params=event.ResourceProperties
    if(event.RequestType==="Create"){
        try{
            athena.getNamedQuery({
                NamedQueryId:params.NamedQueryId
            }).promise()
            .then(function(result){
                console.log(result)
                return athena.startQueryExecution({
                    QueryString:result.NamedQuery.QueryString,
                    ResultConfiguration:{
                        OutputLocation:params.OutputLocation
                    },
                    QueryExecutionContext:{
                        Database:result.NamedQuery.Database
                    }
                }).promise()
            })
            .then(function(result){
                console.log(result)
                setTimeout(
                    ()=>response.send(event, context, response.SUCCESS,value),
                    5*1000
                )
            })
        }catch(e){
            console.log(e)
            response.send(event, context, response.FAILED,params)
        }
    }else{ 
        response.send(event, context, response.SUCCESS,value)
    }
}

