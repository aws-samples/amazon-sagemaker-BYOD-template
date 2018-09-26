#! /usr/bin/env node
process.env.AWS_PROFILE=require('../../config').profile
var aws=require('./aws')
var fs=require('fs')
var Promise=require('bluebird')
var cf=new aws.CloudFormation()
var s3=new aws.S3()
var chalk=require('chalk')
var bucket=require('./config').assetBucket
var prefix=require('./config').assetPrefix
key=`${prefix}/sagebuild.json`

if(require.main === module){
    run()
}
module.exports=run
async function run(){
    var tmp=require('../')
    console.log(` resources ${Object.keys(tmp.Resources).length}/200`)        
    var template=JSON.stringify(require('../'))
    await s3.putObject({
        Bucket:bucket,
        Key:key,
        Body:template
    }).promise()

    var result=await cf.validateTemplate({
        TemplateURL:`http://s3.amazonaws.com/${bucket}/${key}`
    }).promise()

    console.log(result)
    fs.writeFileSync(`${__dirname}/../build/template.json`,JSON.stringify(require('../'),null,2))
    return template
}
