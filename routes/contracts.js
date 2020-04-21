const express=require('express')
const router=express.Router()



let client=0;

router.use((req,res,next)=>{
  client=req.baseUrl.split('/')[2]
  next()
})

router.route('/')
  .get((req,res)=>res.send(`Lista de contratos del cliente ${client}\n`))
  .post((req,res)=>res.send(`Vamos a crear un contrato para el cliente ${client} con los datos ${Object.entries(req.body)}\n`))

router.route('/:numC')
  .get((req,res)=>res.send(`Info del contrato ${req.params.numC} del cliente ${client}\n`))
  .put((req,res)=>res.send(`Vamos a actualizar la info del contrato ${req.params.numC} que le pertene al cliente ${client} con ${Object.entries(req.body)}\n`))
  .delete((req,res)=>res.send(`Vamos a borra el contrato ${req.params.numC} del cliente ${client}\n`))

module.exports=router;