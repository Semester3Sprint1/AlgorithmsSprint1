// 1. push(), 2. pop(), 3.peek(), 4. isempty(),

class Stack {
  constructor() {
    this.items = [];
    this.count = 0;
  }

  // adding an element to the stack

  push(element, pool, id) {
    this.items[this.count] = element;
    this.count += 1;
    let Qmsg = `INSERT INTO public."Stack"(
        "Smessage", agent_id)   VALUES ( '${element}',${parseInt(id)});`;

    pool.query(Qmsg),
      (err, res) => {
        console.log(err, res);
      };
    return this.count - 1;
  }

  //removing an element from the stack

  pop() {
    if (this.count === 0) {
      return undefined;
    }
    let deleteItem = this.items[this.count - 1];
    this.count -= 1;
    return deleteItem;
  }

  //check the element at the top of the stack

  peek() {
    console.log(`Message: ${this.items[this.count - 1]}`);
    return this.items[this.count - 1];
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`;
    }
  }
  isEmpty() {
    console.log(this.count === 0 ? `stack is empty` : `stack is not`);
    return this.count == 0;
  }
}

module.exports = Stack;
