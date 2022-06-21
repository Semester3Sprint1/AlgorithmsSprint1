class Queue {
  constructor() {
    this.items = [];
    this.lowestCount = 0;
    this.count = 0;
  }

  enqueue(element, pool, id) {
    this.items[this.count] = element;
    this.count++;

    let Qmsg = `INSERT INTO public."Que"(
    "Qmessage", agent_id)   VALUES ( '${element}',${parseInt(id)});`;

    pool.query(Qmsg),
      (err, res) => {
        console.log(err, res);
      };
    pool.end();
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  isEmpty() {
    return this.count - this.lowestCount === 0;
  }
  peek() {
    return this.items[this.lowestCount];
  }

  size() {
    return this.count - this.lowestCount;
  }
  clear() {
    this.count = 0;
    this.items = [];
    this.lowestCount = 0;
  }
  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`;
    }
    return objString;
  }
}

module.exports = Queue;
