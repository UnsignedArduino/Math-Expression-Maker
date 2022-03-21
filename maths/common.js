const difficulty_selector = document.getElementById("difficulty_selector");
const expression_dom = document.getElementById("expression");
const show_answer_button = document.getElementById("show_answer_button");
const new_expression_button = document.getElementById("new_expression_button");
const answer_label_dom = document.getElementById("answer_label");
const answer_dom = document.getElementById("answer");

let expression = "";
let expression_tex = "";
let answer = "";
let answer_tex = "";

let showing_answer = false;

let difficulty = 0;

function start_math_maker() {
  expression_dom.innerHTML = "Generating equation...";
  hide_answer();
  show_answer_button.disabled = true;
  new_expression_button.disabled = true;
}

function end_math_maker(equation) {
  expression = equation;
  expression_tex = math.parse(expression).toTex({parenthesis: "auto"});
  console.log(expression + "=");
  answer = math.evaluate(equation);
  console.log(answer);
  answer_tex = math.parse(answer).toTex({parenthesis: "auto"});
  katex.render(expression_tex, expression_dom, {throwOnError: false});
  katex.render(answer_tex, answer_dom, {throwOnError: false});
  show_answer_button.disabled = false;
  new_expression_button.disabled = false;
}

function toggle_answer() {
  if (showing_answer) {
    hide_answer();
  } else {
    show_answer();
  }
}

function show_answer() {
  showing_answer = true;
  show_answer_button.innerHTML = "Hide answer";
  answer_label_dom.style.display = "";
  answer_dom.style.display = "";
}

function hide_answer() {
  show_answer_button.innerHTML = "Show answer";
  showing_answer = false;
  answer_label_dom.style.display = "none";
  answer_dom.style.display = "none";
}

function changed_difficulty() {
  difficulty = parseInt(difficulty_selector.value, 10);
  generate_equation();
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function round(num, places) {
  if (places == 0) {
    return Math.round(num);
  } else {
    const x = Math.pow(10, places);
    return Math.round(num * x) / x;
  }
}
