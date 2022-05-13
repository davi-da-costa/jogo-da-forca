let words = {}

function lePalavras() {
  let word = ""

  fetch("../words.json")
    .then((res) => res.json())
    .then((res) => {
      let entries = Object.entries(res)
      word = entries[Math.ceil(10 * Math.random(entries.length - 1))]
      document.querySelector(".dica").textContent = word[1]
    })
    .then(() => {
      let letters = [...word[0]]
      for (let i = 0; i < letters.length; i++) {
        let letter_div = document.getElementById(`l${i + 1}`)
        letter_div.style.visibility = "visible"
      }
      adivinha(letters)
    });
}

function adivinha(letters) {
  document.querySelector("html").addEventListener("keypress", (e) => {
    let letra_valida = false
    let palavra_adivinhada = true
    
    for (let i = 0; i < letters.length; i++) {
      let letter_div = document.getElementById(`l${i + 1}`)
      if (e.key === letters[i].toLowerCase()) {
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
          if (window.confirm("Você perdeu :(\nGostaria de tentar novamente?")) {
            document.location.reload()
          } else {
            document.querySelector('html').removeEventListener()
          }
        }, 500)
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

lePalavras()
