let { Pool } = require("pg");
const Queue = require("./Classes/que");
let queue = new Queue();
let prompt = require("prompt-sync")({ sigint: true });

let pool = new Pool({
  host: "localhost",
  user: "alex",
  port: 5432,
  password: "password",
  database: "spygames",
});

let id = prompt("Enter Employee ID: ");
let message = prompt("Enter order Details: ");
queue.enqueue(message, pool, id);