export class Identity<T> {
  constructor(public value: T) {}
  static of<U>(value: U) {
    return new Identity<U>(value);
  }
  map<U>(fn: (value: T) => U) {
    return Identity.of(fn(this.value));
  }
}
