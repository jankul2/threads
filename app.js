const express=require('express');
const cluster =require('cluster');
const cpus=require('os').cpus();
const app=express();
let counter=0;
if(cluster.isMaster){
 for(let i=0;i<cpus.length;i++){
    cluster.fork();
 }
 cluster.on('exit',()=>{
    cluster.fork();
 })
}else{

app.get('/', (req,res)=>{
 counter++;
 res.status(200).send({counter});
});
app.get('/heavy',async (req,res)=>{
    req.setTimeout(60 * 1000);
   let total= await getTime();
 res.status(200).send({total});
});
function getTime(){
    let total=0;
    for(let i=0;i<= 100000000000;i++){
        total++;
    }
    return total;
} 

app.listen(8000,()=>console.log('server is working'));
}