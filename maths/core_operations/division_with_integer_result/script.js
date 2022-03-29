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

// https://stackoverflow.com/a/54776767/10291933
function get_factors(num) {
  if (num === 0) {
    return [0];
  }
  
  const maxFactorNum = Math.floor(Math.sqrt(num));
  const factorArr = [];
  let count = 0;  //count of factors found < maxFactorNum.

  for (let i = 1; i <= maxFactorNum; i++) {
    //inserting new elements in the middle using splice
    if (num % i === 0) {
      factorArr.splice(count, 0, i);
      let otherFactor = num / i; //the other factor
      if (i != otherFactor) {
        //insert these factors in the front of the array
        factorArr.splice(-count, 0, otherFactor);
      }
      count++;
    }
  }

  //swapping first and last elements
  let lastIndex = factorArr.length - 1;
  let temp = factorArr[lastIndex];
  factorArr[lastIndex] = factorArr[0];
  factorArr[0] = temp;

  return factorArr;
}

function generate_equation() {
  console.log("Generating math equation");
  console.log("Difficulty: " + difficulty);
  console.log("Use negatives: " + use_negatives);
  start_math_maker();

  const max = Math.pow(10, difficulty + 1);
  const min = use_negatives ? -max : 0;
  const decimal_precision = 0;
  const division = round(random_number(min, max), decimal_precision);
  const chance_to_expr = 0 * (difficulty + 1);

  console.log("Number min: " + min);
  console.log("Number max: " + max);
  console.log("Decimal precision: " + decimal_precision);

  const part_1 = generate_expression_part(DivisionOperation, min, division, max, chance_to_expr, decimal_precision);
  const part_1_factors = get_factors(Math.abs(part_1.evaluate()));
  const part_1_factor = part_1_factors[Math.floor(Math.random() * part_1_factors.length)];
  const part_2 = new RealNumber(part_1_factor * (use_negatives ? (round(random_number(0, 2)) === 0 ? -1 : 1) : 1));
  
  let expression = new DivisionOperation(part_1, part_2);
  
  let equation = expression.as_string();
  console.log("Equation: " + equation);
  let equation_t = math.parse(equation).toTex({parenthesis: "auto"});
  console.log("TeX: " + equation_t);
  console.log("TeX after format: " + equation_t);
  let answer = math.evaluate(equation);
  console.log("Answer: " + answer);
  let answer_t = math.parse(answer).toTex({parenthesis: "auto"});
  console.log("TeX: " + answer_t);
  end_math_maker(equation_t, answer_t);
}

generate_equation();
