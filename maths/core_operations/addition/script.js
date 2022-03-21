function generate_equation() {
  start_math_maker();
  equation = "";
  const parts = difficulty + 2;
  for (let i = 0; i < parts; i++) {
    num = Math.random() * ((difficulty + 1) * 10);
    if (difficulty < 3) {
      num = Math.floor(num);
    }
    equation += num;
    if (i < parts - 1) {
      equation += "+";
    }
  }
  end_math_maker(equation);
}

generate_equation();
