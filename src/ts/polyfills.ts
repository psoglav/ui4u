declare interface Array<T> {
  /**
   * Shifts the array to the right, and returns the first element from the list.
   */
  shiftRight(): T;
  /**
   * Shifts the array to the left.
   */
  shiftLeft(): T;
  /**
   * Shifts the array until the value is the first in the list, and returns the first element from the list.
   * @param {T} value - A value the array should be shifted to.
   */
  makeFirst(value: T): void;
}

declare interface String {
  /**
   * Capitalizes the string.
   */
  capitalize(): string;
}

Array.prototype.shiftRight = function () {
  this.unshift(this.pop());
  return this[0];
};

Array.prototype.shiftLeft = function () {
  this.push(this.shift());
  return this[0];
};

Array.prototype.makeFirst = function (value) {
  while (this[0] != value && this.indexOf(value) != -1) {
    this.shiftLeft();
  }
};

String.prototype.capitalize = function () {
  return this[0].toUpperCase() + this.slice(1);
};
