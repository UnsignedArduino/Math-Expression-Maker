"use strict";

const difficulty_selector = document.getElementById("difficulty_selector");

let difficulty = 0;

function changed_setting() {
  difficulty = parseInt(difficulty_selector.value, 10);
  generate_equation();
}

function generate_equation() {
  console.log("Generating math equation");
  console.log("Difficulty: " + difficulty);
  start_math_maker();

  const max = 10 + (10 * difficulty);
  const higher_max = 20 + (10 * (difficulty + 2));
  const min = false ? -max : 0;
  const decimal_precision = 0;
  const chance_to_expr = 0 * (difficulty + 1);

  console.log("Number min: " + min);
  console.log("Number max: " + max);
  console.log("Decimal precision: " + decimal_precision);
  
  // f(x) = a(1 + r)^x
  // a = initial amount
  // r = rate as decimal (0.1 for 10%)

  const r = round(random_number(-1, 1), Math.min(Math.max(difficulty + 1, 0), 2));
  let a;
  if (r < 0) {
    a = round(random_number(min, higher_max), decimal_precision);
  } else {
    a = round(random_number(min, max), decimal_precision);
  }
  const x = round(random_number(min, max / 2));

  const equation = new MultiplicationOperation(
    new RealNumber(a),
    new ExponentationOperation(
      new AdditionOperation(
        new RealNumber(1),
        new RealNumber(r)
      ),
      new RealNumber(x)
    )
  );
  const equation_s = equation.as_string();

  let equation_t;

  if (r < 0) {
    equation_t = "With an initial amount of <b>" + a + "</b> " + 
                 "and a <b>decay</b> rate of <b>" + (Math.abs(r) * 100) + "%</b>, " + 
                 "what is the value at <b>" + x + "</b>?";
  } else {
    equation_t = "With an initial amount of <b>" + a + "</b> " +
                 "and a <b>growth</b> rate of <b>" + (r * 100) + "%</b>, " + 
                 "what is the value at <b>" + x + "</b>?";
  }
  
  console.log("Equation: " + equation_s);
  const answer = math.evaluate(equation_s);
  console.log("Answer: " + answer);
  const answer_t = math.parse(answer).toTex({parenthesis: "auto"});
  console.log("TeX: "  + answer_t);
  end_math_maker(equation_t, answer_t, true);
}

generate_equation();
