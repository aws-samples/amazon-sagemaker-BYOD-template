
module.exports={
  "Parameters":{
    "NoteBookInstanceType":{
        "Type":"String",
        "Default":"ml.t2.medium",
        "AllowedValues":["ml.t2.medium","ml.m4.xlarge","ml.p2.xlarge","USE_EXTERNAL"],
        "Description":"The SageMaker Notebook Instance type that will be created and pre-populated with a sagebuild tutorial notebook"
    },
    "AssetBucket":{
        "Type":"String"
    }
  },
  "Outputs":{},
  "Resources":Object.assign(
    require('./cfn'),
    require('./sagebuild')
  ),
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": ""
}
