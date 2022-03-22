
function make_coef_exp(){
  let out = ""
  if (difficulty == 0){
    out += Math.floor(Math.random()*3)
    out += "x"
  }
  return out
}

function generate_equation(){
  start_math_maker();
  let eq = "2x"
  if (difficulty == 0){
    //eq+="2x"
  }
  //eq = math.parse(eq).toTex()
  console.log(eq)
  end_math_maker(eq)
}
generate_equation()