import express from 'express';
import {ObjectId} from "mongodb"
// import { response } from 'express';
import {client1} from '../index.js'

const router = express.Router();

router.post("/", async function (request, response) {
    const Count1 = await client1.db("umusic").collection("shopify-stores").find().count();
    console.log(Count1);
    const limit1 = request.body.limit;
    const skip1 = request.body.skip;

    const shop = await client1.db("umusic").collection("shopify-stores").find().limit(parseInt(limit1)).skip(parseInt(skip1)).toArray();
    // response.send(shop);
    const data = {
        count : Count1,
        value : shop
    }
    response.send(data);
})

router.get("/:id", async function(request, response) {
    const shop = await client1.db("umusic").collection("shopify-stores").findOne({"_id":ObjectId(request.params.id)})
    response.send(shop);
})

router.delete("/:id", async function(request, response) {
    const shop = await client1.db("umusic").collection("shopify-stores").deleteOne({"_id":ObjectId(request.params.id)});
    response.send(shop);
})

router.post("/", async function(request, response){
    //  const newshop = request.body;
     const result = await client1.db("umusic").collection("shopify-stores").insertMany(request.body);
     response.send(result);
})

router.put("/:id", async function(request, response){
    const { id } = request.params;
    const editValue = request.body;
    const result = await client1.db("umusic").collection("shopify-stores").updateOne({"_id":ObjectId(request.params.id)},{$set:editValue})
    response.send(result);
})

router.post("/getByname", async (req, res) => {
    const val = req.body.name
    const regex = new RegExp([val].join(""), "i");
    const allTasks = await client1.db("umusic").collection("shopify-stores").find({ name: { $regex: regex } }).toArray()
    // if(!allTasks || allTasks.length === 0) res.status(400).send({error : "No task was found"})
    // res.status(200).send(allTasks)
    res.send(allTasks)
    
})
export const shopify=router;