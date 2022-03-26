"use strict";

const difficulty_selector = document.getElementById("difficulty_selector");
const allow_decimals_dom = document.getElementById("has_decimals");
const allow_negatives_dom = document.getElementById("has_negatives");

function changed_setting() {
  difficulty = parseInt(difficulty_selector.value, 10);
  use_decimals = allow_decimals_dom.checked;
  use_negatives = allow_negatives_dom.checked;
  generate_equation();
}

function generate_equation() {
  console.log("Generating math equation");
  console.log("Difficulty: " + difficulty);
  console.log("Use decimals: " + use_decimals);
  console.log("Use negatives: " + use_negatives);
  start_math_maker();
  
  let equation = "1+1";
  let tex = "1+1";
  
  let equation_t = math.parse(equation).toTex({parenthesis: "auto"});
  let answer = math.evaluate(equation);
  console.log("Equation: " + equation + "=" + answer);
  let answer_t = math.parse(answer).toTex({parenthesis: "auto"});
  end_math_maker(equation_t, answer_t);
}

generate_equation();
