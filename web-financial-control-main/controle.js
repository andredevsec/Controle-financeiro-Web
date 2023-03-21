//const form = document.getElementById('#form')
const form = document.querySelector('#form')
const descrTransacaoInput = document.querySelector('#descricao')
const valorTransacaoInput = document.querySelector('#montante')
const balancoH1 = document.querySelector('#balanco')
const receitasP = document.querySelector('#din-positivo')
const despesasP = document.querySelector('#din-negativo')
const transacoesUl = document.querySelector('#transacoes')
const localStorageKey = 'transacoes'

let transacoesSalvas = JSON.parse(localStorage.getItem(localStorageKey))
if (transacoesSalvas == null) {
    transacoesSalvas = []
} else {
    
}

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const descrTransacao = descrTransacaoInput.value.trim()
    const valorTransacao = valorTransacaoInput.value.trim()

    if (descrTransacao === '' || valorTransacao === '') {
        alert('Informe os dados da transação!')
        return
    }

    const idTransacao = parseInt(Math.random() * 10000)

    const transacao = {
        id: idTransacao,
        descricao: descrTransacao,
        valor: parseFloat(valorTransacao),
    }

    transacoesSalvas.push(transacao)
    localStorage.setItem('transacoes', JSON.stringify(transacoesSalvas))

    somaAoSaldo(transacao)
    somaReceitaOuDespesa(transacao)
    addTransacaoAoDOM(transacao)

    descrTransacaoInput.value = ''
    valorTransacaoInput.value = ''
})

function somaAoSaldo(transacao) {
    let total = balancoH1.innerHTML.replace('R$' , '')
    total = parseFloat(total)
    total += transacao.valor
    // Template string
    balancoH1.innerHTML = `R$${total.toFixed(2)}`
}

function somaReceitaOuDespesa(transacao) {
    const elemento = transacao.valor > 0 ? receitasP : despesasP
    const substituir = transacao.valor > 0 ? '+ R$' : '- R$'
    let valorAtual = elemento.innerHTML.replace(substituir, '')
    valorAtual = parseFloat(valorAtual)
    valorAtual += Math.abs(transacao.valor)
    elemento.innerHTML = `${substituir}${valorAtual}`
}

function addTransacaoAoDOM(transacao) {
    const operador = transacao.valor > 0 ? '' : '-'
    const classe = transacao.valor > 0 ? 'positivo' : 'negativo'
    const li = document.createElement('li')
    li.classList.add(classe)
    li.innerHTML = `${transacao.descricao} <span>${operador}R$${Math.abs(transacao.valor)}</span><button class="delete-btn" onClick="deletaTransacao(${transacao.id})">X</button>`
    transacoesUl.append(li)
}

function carregarDados() {
    transacoesUl.innerHTML = ''
    balancoH1.innerHTML = 'R$0.00'
    receitasP.innerHTML = '+ R$0.00'
    despesasP.innerHTML = '- R$0.00'

    for (let i = 0; i < transacoesSalvas.length; i++) {
        const transacao = transacoesSalvas[i]
        somaAoSaldo(transacao)
        somaReceitaOuDespesa(transacao)
        addTransacaoAoDOM(transacao)
    }
}

carregarDados()

function deletaTransacao(idTransacao) {
    const indiceTransacao = transacoesSalvas.findIndex((t) => t.id == idTransacao) 

    transacoesSalvas.splice(indiceTransacao, 1)

    carregarDados()

    localStorage.setItem(localStorageKey, JSON.stringify(transacoesSalvas))
}



