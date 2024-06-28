// Inicializa a lista de números sorteados
let listaDeNumerosSorteados = [];
// Define o limite máximo para o número secreto
let numeroLimite = 100;
// Gera o número secreto inicial
let numeroSecreto = gerarNumeroAleatorio();
// Inicializa o contador de tentativas
let tentativas = 1;

// Função para exibir texto em uma tag específica
function exibirTextoNaTela(tag, texto) {
    // Seleciona o elemento pela tag
    let campo = document.querySelector(tag);
    // Define o conteúdo do elemento
    campo.innerHTML = texto;
}

// Função para exibir a mensagem inicial do jogo
function exibirMensagemInicial() {
    // Exibe o título do jogo
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    // Exibe as instruções do jogo
    exibirTextoNaTela('p', `Escolha o número entre 1 e ${numeroLimite}`);
}

// Chama a função para exibir a mensagem inicial
exibirMensagemInicial();

// Função para gerar um número aleatório não repetido
function gerarNumeroAleatorio() {
    // Gera um número aleatório dentro do limite
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    // Verifica se a lista está completa
    if (listaDeNumerosSorteados.length == numeroLimite) {
        // Limpa a lista se estiver completa
        listaDeNumerosSorteados = [];
    }
    // Verifica se o número já foi escolhido
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        // Gera outro número se já foi escolhido
        return gerarNumeroAleatorio();
    } else {
        // Adiciona o número à lista e o retorna
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

// Função para verificar o chute do usuário
function verificarChute() {
    let chute = document.querySelector('input').value; // Obtém o valor do chute

    if (chute == numeroSecreto) { // Verifica se o chute é igual ao número secreto
        exibirTextoNaTela('h1', 'Acertou!'); // Exibe mensagem de acerto
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // Pluraliza "tentativa" se necessário
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; // Monta mensagem de tentativas
        exibirTextoNaTela('p', mensagemTentativas); // Exibe mensagem de tentativas
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão de reiniciar
    } else {
        if (chute > numeroSecreto) { // Verifica se o chute é maior que o número secreto
            exibirTextoNaTela('p','O número secreto é menor'); // Exibe dica
        } else { // Caso o chute seja menor
            exibirTextoNaTela('p','O número secreto é maior'); // Exibe dica
        }
        tentativas++; // Incrementa o número de tentativas
        limparCampo(); // Limpa o campo de chute
    }
}

// Função para limpar o campo de chute
function limparCampo() {
    let chute = document.querySelector('input'); // Seleciona o campo de input
    chute.value = ''; // Limpa o valor do campo
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(); // Gera um novo número secreto
    limparCampo(); // Limpa o campo de chute
    tentativas = 1; // Reseta o contador de tentativas
    exibirMensagemInicial(); // Exibe a mensagem inicial do jogo
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilita o botão de reiniciar
}