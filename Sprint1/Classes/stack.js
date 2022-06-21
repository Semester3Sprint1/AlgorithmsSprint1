// 1. push(), 2. pop(), 3.peek(), 4. isempty(),

class Stack {
  constructor() {
    this.items = [];
    this.count = 0;
  }

  // adding an element to the stack

<<<<<<< HEAD
=======
  // push(element) {
  //   this.items[this.count] = element;

  //   this.count += 1;
  //   return this.count - 1;
  // }

>>>>>>> c2620c7f58a32743ae001345863f805734548742
  push(element, pool, id) {
    this.items[this.count] = element;
    this.count += 1;
<<<<<<< HEAD
    let Qmsg = `INSERT INTO public."Stack"(
        "Smessage", agent_id)   VALUES ( '${element}',${parseInt(id)});`;
=======

    let Qmsg = `INSERT INTO public."Stack"(
    "Smessage", agent_id) VALUES ( '${element}',${parseInt(id)});`;
>>>>>>> c2620c7f58a32743ae001345863f805734548742

    pool.query(Qmsg),
      (err, res) => {
        console.log(err, res);
      };
<<<<<<< HEAD
=======

>>>>>>> c2620c7f58a32743ae001345863f805734548742
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

  async peek(pool) {
    let Smsg = `SELECT s."Smessage" FROM public."Stack" s;`;
    let res = await pool.query(Smsg);
    return res.rows[res.rows.length - 1].Smessage;

    // console.log(`Message: ${this.items[this.count - 1]}`);
    // return this.items[this.count - 1];
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
