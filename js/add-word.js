document.querySelector(".cancel").addEventListener('click', () => {
  window.open("../index.html", "_self")
})

document.querySelector(".save").addEventListener('click', () => {
  let valor_digitado = document.querySelector(".field_word").value
  valor_digitado = valor_digitado.split('\n')
  if (valor_digitado.length > 2) {
    alert("Informe uma entrada válida!")
    document.location.reload()
    return
  } else {
    for(let indice in valor_digitado) {
      if(valor_digitado[indice].length > 12 || indice.length > 8) {
        alert("Use no máximo 8 caracteres para a palavra e 12 caracteres para a dica!")
        document.location.reload()
        return
      }
    }

    window.onbeforeunload = function () {
      sessionStorage.setItem(valor_digitado[0], valor_digitado[1])
    }
    window.open("../pages/game.html", "_self")
  }
})