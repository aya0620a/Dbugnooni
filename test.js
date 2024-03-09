class State {
  value;
  callbacks;

  constructor() {
    this.value = 0;
    this.callbacks = [];
  }
  increment() {
    this.update(this.value + 1);
  }
  update(value) {
    if (this.value === value) {
      return;
    }
    this.value = value;
    this.notify();
  }
  subscribe(callback) {
    this.callbacks.push(callback);
  }
  notify() {
    this.callbacks.forEach(callback => callback(this.value));
  }
};

state1 = new State();
state2 = new State();

state1.subscribe(value => state2.update(value));
state2.subscribe(value => state1.update(value));

state1.increment();
console.log(state1.value, state2.value);

state2.increment();
console.log(state1.value, state2.value);

state1.increment();
console.log(state1.value, state2.value);
