require("dotenv").config();
const {ShardingManager} = require('discord.js');
const Discord = require("discord.js");
const client = new Discord.Client();
const AutoPoster = require('topgg-autoposter')



const shards = new ShardingManager("./index.js", {
    token: process.env.TOKEN,
    totalShards:"auto"
});

shards.on("shardCreate", shard => {
    console.log(`[${new Date().toDateString().split(" ", 5).join(" ")}] Launched shard #${shard.id}`)
})

const poster = AutoPoster('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTg3NTEwMTAyMDQ1NDkzMCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTkzMzM3NDIwfQ.thn8CEA0uCPfSqcPH99c8syJlWvaP5hA1fzFh8Uy4Pk', shards);

shards.spawn(shards.totalShards,10000);
