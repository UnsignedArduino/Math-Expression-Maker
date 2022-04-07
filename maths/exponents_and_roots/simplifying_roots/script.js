"use strict";

const difficulty_selector = document.getElementById("difficulty_selector");

let difficulty = 0;

function changed_setting() {
  difficulty = parseInt(difficulty_selector.value, 10);
  generate_equation();
}

function generate_expression_part(types, min, max, chance_to_expr, decimal_places) {
  if (random_number(0, 1) < chance_to_expr) {
    const randomOp = types[Math.floor(Math.random() * types.length)];
    if (randomOp === RootOperation) {
      return new randomOp(
        generate_expression_part(types, min, max, chance_to_expr - 0.1, decimal_places),
        new RealNumber(round(random_number(Math.max(min, 2), max), decimal_places))
      );
    } else {
      return new randomOp(
        generate_expression_part(types, min, max, chance_to_expr - 0.1, decimal_places),
        generate_expression_part(types, min, max, chance_to_expr - 0.1, decimal_places)
      );
    }
  } else {
    let part1;
    let part2;
    const variables = ["x", "y", "z", "a", "b", "c"];
    const randomVar = variables[Math.floor(Math.random() * Math.min(difficulty + 1, variables.length))];
    if (round(random_number(0, 3) == 0)) {
      part1 = new RealNumber(round(random_number(min, max), decimal_places));
    } else {
      // VariableWithCoefficient
      part1 = new VariableWithCoefficientAndNoParenthesis(
        new RealNumber(round(random_number(min, max), decimal_places)),
        new Variable(randomVar)
      );
    }
    part2 = new RealNumber(round(random_number(Math.max(min, 2), max), decimal_places));
    return new RootOperation(part1, part2);
  }
}

function generate_equation() {
  console.log("Generating math equation");
  console.log("Difficulty: " + difficulty);
  start_math_maker();

  const max = 3 + (2 * difficulty);
  const min = 0;
  const decimal_precision = 0;
  const chance_to_expr = 0.1;

  console.log("Number min: " + min);
  console.log("Number max: " + max);
  console.log("Decimal precision: " + decimal_precision);
  console.log("Chance to branch: " + chance_to_expr);

  const allOps = [
    AdditionOperation,
    SubtractionOperation,
    MultiplicationOperation,
    DivisionOperation
  ]
  const randomOp = allOps[Math.floor(Math.random() * allOps.length)];

  const reducedOps = [
    AdditionOperation,
    SubtractionOperation,
    MultiplicationOperation
  ]
  
  let expression = new randomOp(
    generate_expression_part(reducedOps, min, max, chance_to_expr, decimal_precision),
    generate_expression_part(reducedOps, min, max, chance_to_expr, decimal_precision),
  );
  
  let equation = expression.as_string();
  console.log("Equation: " + equation);
  let equation_t = math.parse(equation).toTex({parenthesis: "auto", implicit: "hide", handler: EXTENDED_LATEX_FUNCTIONS});
  console.log("TeX: "  + equation_t);
  let answer = math.simplify(equation, EXTENDED_SIMPLIFICATION_RULES);
  console.log("Answer: " + answer);
  let answer_t = answer.toTex({parenthesis: "auto", handler: EXTENDED_LATEX_FUNCTIONS});
  console.log("TeX: "  + answer_t);
  end_math_maker(equation_t, answer_t);
}

generate_equation();
