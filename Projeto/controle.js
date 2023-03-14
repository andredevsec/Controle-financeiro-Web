//const form = document.getElementById('#form')
const form = document.querySelector("#form")
const descrTransacaoInput = document.querySelector("#descricao")
const valorTransacaoInput = document.querySelector("#montante")
const balancoH1 = document.querySelector("#balanco")

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const descrTransacao = descrTransacaoInput.value.trim()
    const valorTransacao = valorTransacaoInput.value.trim()

    if (descrTransacao === "" || valorTransacao === "") {
        alert("Informe os dados da transação!")
        return
    }

    const idTransacao = parseInt(Math.random() * 10000)

    const transacao = {
        id: idTransacao,
        descricao: descrTransacao,
        valor: parseFloat(valorTransacao),
    }

    somaAoSaldo(transacao)

    descrTransacaoInput.value = ""
    valorTransacaoInput.value = ""

})

function somaAoSaldo(transacao) {
    const valor = transacao.value

    let total = balancoH1.innerHTML.replace("R$" , "")
    total = parseFloat(total)
    total = total + transacao.valor
    balancoH1.innerHTML = `R$${total.toFixed(2)}`
}