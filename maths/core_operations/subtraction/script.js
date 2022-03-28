"use strict";

const difficulty_selector = document.getElementById("difficulty_selector");
const allow_decimals_dom = document.getElementById("has_decimals");
const allow_negatives_dom = document.getElementById("has_negatives");

let difficulty = 0;
let use_decimals = false;
let use_negatives = false;

function changed_setting() {
  difficulty = parseInt(difficulty_selector.value, 10);
  use_decimals = allow_decimals_dom.checked;
  use_negatives = allow_negatives_dom.checked;
  generate_equation();
}

function generate_expression_part(type, min, division, max, chance_to_expr, decimal_places) {
  if (random_number(0, 1) < chance_to_expr) {
    const new_division = round(random_number(min, division), decimal_places);
    return new type(
      generate_expression_part(type, min, new_division, division, chance_to_expr - 0.1, decimal_places),
      generate_expression_part(type, division, new_division, max, chance_to_expr - 0.1, decimal_places)
    )
  } else {
    return new RealNumber(round(random_number(min, max), decimal_places));
  }
}

function generate_equation() {
  console.log("Generating math equation");
  console.log("Difficulty: " + difficulty);
  console.log("Use decimals: " + use_decimals);
  console.log("Use negatives: " + use_negatives);
  start_math_maker();

  const max = Math.pow(10, difficulty + 1);
  const min = use_negatives ? -max : 0;
  const decimal_precision = use_decimals ? difficulty + 1 : 0;
  const division = round(random_number(min, max), decimal_precision);
  const chance_to_expr = 0.1 * (difficulty + 1);

  console.log("Number min: " + min);
  console.log("Number max: " + max);
  console.log("Decimal precision: " + decimal_precision);
  
  let expression = new SubtractionOperation(
    generate_expression_part(SubtractionOperation, min, division, max, chance_to_expr, decimal_precision),
    generate_expression_part(SubtractionOperation, min, division, max, chance_to_expr, decimal_precision),
  );
  
  let equation = expression.as_string();
  let tex = expression.as_tex();
  console.log("Equation: " + equation);
  let equation_t = math.parse(equation).toTex({parenthesis: "auto"});
  let answer = math.evaluate(equation);
  console.log("Answer: " + answer);
  let answer_t = math.parse(answer).toTex({parenthesis: "auto"});
  end_math_maker(equation_t, answer_t);
}

generate_equation();
