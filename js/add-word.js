let error_container = document.querySelector('.error_container')

document.querySelector(".btn-secondary").addEventListener("click", () => {
  window.open('../index.html', "_self")
})

document.querySelector(".btn-primary").addEventListener('click', () => {
  let valor_digitado = document.querySelector(".field_word").value
  let is_ok = true
  valor_digitado = valor_digitado.split('\n')

  if (valor_digitado.length !== 2) {
    is_ok = false
    let error_msg = "Informe uma entrada válida!"
    error_container.textContent = error_msg
    error_container.style.color = 'red'
    setTimeout(() => {
      error_container.textContent = ""
    }, 5000)
  } else {
    for(let indice in valor_digitado) {
      if(valor_digitado[indice].length > 8) {
        is_ok = false
        let error_msg = "Use apenas 8 caracteres para cada campo!"
        error_container.textContent = error_msg
        setTimeout(() => {
          error_container.textContent = ""
        }, 5000)
      }
    }

    if(is_ok) {
      window.onbeforeunload = function () {
        sessionStorage.setItem(valor_digitado[0], valor_digitado[1])
      }
      window.open("../pages/game.html", "_self")
    }
  }
})