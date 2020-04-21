import express from "express"
const app=express()
const port=3000

app.get('/',(req,res)=>res.send("Hola mundo"))


app.listen(port,()=>console.log(`Example app listening at http://localhost:${port}`))