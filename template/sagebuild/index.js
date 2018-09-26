var _=require('lodash')
module.exports=Object.assign({
    "SageBuild":{
        "Type" : "AWS::CloudFormation::Stack",
        "Properties" : {
            TemplateURL:{"Fn::Sub":
                "https://s3.amazonaws.com/${AssetBucket}/assets/sagebuild.json"},
            Parameters:{
                "AssetBucket":{"Ref":"AssetBucket"},
                "AssetPrefix":"assets",
                "ConfigFramework":"BYOD",
                "Parameters":{"Fn::Sub":JSON.stringify({
                    hyperparameters:{
                    },
                    modelhostingenvironment:{
                    },
                    channels:_.fromPairs(["128","256"]
                        .map(x=>[x,{path:`recordio/${x}`}])),
                    dockerfile_path_Training:"",
                    dockerfile_path_Inference:"",
                    trainvolumesize:"100",
                    hostinstancetype:"ml.t2.large",
                    traininstancetype:"ml.t2.large",
                })}
            }
        }
    }
}
)
