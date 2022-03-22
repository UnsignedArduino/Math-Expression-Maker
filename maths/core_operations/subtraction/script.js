"use strict";

function generate_equation() {
  start_math_maker();
  let equation = "";
  const parts = difficulty + 2;
  let minimum = use_negatives ? -((difficulty + 1) * 10) : 0;
  let maximum = (difficulty + 1) * 10;
  let biggestNum = undefined;
  const orderNums = (difficulty < 5);
  for (let i = 0; i < parts; i++) {
    let num = randomNumber(minimum, maximum);
    if (!use_decimals) {
      num = Math.round(num);
    }
    num = round(num, Math.max(difficulty + 1, 0));
    if (biggestNum === undefined || biggestNum < num) {
      biggestNum = num;
      if (orderNums) {
        maximum = difficulty < 4 ? biggestNum * 0.66 : biggestNum;
      }
    }
    equation += num;
    if (i < parts - 1) {
      equation += "-";
    }
  }
  end_math_maker(equation);
}

generate_equation();
