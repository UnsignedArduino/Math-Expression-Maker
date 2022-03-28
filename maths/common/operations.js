// TeX references: https://tex.stackexchange.com/q/66
// https://katex.org/docs/support_table.html
// http://detexify.kirelabs.org/classify.html

class RealNumber {
  constructor(val) {
    this.val = val;
  }

  evaluate() {
    return this.val;
  }

  as_string() {
    return "(" + this.val + ")";
  }

  as_tex() {
    return this.as_string();
  }
}

class UnaryOperation {
  constructor(val1) {
    this.val1 = val1;
  }

  evalute() {
    return NaN;
  }

  as_string() {
    return undefined;
  }

  as_tex() {
    return undefined;
  }
}

class BinaryOperation {
  constructor(val1, val2) {
    this.val1 = val1;
    this.val2 = val2;
  }

  evalute() {
    return NaN;
  }

  as_string() {
    return undefined;
  }

  as_tex() {
    return undefined;
  }
}

class AdditionOperation extends BinaryOperation {
  evaluate() {
    return this.val1 + this.val2;
  }

  as_string() {
    return "(" + this.val1.as_string() + "+" + this.val2.as_string() + ")";
  }

  as_tex() {
    return "(" + this.val1.as_tex() + "+" + this.val2.as_tex() + ")";
  }
}
