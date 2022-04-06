"use strict";

const difficulty_selector = document.getElementById("difficulty_selector");
const allow_negatives_dom = document.getElementById("has_negatives");

let difficulty = 0;
let use_negatives = false;

function changed_setting() {
  difficulty = parseInt(difficulty_selector.value, 10);
  use_negatives = allow_negatives_dom.checked;
  generate_equation();
}

function generate_expression_part(type, min, max, chance_to_expr, decimal_places) {
  if (random_number(0, 1) < chance_to_expr) {
    return new type(
      generate_expression_part(type, min, max, chance_to_expr - 0.1, decimal_places),
      generate_expression_part(type, min, max, chance_to_expr - 0.1, decimal_places)
    )
  } else {
    return new RealNumber(round(random_number(min, max), decimal_places));
  }
}

function generate_equation() {
  console.log("Generating math equation");
  console.log("Difficulty: " + difficulty);
  console.log("Use negatives: " + use_negatives);
  start_math_maker();

  const max = 10 * (difficulty + 1);
  const min = use_negatives ? -max : 0;
  const decimal_precision = 0;
  const chance_to_expr = 0 * (difficulty + 1);

  console.log("Number min: " + min);
  console.log("Number max: " + max);
  console.log("Decimal precision: " + decimal_precision);

  const num = round(random_number(min, max));
  let expo = Math.abs(round(random_number(min, max / 2)));
  if (expo === 0) {
    expo ++;
  }
  
  const part1 = new RealNumber(Math.pow(num, expo));
  const part2 = new RealNumber(expo);
  
  let expression = new RootOperation(part1, part2);
  
  let equation = expression.as_string();
  console.log("Equation: " + equation);
  let equation_t = math.parse(equation).toTex({parenthesis: "auto", handler: EXTENDED_LATEX_FUNCTIONS});
  console.log("TeX: "  + equation_t);
  let answer = math.evaluate(equation, EXTENDED_EVALUATION_SCOPE);
  console.log("Answer: " + answer);
  let answer_t = math.parse(answer).toTex({parenthesis: "auto"});
  console.log("TeX: "  + answer_t);
  end_math_maker(equation_t, answer_t);
}

generate_equation();
