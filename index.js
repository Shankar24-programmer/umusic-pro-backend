import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import {authentication} from './routers/authenticationproviders.js'
import { shopify } from './routers/shopifystores.js';
import {applica} from './routers/application.js';
import {pro} from './routers/providers.js';
const app = express();
app.use(cors());
// app.use(express.json());

const MONGODB_URL = "mongodb+srv://shankar:Muthusankar2417@cluster0.rhfhh.mongodb.net"
async function createConnection() {
    const client = new MongoClient(MONGODB_URL);
    await client.connect();
    console.log("mongodb connected")
    return client;
}

export const client = await createConnection();
app.use(express.json())
app.use('/authenticationproviders', authentication)
app.listen(9001, () => {
    console.log('Authentication Providers Server Started')
})


async function shopifyConnection() {
    const client1 = new MongoClient(MONGODB_URL);
    await client1.connect();
    console.log("shopify mongodb connected")
    return client1;
}

export const client1 = await shopifyConnection();
app.use(express.json())
app.use('/shopifystores', shopify)
app.listen(9002, () => {
    console.log('Shopify Stores Server Started')
})

async function appConnection() {
    const client2 = new MongoClient(MONGODB_URL);
    await client2.connect();
    console.log("application mongodb connected")
    return client2;
}

export const client2 = await appConnection();
app.use(express.json())
app.use('/application', applica)
app.use('/providers', pro)
app.listen(9003, () => {
    console.log('Application Server Started')
    console.log('Providers server started')
})

