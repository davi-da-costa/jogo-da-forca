

document.querySelector(".save").addEventListener('click', () => {
  let valor_digitado = document.querySelector(".field_word").value
  valor_digitado = valor_digitado.split('\n')
  if (valor_digitado.length > 2) {
    alert("Informe uma entrada válida!")
    document.location.reload()
  } else {
    for(let indice in valor_digitado) {
      if(valor_digitado[indice].length > 8) {
        alert("Informe uma entrada válida!")
        document.location.reload()
      }
    }
  }
  window.onbeforeunload = function () {
    sessionStorage.setItem(valor_digitado[0], valor_digitado[1])
  }
  window.open("../pages/game.html", "_self")
})