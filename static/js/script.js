let data = document.querySelector("input")
const btn = document.querySelector(".btn")
let result = document.querySelector(".result")

btn.addEventListener("click" , () => {
  result.innerHTML = ""
  result.append(fib(data.value))
})

// Fibonacci function
function fib(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
  console.log(b)
}


