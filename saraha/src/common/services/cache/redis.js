import Redis from "ioredis"
import {redis_key} from "../../../config/config.js";

const client = new Redis(redis_key);

client.on("error", (err) => {
    console.log("Redis connection error");
})

export async function set(key, value,ttl){
   await client.set(key, value,'EX',ttl);
}

export async function get(key){
    return await  client.get(key);
}

export async function del(key){
   await client.del(key);
}
