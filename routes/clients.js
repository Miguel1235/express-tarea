const express = require('express')
const redis = require('redis')
const router = express.Router()
const client = redis.createClient()

client.on('error', console.log)

client.setnx('clientId', 1)
client.setnx('contractId', 1)

// let clients=[]
// client.get('numClients',(err,num)=>{
// for(let i=1;i<=num;i++){
// client.hgetall(`client${i}`,(err,client)=>console.log(client))
// }
// })

const errors = {
  err1: "Client name or email wasn't provided",
  err2: "Client with the provided number doesn't exist",
  err3: "Amount isn't provided or its negative",
  err4: "The client doesn't have the provided contract"
}
const messages = {
  msg1: "Client deleted successfully",
  msg2: "Client created successfully",
  msg3: "Contract created successfully",
  msg4: "Contract deleted successfully",
}
router.route('/')

  .get((req, res) => client.hgetall('client:1', (err, reply) => res.json(reply))) // Completar!!!

  .post((req, res) => {
    const {
      name,
      email
    } = req.body
    if (name && email) {
      client.get('clientId', (err, reply) => client.hmset(`client:${reply}`, 'name', name, 'email', email))
      client.incr('clientId')
      res.json({
        status: "OK",
        msg: messages.msg2
      })
    } else res.json({
      status: "FAILED",
      err: errors.err1
    })
  })

router.route('/:num')

  .get((req, res) =>
    client.hgetall(`client:${req.params.num}`,
      (err, reply) => reply ? res.json({
        status: "SUCCESS",
        data: reply
      }) : res.json({
        status: "FAILED",
        err: errors.err2
      }))
  )

  .put((req, res) => {
    const {
      name,
      email
    } = req.body
    const {
      num
    } = req.params
    client.hgetall(`client:${req.params.num}`, (err, reply) => {
      if (reply) {
        if (name && email) client.hmset(`client:${num}`, 'name', `${name}`, 'email', `${email}`)
        else if (name) client.hmset(`client:${num}`, 'name', `${name}`)
        else if (email) client.hmset(`client:${num}`, 'email', `${email}`)
        else res.json({
          status: "FAILED",
          err: errors.err1
        })
        if (name || email) client.hgetall(`client:${num}`, (err, reply) => res.json({
          status: "SUCCESS",
          data: reply
        }))
      } else res.json({
        status: "FAILED",
        err: errors.err2
      })
    })
  })
  .delete((req, res) => client.del(`client:${req.params.num}`, (err, reply) => reply ? res.json({
    status: "OK",
    msg: messages.msg1
  }) : res.json({
    status: "FAILED",
    err: errors.err1
  })))


router.route('/:num/contracts')
  // curl --request GET localhost:3000/clients/NUMERO/contracts -> Falta
  .get((req, res) => res.json({
    status: "OK",
    data: []
  }))

  .post((req, res) => {
    const {
      amount
    } = req.body
    if (Number(amount) > 0) {
      client.hgetall(`client:${req.params.num}`, (err, reply) => {
        if (reply) {
          client.get('contractId', (err, reply) => client.hmset(`contract:${reply}`, 'clientId', req.params.num, 'createdAt', new Date, 'amount', amount))
          client.incr('contractId')
          res.json({
            status: "OK",
            msg: messages.msg3
          })
        } else res.json({
          status: "FAILED",
          err: errors.err2
        })
      })
    } else res.json({
      status: "FAILED",
      err: errors.err3
    })
  })

router.route('/:num/contracts/:numC')

  .get((req, res) => {
    const {
      num,
      numC
    } = req.params
    client.hgetall(`client:${num}`, (err, reply) => {
      reply ?
        client.hgetall(`contract:${numC}`, (err, reply) => reply ? res.json({
          status: "SUCCESS",
          data: reply
        }) : res.json({
          status: "FAILED",
          err: errors.err4
        })) :
        res.json({
          status: "FAILED",
          err: errors.err2
        })
    })
  })

  .put((req, res) => {
    const {
      num,
      numC
    } = req.params
    if (req.body.amount > 0) {
      client.hgetall(`client:${num}`, (err, reply) => {
        reply ?
          client.hgetall(`contract:${numC}`, (err, reply) => {
            if (reply) {
              client.hset(`contract:${numC}`, 'amount', req.body.amount)
              client.hgetall(`contract:${numC}`, (err, reply) => res.json({
                status: "SUCCESS",
                data: reply
              }))
            } else res.json({
              status: "FAILED",
              err: errors.err4
            })
          }) :
          res.json({
            status: "FAILED",
            err: errors.err2
          })
      })
    } else res.json({
      status: "FAILED",
      err: errors.err3
    })
  })

  .delete((req, res) => {
    const {
      num,
      numC
    } = req.params
    client.hgetall(`client:${num}`, (err, reply) =>
      reply ?
      client.del(`contract:${numC}`, (err, reply) => reply ? res.json({
        status: "OK",
        msg: messages.msg4
      }) : res.json({
        status: "FAILED",
        err: errors.err4
      })) :
      res.json({
        status: "FAILED",
        err: errors.err2
      })
    )
  })
module.exports = router