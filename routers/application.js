import express from 'express';
import {ObjectId} from "mongodb"
// import { response } from 'express';
import {client2} from '../index.js'

const router = express.Router();

router.get("/limit/:limit/:skip", async function (request, response){
    const Count1 = await client2.db("umusic").collection("application").find().count();
    console.log(Count1);
    const limit1 = request.params.limit;
    const skip1 = request.params.skip;
    const app = await client2.db("umusic").collection("application").find().limit(parseInt(limit1)).skip(parseInt(skip1)).toArray();
    // response.send(app);
    const data = {
        count : Count1,
        value : app
    }
    response.send(data);
    // console.log(request.params.limit)
})

router.get("/:id", async function(request, response) {
    const app = await client2.db("umusic").collection("application").findOne({"_id":ObjectId(request.params.id)})
    response.send(app);
})

router.delete("/:id", async function(request, response) {
    const app = await client2.db("umusic").collection("application").deleteOne({"_id":ObjectId(request.params.id)});
    response.send(app);
})

router.post("/", async function(request, response){
    //  const newshop = request.body;
     const result = await client2.db("umusic").collection("application").insertMany(request.body);
     response.send(result);
})

router.put("/:id", async function(request, response){
    const { id } = request.params;
    const editValue = request.body;
    const result = await client2.db("umusic").collection("application").updateOne({"_id":ObjectId(request.params.id)},{$set:editValue})
    response.send(result);
})
router.post("/getbyname", async (req, res) => {
    const val = req.body.name
    const regex = new RegExp([val].join(""), "i");
    const allTasks = await client2.db("umusic").collection("application").find({ name: { $regex: regex } }).toArray()
    // if(!allTasks || allTasks.length === 0) res.status(400).send({error : "No task was found"})
    // res.status(200).send(allTasks)
    res.send(allTasks)
    
})
export const applica=router;