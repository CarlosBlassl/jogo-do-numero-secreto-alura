let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio ();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,`Brazilian Portuguese Femele`, {rate:1.2});
}

function exibirMensagemIncial(){
    exibirTextoNaTela(`h1` ,  `Jogo do Número Secreto`);
    exibirTextoNaTela(`p` ,  `Escolha um numero entre 1 a ${numeroLimite}`);

}
exibirMensagemIncial();

function verificarChute() {
    let chute = document.querySelector(`input`).value;
    
    if(chute == numeroSecreto) {
        exibirTextoNaTela (`h1`, `Acertou !`);
        let palavraTentativas = tentativas > 1? `Tentativas` : `Tentativa`;
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}`;
        exibirTextoNaTela (`p`, mensagemTentativas );
        document.getElementById(`reiniciar`).removeAttribute(`disabled`);
    } else{
        if(chute > numeroSecreto) {
            exibirTextoNaTela( `p`, `O número secreto é menor`);
        } else{
            exibirTextoNaTela( `p`, `O número secreto e maior`);
        }
        tentativas++
        limparCampo();
    }

}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteados = [];
}
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){ 
    chute = document.querySelector(`input`);
    chute.value = ``;
}
function reiniciar() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemIncial();
    document.getElementById(`reiniciar`).setAttribute(`disabled`, true);
}