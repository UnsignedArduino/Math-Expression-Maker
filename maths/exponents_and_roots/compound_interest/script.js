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

  const max = 10 + (10 * (difficulty + 1));
  const min = false ? -max : 0;
  const decimal_precision = 0;
  const chance_to_expr = 0 * (difficulty + 1);

  console.log("Number min: " + min);
  console.log("Number max: " + max);
  console.log("Decimal precision: " + decimal_precision);
  
  // a = p(1 + (r/n))^(nt)
  // p = principal (starting) amount
  // r = interest rate (decimal - 0.1 for 10%)
  // n = number of times per year the interest is compounded
  // t = time in years

  const p = round(random_number(min, max), decimal_precision);
  const r = round(random_number(0, 0.2), 2);
  const n = round(random_number(1, 6));
  const t = round(random_number(min, max));

  const equation = new MultiplicationOperation(
    new RealNumber(p),
    new ExponentationOperation(
      new AdditionOperation(
        new RealNumber(1),
        new DivisionOperation(
          new RealNumber(r),
          new RealNumber(n)
        )
      ),
      new MultiplicationOperation(
        new RealNumber(n),
        new RealNumber(t)
      )
    )
  );
  const equation_s = equation.as_string();
  
  const equation_t = "With a principal value of <b>$" + p + "</b>, " + 
                     "an interest rate of <b>" + (r * 100) + "%</b> " + 
                     "that is compounded <b>" + n + "</b> time" + (n == 1 ? "" : "s") + " a year, " + 
                     "what is the value after <b>" + t + "</b> year" + (t == 1 ? "" : "s") + "?";
  const answer = math.evaluate(equation_s);
  console.log("Answer: " + answer);
  const answer_t = "\\$" + math.parse(answer).toTex({parenthesis: "auto"});
  console.log("TeX: "  + answer_t);
  end_math_maker(equation_t, answer_t, true);
}

generate_equation();
