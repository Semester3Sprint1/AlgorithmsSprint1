const Stack = require("./Classes/stack");
let stack = new Stack();

const Queue = require("./Classes/que");
let queue = new Queue();

let prompt = require("prompt-sync")({ sigint: true });

let { Client, Pool } = require("pg");

let client = new Client({
  host: "localhost",
  user: "alex",
  port: 5432,
  password: "password",
  database: "spygames",
});

const app = async (client) => {
  client.connect();

  let id = await selectAgent(client);

  await menuSelect(client, id);

  setTimeout(() => console.log("Connection terminating..."), 6000);
  setTimeout(() => client.end(), 7000);
};

const selectAgent = async (client) => {
  console.log("Welcome To DZ Flowers");
  console.log("");
  let id = prompt("Enter Employee ID: ");

  let agentCheck = `SELECT a.code_name FROM public."Agent" a
  WHERE a.agent_id = ${id};`;

  let res = await client.query(agentCheck);
  console.log(res.rows[0].code_name);
  return id;
};

const menuSelect = async (client, id) => {
  console.log("");
  console.log("Make A Selection");
  console.log("");
  let choice = prompt("1: Leave Message 2: Retrieve Message 3. End: ");
  console.log(choice);
  console.log("");
  if (choice === "1") {
    addToDatabase(id);
  } else if (choice === "2") {
    removeFromDatabase();
  } else {
    console.log("Ending Session");
    client.end();
  }
};

const addToDatabase = async (id) => {
  let message = prompt("Enter Order Details: ");
  console.log("");
  let structure = prompt("Enter Q(Queue) or S(Stack): ");
  // checks the structure and applies the message to the correct drop box
  if (structure.toUpperCase() === "Q") {
    queue.enqueue(message, client, id);
    console.log("Message sending....");
  } else if (structure.toUpperCase() === "S") {
    stack.push(message, client, id);
    console.log("Message sending....");
  } else {
    console.log("Error: Enter Q or S");
  }
};

const removeFromDatabase = async () => {
  let structure = prompt("Enter Q(Queue) or S(Stack): ");
  // checks the structure and applies the message to the correct drop box
  if (structure.toUpperCase() === "Q") {
    await selfDestruct("queue");
  } else if (structure.toUpperCase() === "S") {
    await selfDestruct("stack");
  } else {
    console.log("Error: Enter Q or S");
  }
};

const selfDestruct = async (type) => {
  if (type === "stack") {
    var message = await stack.peek(client);
    var query = `DELETE FROM public."Stack"
    WHERE "Smessage" = '${message}';`;
  } else {
    var message = await queue.peek(client);
    var query = `DELETE FROM public."Que"
    WHERE "Qmessage" = '${message}';`;
  }
  console.log("");
  console.log(message);
  countdown();
  setTimeout(() => {
    let deleteQuery = client.query(query);
    console.log("Message deleted.");
    console.log("");
  }, 5000);
};

const countdown = () => {
  console.log();
  console.log("This message will self destruct in 5 seconds....");
  setTimeout(() => {
    console.log("4...");
  }, 1000);
  setTimeout(() => {
    console.log("3...");
  }, 2000);
  setTimeout(() => {
    console.log("2...");
  }, 3000);
  setTimeout(() => {
    console.log("1...");
  }, 4000);
};

app(client);

// client
//   .query(agentCheck)
//   .then((res) => {
//     console.log("");
//     console.log(`Welcome Agent ${res.rows[0].code_name}`);
//     console.log("");
//     client.end();
//   })
//   .catch((e) => console.error(e.stack));
