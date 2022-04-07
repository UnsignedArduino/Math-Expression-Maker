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
    return this.val;
  }

  as_tex() {
    return this.val;
  }
}

class Variable {
  constructor(val) {
    this.val = val;
  }

  evaluate() {
    return undefined;
  }

  as_string() {
    return this.val;
  }

  as_tex() {
    return this.val;
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
}

class AdditionOperation extends BinaryOperation {
  evaluate() {
    return this.val1.evaluate() + this.val2.evaluate();
  }

  as_string() {
    return "(" + this.val1.as_string() + "+" + this.val2.as_string() + ")";
  }
}

class SubtractionOperation extends BinaryOperation {
  evaluate() {
    return this.val1.evaluate() - this.val2.evaluate();
  }

  as_string() {
    return "(" + this.val1.as_string() + "-" + this.val2.as_string() + ")";
  }
}

class MultiplicationOperation extends BinaryOperation {
  evaluate() {
    return this.val1.evaluate() * this.val2.evaluate();
  }

  as_string() {
    return "(" + this.val1.as_string() + "*" + this.val2.as_string() + ")";
  }
}

class VariableWithCoefficient extends MultiplicationOperation {
  evaluate() {
    return this.val1.evaluate() * this.val2.evaluate();
  }

  as_string() {
    if (this.val1.evaluate() === 0) {
      return "(" + this.val1.as_string() + "*" + this.val2.as_string() + ")";
    } else if (this.val1.evaluate() === 1) {
      return "(" + this.val2.as_string() + ")";
    } else if (this.val1.evaluate() === -1) {
      return "(-" + this.val2.as_string() + ")";
    } else {
      return "(" + this.val1.as_string() + "" + this.val2.as_string() + ")";
    }
  }
}

class VariableWithCoefficientAndNoParenthesis extends MultiplicationOperation {
  evaluate() {
    return this.val1.evaluate() * this.val2.evaluate();
  }

  as_string() {
    if (this.val1.evaluate() === 0) {
      return this.val1.as_string() + "*" + this.val2.as_string();
    } else if (this.val1.evaluate() === 1) {
      return this.val2.as_string();
    } else if (this.val1.evaluate() === -1) {
      return "-" + this.val2.as_string();
    } else {
      return this.val1.as_string() + "" + this.val2.as_string();
    }
  }
}

class DivisionOperation extends BinaryOperation {
  evaluate() {
    return this.val1.evaluate() - this.val2.evaluate();
  }

  as_string() {
    return "(" + this.val1.as_string() + "/" + this.val2.as_string() + ")";
  }
}

class ExponentationOperation extends BinaryOperation {
  evaluate() {
    return Math.pow(this.val1.evaluate(), this.val2.evaluate());
  }

  as_string() {
    return "(" + this.val1.as_string() + "^" + this.val2.as_string() + ")";
  }
}

class RootOperation extends BinaryOperation {
  evaluate() {
    return math.nthRoot(this.val1.evaluate(), this.val2.evaluate());
  }

  as_string() {
    return "root(" + this.val1.as_string() + ", " + this.val2.as_string() + ")";
  }
}

const EXTENDED_EVALUATION_SCOPE = {
  root: math.nthRoot
};

const EXTENDED_LATEX_FUNCTIONS = {
  "root": (node, options) => {
    // Example: "\\sqrt[3]{64}"
    const param1 = node.args[0].toTex(options);
    const param2 = node.args[1].toTex(options);
    const root = "\\sqrt[" + param2 + "]{" + param1 + "}";
    // console.log("Root: " + root);
    return root;
  }
};

const EXTENDED_SIMPLIFICATION_RULES = [
  {
    l: "root(n1, n3) + root(n2, n3)",
    r: "root(n1 + n2, n3)"
  },
  {
    l: "root(n1, n3) - root(n2, n3)",
    r: "root(n1 - n2, n3)"
  },
  {
    l: "root(n1, n3) * root(n2, n3)",
    r: "root(n1 * n2, n3)"
  },
  {
    l: "root(n1, n3) / root(n2, n3)",
    r: "root(n1 / n2, n3)"
  }
];
