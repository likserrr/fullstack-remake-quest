declare global {
  interface Array<T> {
    sum(this: number[]): number;
  }
}

Array.prototype.sum = function () {
  let s = 0;
  for (let i = 0; i < this.length; i++) {
    s += this[i];
  }
  return s;
};

export {};
