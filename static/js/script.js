// btn.addEventListener("click" , () => {
//   result.innerHTML = ""
//   result.append(fib(data.value))
// })

// // Fibonacci function
// function fib(n) {
//   let a = 1;
//   let b = 1;
//   for (let i = 3; i <= n; i++) {
//     let c = a + b;
//     a = b;
//     b = c;
//   }
//   return b;
//   console.log(b)
// }

let data = document.querySelector("input")
const loader = document.querySelector('.loader')
const btn = document.querySelector(".btn")
let result = document.querySelector(".result")
const errMessage = document.querySelector(".alert")
const urlServer = `http://localhost:5050/getFibonacciResults `
const spinner = document.querySelector('#spinner')
const searchResult = document.getElementById('searchResults')

btn.addEventListener('click', () => {
  loader.classList.remove('hidden')
  //Convert input to integer
  let pInt = parseInt(data.value)
  let url = `http://localhost:5050/fibonacci/${data.value}`

if (Number.isInteger(pInt)) {
  if (pInt > 50) {
      errMessage.innerHTML="Can't be larger than 50"
      loader.classList.add('hidden')
      errMessage.classList.remove('d-none')
      result.innerHTML=""
  }
  
  else if (pInt <= 0) {
      errMessage.innerHTML='Can\'t be smaller than 1'
      loader.classList.add('hidden')
      errMessage.classList.remove('d-none')
      result.innerHTML="";
  }
  else if(pInt === 42) {
      result.innerHTML='Server Error: 42 is the meaning of life'
      loader.classList.add('hidden')
      errMessage.classList.add('d-none')
  }
  else {
      errMessage.innerHTML = '';
      errMessage.classList.add('d-none')
      result.innerHTML="";

// fetching data if input between 0 and 50
      fetch(url)
      .then(response => response.json())
      .then(data => {
        setTimeout(function(){
          loader.classList.add('hidden')
          
          result.append(data.result)
          searchResult.innerHTML=""
          loadResults()},1000)
      })
    }
}  else {
  errMessage.innerHTML='Please Put only integer'
    loader.classList.add('hidden')
    errMessage.classList.remove('d-none')
    result.innerHTML="";
}
})

// Loading a list of fibonacci calculations

window.onload = setTimeout(loadResults, 1000)

function loadResults() {
    spinner.classList.add('d-none')
    fetch(urlServer)
    .then(response => response.json())
    .then(data => {
      data.results.sort(sortByDate)
      console.log(data)
      for (let i=0; i<3; i++) {
        const searchRes = `<p id='parResult' class='pb-1'>The Fibonacci Of <strong>${data.results[i].number}</strong> Is  <strong>${data.results[i].result}</strong>. Calculated at:   ${new Date(data.results[i].createdDate)}</p>`
        searchResult.insertAdjacentHTML('beforeend', searchRes)
      }
  })
}

// Sort array data by date

function sortByDate(a,b) {
  return new Date(b.createdDate) - new Date(a.createdDate)
}