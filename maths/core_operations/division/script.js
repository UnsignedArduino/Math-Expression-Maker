"use strict";

function generate_equation() {
  start_math_maker();
  let equation = "";
  let tex = "";
  const parts = Math.floor(difficulty / 2) + 2;
  let minimum = use_negatives ? -((difficulty + 1) * 100) : 1;
  let maximum = (difficulty + 1) * 100;
  let biggestNum = undefined;
  const orderNums = true;
  for (let i = 0; i < parts; i++) {
    let num = randomNumber(minimum, maximum);
    if (use_decimals) {
      num = round(num, Math.max(difficulty + 1, 0));
    } else {
      num = Math.round(num);
    }
    if (biggestNum === undefined || biggestNum < Math.abs(num)) {
      biggestNum = Math.abs(num);
      if (orderNums) {
        maximum = biggestNum * 0.5;
      }
    }
    equation += num;
    tex += num;
    if (i < parts - 1) {
      equation += "/";
      tex += "\\div";
    }
  }
  end_math_maker(equation, tex);
}

generate_equation();
