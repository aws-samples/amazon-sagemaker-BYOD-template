#! /usr/bin/env node
var fs=require('fs')
var path=require('path')

var base=path.join(path.dirname(__dirname),'mock','train')
run()
async function run(){
    fs.writeFileSync(
        path.join(base,'opt','ml','input','config','hyperparameters.json'),
        JSON.stringify({
            "key":"value"
        })
    )

    fs.writeFileSync(
        path.join(base,'opt','ml','input','config','inputdataconfig.json'),
        JSON.stringify({
            train:{
                ContentType:"application/json",
                TrainingInputMode:"File",
                S3DistributionType:"FullyReplicated",
                RecordWrapperType:"None"
            }
        })
    )
    fs.writeFileSync(
        path.join(base,'opt','ml','input','config','resourceconfig.json'),
        JSON.stringify({
            current_host:"algo_1",
            hosts:["algo_1"]
        })
    )
    try {
        fs.mkdirSync(path.join(base,'opt','ml','model'))
    } catch (err) {
        if (err.code !== 'EEXIST') throw err
    }
}
