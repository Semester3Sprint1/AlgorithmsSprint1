const Stack = require("./Classes/stack");
let stack = new Stack();

const Queue = require("./Classes/que");
let queue = new Queue();

let prompt = require("prompt-sync")({ sigint: true });

let { Client } = require("pg");

let client = new Client({
  host: "localhost",
  user: "mike",
  port: 5432,
  password: "database",
  database: "SpyGames",
});

console.log("Welcome To DZ Flowers");
console.log("");
let id = prompt("Enter Employee ID: ");

client.connect();
let agentCheck = `SELECT a.code_name FROM public."Agent" a
WHERE a.agent_id = ${id};`;

client
  .query(agentCheck)
  .then((res) => {
    console.log("");
    console.log(`Welcome Agent ${res.rows[0].code_name}`);
    console.log("");
  })
  .catch((e) => console.error(e.stack));
