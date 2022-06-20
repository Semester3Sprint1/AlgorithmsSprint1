const Stack = require("./Classes/stack");
const stack = new Stack();
const Queue = require("./Classes/que");
const queue = new Queue();
let prompt = require("prompt");

var schema = {
  properties: {
    agentid: {
      description: "Enter Employee ID",
      pattern: /^[a-zA-Z\s\-]+$/,
      message: "Name must be only letters, spaces, or dashes",
      required: true,
    },
    structure: {
      description: "Enter Q(Queue) Or S(Stack)",
      pattern: /^[qsQS]+$/,
      message: "Enter Q or S",
      required: true,
    },
    message: {
      description: "Enter Order Details",
      required: true,
    },
  },
};

deadDrop = (Q, S) => {
  prompt.start();
  prompt.get(schema, (err, result) => {
    if (
      result.structure.toLocaleUpperCase === "Q"
        ? Q.enqueue(result)
        : S.push(result)
    )
      console.log("Bobs Flower Shop");
    console.log(`EmployeeId ${result.agentid}`);
    console.log(`Order Type: ${result.structure}`);
    console.log(`Order Details ${result.message}`);
    console.log(Q.items);
    console.log(S.items);
  });
};

deadDrop(queue, stack);
