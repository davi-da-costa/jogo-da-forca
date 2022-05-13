let letras_digitadas = []

function lePalavras() {
  let word = ""

  fetch("../words.json")
    .then((res) => res.json())
    .then((res) => {
      let entries = Object.entries(res)
      for(let key in sessionStorage) {
        if([...key].length <= 8
        && key != 'length'
        && key != 'clear'
        && key != 'getItem'
        && key != 'key'
        && key != 'setItem'
        ){
          entries.push([key.toLowerCase(), sessionStorage[key].toUpperCase()])
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
  document.querySelector("html").addEventListener("keypress", (e) => {
    let letra_digitada = false
    for (let letra in letras_digitadas) {
      if (letras_digitadas[letra] === e.key.toUpperCase()) {
        letra_digitada = true
      }
    }

    if(!letra_digitada) {
      let p = document.createElement("p")
      p.textContent = e.key.toUpperCase()
      document.querySelector(".past_letters").appendChild(p)
      letras_digitadas.push(e.key.toUpperCase())
    }
    let letra_valida = false
    let palavra_adivinhada = true
    
    for (let i = 0; i < letters.length; i++) {
      let letter_div = document.getElementById(`l${i + 1}`)
      if (e.key === letters[i].toLowerCase()) {
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
        setTimeout(() => {
          alert("Você perdeu...\nTente novamente!")
          document.location.reload()
        }, 700)
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
      setTimeout(() => {
        alert("Parabéns!")
        document.location.reload()
      }, 700)
    }
  })
}

document.querySelector('html').addEventListener("click", () => {
  document.querySelector('.fake_input').focus()
})

lePalavras()
