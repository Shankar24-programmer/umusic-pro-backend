import express from 'express';
import {ObjectId} from "mongodb"
// import { response } from 'express';
import {client} from '../index.js'

const router = express.Router();

router.get("/", async function (request, response) {
    const authpro = await client.db("umusic").collection("authentication-provider").find().toArray();
    response.send(authpro);
})

router.get("/:id", async function(request, response) {
    const authpro = await client.db("umusic").collection("authentication-provider").findOne({"_id":ObjectId(request.params.id)})
    response.send(authpro);
})

router.delete("/:id", async function(request, response) {
    const authpro = await client.db("umusic").collection("authentication-provider").deleteOne({"_id":ObjectId(request.params.id)});
    response.send(authpro);
})

router.post("/", async function(request, response){
    //  const newAuthpro = request.body;
     const result = await client.db("umusic").collection("authentication-provider").insertMany(request.body);
     response.send(result);
})

router.put("/:id", async function(request, response){
    const { id } = request.params;
    const editValue = request.body;
    const result = await client.db("umusic").collection("authentication-provider").updateOne({"_id":ObjectId(request.params.id)},{$set:editValue})
    response.send(result);
})

router.post("/getByname", async function(request, response){
    try{
        const result = await client.db("umusic").collection("authentication-provider").findOne({name:request.body.name});
        console.log(result);
        if(result){
            response.send(result);
        }
        else{
            response.send({msg:"no data found"})
        }
    }
    catch(err){
        console.log(err);
    }
    }
)



 export const authentication=router;