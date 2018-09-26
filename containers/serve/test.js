#! /usr/bin/env node
var axios=require('axios')

run()
async function run(){
    try{
        var ping=await axios.get("http://localhost:8080/ping")    
        console.log(ping.data)
        
        var params=await axios.get("http://localhost:8080/execution-parameters")
        console.log(params.data)

        var invoc=await axios.post("http://localhost:8080/invocations",{})    
        console.log(invoc.data)
        
    }catch(e){
        console.log(e.response)
    }
}
