## Clientes y contratos


### Endpoints

**Obtencion de clientes** POST /clients
```
curl -X GET localhost:3000/clients
```
**Consulta de cliente** GET /clients/_clientNum_
```
curl -X GET localhost:3000/clients/1
```
**Creacion de cliente** POST /clients
```
curl -X POST -d "name=Fulanito&email=fulanito@gmail.com" localhost:3000/clients
```
**Modificacion de cliente** PUT /clients/_clientNum_
```
curl -X PUT -d "name=Menganito" localhost:3000/clients/1
```
**Eliminacion de cliente** DELETE /clients/_clientNum_
```
curl -X DELETE localhost:3000/clients/1
```
**Obtencion de un contrato** GET /clients/_clientNum_/contracts/_contractNum_
```
curl -X GET localhost:3000/clients/1/contracts/1
```
**Obtencion de contratos del cliente** GET /clients/_clientNum_/contracts/
```
curl -X GET localhost:3000/clients/1/contracts/
```
**Creacion de contrato** POST /clients/_clientNum_/contracts
```
curl -X POST -d "amount=6700" localhost:3000/clients/1/contracts
```
**Modificacion de un contrato** PUT /clients/_clientNum_/contracts/_contractNum_
```
curl -X PUT -d "amount=9999" localhost:3000/clients/1/contracts/1
```
**Eliminacion de un contrato** DELETE /clients/_clientNum_/contracts/_contractNum_
```
curl -X DELETE localhost:3000/clients/1/contracts/1
```

### Instalacion

```
npm install
docker pull redis
docker run --name rd --publish 6379:6379 --detach redis
```
### Iniciar
```
npm start
```