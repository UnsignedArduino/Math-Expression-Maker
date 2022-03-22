"use strict";

function generate_equation() {
  start_math_maker();
  let equation = "";
  const parts = difficulty + 2;
  const minimum = use_negatives ? -((difficulty + 1) * 10) : 0;
  const maximum = (difficulty + 1) * 10;
  for (let i = 0; i < parts; i++) {
    let num = randomNumber(minimum, maximum);
    if (use_decimals) {
      num = round(num, Math.max(difficulty + 1, 0));
    } else {
      num = Math.round(num);
    }
    equation += num;
    if (i < parts - 1) {
      if (Math.round(randomNumber(0, 1)) == 1) {
        equation += "+";
      } else {
        equation += "-";
      }
    }
  }
  end_math_maker(equation);
}

generate_equation();
