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
                "ExternalDataBucket":{"Ref":"AssetBucket"},
                "ExternalTrainingPolicy":{"Ref":"SageBuildPolicy"},
                "Parameters":{"Fn::Sub":JSON.stringify({
                    hyperparameters:require('../../mock/train/opt/ml/input/hyperparameters'),
                    modelhostingenvironment:require('../../containers/serve/env'),
                    channels:_.fromPairs(Object.keys(require('../../mock/train/opt/ml/input/inputdataconfig.json')).map(x=>[x,{path:`data/${x}`}])),
                    dockerfile_path_Training:"",
                    dockerfile_path_Inference:"",
                    trainvolumesize:"100",
                    hostinstancetype:"ml.t2.large",
                    traininstancetype:"ml.t2.large",
                    dockerfile_path_Training:"train",
                    dockerfile_path_Inference:"serve",
                    ExternalCodeBucket:{"Fn::Sub":"${AssetBucket}/${AssetPrefix}/containers.zip"}
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
    },
    "SageBuildPolicy":{
      "Type": "AWS::IAM::ManagedPolicy",
      "Properties": {
        "PolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Action": [
                "s3:*"
              ],
              "Resource":[
                {"Fn::Sub":"arn:aws:s3:::${AssetBucket}/*"},
                {"Fn::Sub":"arn:aws:s3:::${AssetBucket}"},
              ]
            }
          ]
        }
      }
    }
}
)
