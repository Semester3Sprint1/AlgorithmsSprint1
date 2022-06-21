const Stack = require("./Classes/stack");
let stack = new Stack();

const Queue = require("./Classes/que");
let queue = new Queue();

let prompt = require("prompt-sync")({ sigint: true });

let { Pool } = require("pg");

let pool = new Pool({
  host: "localhost",
  user: "mike",
  port: 5432,
  password: "database",
  database: "SpyGames",
});

console.log("Welcome To DZ Flowers");
console.log("");
// Agents enters their ID, Message and structure into the Dead Drop
let id = prompt("Enter Employee ID: ");

let agentCheck = `SELECT a.code_name FROM public."Agent" a
WHERE a.agent_id = ${id};`;
pool.connect();
pool
  .query(agentCheck)
  .then((res) => {
    console.log("");
    console.log(`Welcome Agent ${res.rows[0].code_name}`);
    console.log("");
    console.log("Make A Selection");
    console.log("");
    choice = prompt("1:Leave Message 2:Retrieve Message 3.End:  ");
    console.log("");
    if (choice === "1") {
      let message = prompt("Enter order Details: ");
      console.log("");
      let structure = prompt("Enter Q(Queue) or S(Stack): ");
      // checks the structure and applies the message to the correct drop box
      if (structure.toUpperCase() === "Q") {
        queue.enqueue(message, pool, id);
      } else if (structure.toUpperCase() === "S") {
        stack.push(message);
      } else {
        console.log("Error: Enter Q or S");
      }
    } else if (choice === "2") {
      console.log(2);
    } else {
      console.log("Ending Session");
    }
  })
  .catch((e) => console.error(e.stack));

pool.end();

// let agentCheck = `SELECT a.code_name FROM public."Agent" a
// WHERE a.agent_id = ${id};`;
// pool.connect();
// pool.query(agentCheck, (err, res) => {
//   if (!err) {
//     console.log(`Welcome Agent ${res.rows[0].code_name}`);
//   } else {
//     console.log(err.message);
//   }

//   pool.end();
// });

// let messageQ = `INSERT INTO public."Que"("Qmessage, agent_id) VALUES(${message}, ${id})`;

// if (
//   structure.toUpperCase() === "Q"
//     ? queue.enqueue(message)
//     : structure.toUpperCase() === "S"
//     ? stack.push(message)
//     : console.log("Error: Enter Q or S")
// );
// console.log(structure.toUpperCase());

// Agent comes to get the messages
// Selects the structure type and then views the message
// The message explodes and is deleted from the front of the box in Que and Top of the box in Stack

// id = prompt("Enter Employee ID: ");
// structure = prompt("Enter Q(Queue) or S(Stack): ");

// let explode = "Message will explode in 5 seconds";
// console.log(structure);
// if (structure.toUpperCase() === "Q") {
//   console.log("");
//   console.log(`message: ${queue.peek()}`);
//   console.log("");
//   console.log(explode);
//   queue.dequeue();
// } else if (structure.toUpperCase() === "S") {
//   console.log("");
//   stack.peek();
//   console.log("");
//   console.log(explode);
//   stack.pop();
// } else {
//   console.log("Error: Entere Q or S");
// }

// console.log(queue.items, stack.items);
