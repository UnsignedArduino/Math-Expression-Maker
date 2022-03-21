function generate_equation() {
  start_math_maker();
  equation = "";
  const parts = difficulty + 2;
  
  for (let i = 0; i < parts; i++) {
    let minimum = difficulty < 3 ? 0 : -((difficulty + 1) * 10);
    let maximum = (difficulty + 1) * 10;
    let num = randomNumber(minimum, maximum);
    num = round(num, Math.max(difficulty - 1, 0));
    equation += num;
    if (i < parts - 1) {
      equation += "+";
    }
  }
  end_math_maker(equation);
}

generate_equation();
