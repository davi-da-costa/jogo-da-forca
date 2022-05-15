let letras_digitadas = []
let error_container = document.querySelector('.error_container')
document.querySelector('.fake_input').value = ""

document.querySelector('html').addEventListener("click", () => {
  document.querySelector('.fake_input').focus()
})

document.querySelector(".btn-primary").addEventListener("click", () => {
  window.open('../pages/game.html', "_self")
})

document.querySelector(".btn-secondary").addEventListener("click", () => {
  window.open('../index.html', "_self")
})

function lePalavras() {
  let word = ""

  fetch("../words.json")
    .then((res) => res.json())
    .then((res) => {
      let entries = Object.entries(res)
      for(let key in sessionStorage) { //palavras definidas pelo usuário
        if (key != 'length'
        && key != 'clear'
        && key != 'getItem'
        && key != 'key'
        && key != 'setItem'
        ){
          entries.push([key.toLowerCase(), sessionStorage[key]])
        }
      }
      word = entries[Math.floor(Math.random() * (entries.length))]
      document.querySelector(".dica").textContent = word[1].toUpperCase()
    })
    .then(() => {
      let letters = [...word[0]]
      for (let i = 0; i < letters.length; i++) {
        let letter_div = document.getElementById(`l${i + 1}`)
        letter_div.style.display = "flex"
      }
      adivinha(letters)
    });
}

function adivinha(letters) {
  let input = document.querySelector(".fake_input")
  input.addEventListener("input", (e) => {
    let letra_repetida = false
    let value = [...e.target.value]
    if(letras_digitadas.find((letra) => letra === value[value.length - 1].toUpperCase())) {
      letra_repetida = true
    }

    if(!letra_repetida) {
      let p = document.createElement("p")
      p.textContent = value[value.length - 1].toUpperCase()
      document.querySelector(".past_letters").appendChild(p)
      letras_digitadas.push(value[value.length - 1].toUpperCase())
    }

    let letra_valida = false
    let palavra_adivinhada = true
    
    for (let i = 0; i < letters.length; i++) {
      let letter_div = document.getElementById(`l${i + 1}`)
      if (value[value.length - 1] === letters[i].toLowerCase()) {
        if (letter_div.textContent === letters[i].toUpperCase()) {
          break
        }
        letter_div.textContent = letters[i].toUpperCase()
        letra_valida = true
      }
    }
    if (!letra_valida) {
       if (
        document.querySelector(".left_leg").style.visibility === "visible"
      ) {
        document.querySelector(".right_leg").style.visibility = "visible"
        error_container.textContent = "Você perdeu... Tente novamente!"
        input.style.display = "none"
        playSound('error')
        document.querySelector('.fake_input').blur()
      } else if (
        document.querySelector(".right_arm").style.visibility === "visible"
      ) {
        document.querySelector(".left_leg").style.visibility = "visible"
      } else if (
        document.querySelector(".left_arm").style.visibility === "visible"
      ) {
        document.querySelector(".right_arm").style.visibility = "visible"
      } else if (
        document.querySelector(".trunk").style.visibility === "visible"
      ) {
        document.querySelector(".left_arm").style.visibility = "visible"
      } else if (
        document.querySelector(".head").style.visibility === "visible"
      ) {
        document.querySelector(".trunk").style.visibility = "visible"
      } else {
        document.querySelector(".head").style.visibility = "visible"
      }
    }

    for(let i = 0; i < letters.length; i++) {
      let letter_div = document.getElementById(`l${i + 1}`)
      if(letter_div.textContent === '') palavra_adivinhada = false
    }
    if(palavra_adivinhada) {
      error_container.style.color = "green"
      error_container.textContent = "PARABÉNS!!!"
      input.style.display = "none"
      playSound('success')
      document.querySelector('.fake_input').blur()
    }
  })
}

function playSound (status) {
  if(status === 'success') {
    const audio = new Audio(`../audio/success.mp3`)
    audio.play()
  } else {
    const audio = new Audio(`../audio/error.wav`)
    audio.play()
  }
}

lePalavras()
