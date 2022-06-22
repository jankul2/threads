const express=require('express');
const {Worker} =require('worker_threads');
const app=express();
let counter=0;
app.get('/', (req,res)=>{
 counter++;
 res.status(200).send({counter});
});
/* app.get('/heavy',async (req,res)=>{
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
} */
app.get('/heavy',async (req,res)=>{
   const worker=new Worker('./worker.js');
   worker.on('message',(data)=>{
    res.status(200).send({data});
   })

});


app.listen(8000,()=>console.log('server is working'));