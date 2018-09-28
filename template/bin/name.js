#! /usr/bin/env node
var config=require('./config')
var fs=require('fs')
var _=require('lodash')
process.env.AWS_PROFILE=config.profile
process.env.AWS_DEFAULT_REGION=config.profile

exports.inc=()=>run("BYOD-test",{inc:true})
exports.get=()=>run("BYOD-test")

if (require.main === module) {
    var argv=require('commander')
    var ran
    var args=argv.version('1.0')
        .name(process.argv[1].split('/').reverse()[0])
        .arguments('[stack]')
        .usage("[stack] [options]")
        .option('--inc',"increment value")
        .option('-s --set <value>',"set the value")
        .option('-n --namespace <name>',"stack namespace")
        .option('-p --prefix',"get stacks prefix") 
        .action(function(stack,options){
            if(stack || options.prefix) ran=true
            console.log(run(stack,options))
        })
        .parse(process.argv)
    if(!ran){
        argv.outputHelp()
    }
}

function run(stack,options={}){
    var namespace=options.namespace || config.namespace
    try {
        var increments=require('../build/.inc')
    } catch(e){
        var increments={}
    }
    var stackname=stack.replace('/','-')
    var full=`${namespace}-${stackname}`
    var path=`["${config.profile}"].["${namespace}"].["${stackname}"]`

    if(options.hasOwnProperty("set")){
        increment=options.set
        set(increment)
    }else{
        increment=_.get(increments,path,0)
    }

    if(options.inc){
        set(++increment)
    }

    if(options.prefix){
        return `${full}`
    }else{
        return `${full}-${increment}` 
    }

    function set(value){
        _.set(increments,path,parseInt(value))
        fs.writeFileSync(__dirname+'/../build/.inc.json',JSON.stringify(increments,null,2))
    }
}


