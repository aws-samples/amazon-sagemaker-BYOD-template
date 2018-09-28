var _=require('lodash')

module.exports=Object.assign({
    "SageBuild":{
        "Type" : "AWS::CloudFormation::Stack",
        "Properties" : {
            TemplateURL:{"Fn::Sub":
                "https://s3.amazonaws.com/${AssetBucket}/${AssetPrefix}/sagebuild.json"},
            Parameters:{
                "AssetBucket":{"Ref":"AssetBucket"},
                "AssetPrefix":{"Ref":"AssetPrefix"},
                "ConfigFramework":"BYOD",
                "Parameters":{"Fn::Sub":JSON.stringify({
                    hyperparameters:require('../../mock/train/opt/ml/input/hyperparameters'),
                    modelhostingenvironment:require('../../containers/serve/env'),
                    channels:_.fromPairs(Object.keys(require('../../mock/train/opt/ml/input/inputdataconfig.json')).map(x=>[x,{path:`data/${x}`}])),
                    dockerfile_path_Training:"",
                    dockerfile_path_Inference:"",
                    trainvolumesize:"100",
                    hostinstancetype:"ml.t2.large",
                    traininstancetype:"ml.t2.large",
                })}
            }
        }
    },
    "CopyData":{
        "Type": "Custom::ClearImage",
        "Properties": {
            "ServiceToken": { "Fn::GetAtt" : ["S3SyncLambda", "Arn"] },
            src:{
                Bucket:{"Ref":"AssetBucket"},
                Prefix:{"Fn::Sub":"${AssetPrefix}/data" }
            },
            dst:{
                "Bucket":{"Fn::GetAtt":["SageBuild","Outputs.DataBucket"]}
            }
        }
    }
}
)
