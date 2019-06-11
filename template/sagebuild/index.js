var _=require('lodash')

module.exports=Object.assign({
    "SageBuild":{
        "Type" : "AWS::CloudFormation::Stack",
        "Properties" : {
            TemplateURL:{"Fn::Sub":
                "https://s3.amazonaws.com/aws-machine-learning-blog/artifacts/sagebuild/v1/template.json"},
            Parameters:{
                "AssetBucket":{"Ref":"AssetBucket"},
                "AssetPrefix":{"Ref":"AssetPrefix"},
                "ConfigFramework":"BYOD",
                "NoteBookInstanceType":"NONE",
                "ExternalDataBucket":{"Ref":"AssetBucket"},
                "ExternalTrainingPolicy":{"Ref":"SageBuildPolicy"},
                "ExternalCodeBucket":{"Fn::Sub":"${AssetBucket}/${AssetPrefix}/containers.zip"},
                "Parameters":{"Fn::Sub":JSON.stringify({
                    hyperparameters:require('../../mock/train/opt/ml/input/config/hyperparameters'),
                    modelhostingenvironment:require('../../containers/serve/env'),
                    channels:_.fromPairs(Object.keys(require('../../mock/train/opt/ml/input/config/inputdataconfig.json')).map(x=>[x,{path:`\${AssetPrefix}/data/${x}`}])),
                    dockerfile_path_Training:"",
                    dockerfile_path_Inference:"",
                    trainvolumesize:"100",
                    hostinstancetype:"ml.m4.xlarge",
                    traininstancetype:"ml.m4.xlarge",
                    dockerfile_path_Training:"train",
                    dockerfile_path_Inference:"serve",
                })}
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
