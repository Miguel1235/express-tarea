const express=require('express')
const router=express.Router()

router.route('/')
  .get((req,res)=>res.send('Listado de los clientes\n'))
  .post((req,res)=>res.send(`Creamos un cliente con ${Object.entries(req.body)}\n`))

router.route('/:num')
  .get((req,res)=>res.send(`Devuelvo info del cliente ${req.params.num}\n`))
  .put((req,res)=>res.send(`Vamos a actualizar la info del cliente ${req.params.num} con los siguientes datos ${JSON.stringify(req.body)}\n`))
  .delete((req,res)=>res.send(`Vamos a borrar el cliente ${req.params.num}\n`))

module.exports=router;