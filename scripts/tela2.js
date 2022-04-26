//variável global com a qualtidade de acertos
let acertos = 0;
let levels;
let quiz = '';
function ir_para_oquizz(quizEscolhido){
    //salva o quiz escolhido para o caso de precisar reiniciar o quiz
    quiz = quizEscolhido;
    const tela1 = document.querySelector(".tela1");
    tela1.classList.add("escondido");

    const quizID = quizEscolhido.getAttribute("name");

    axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${quizID}`)
    .then(mostrarQuiz);
}

function mostrarQuiz(response) {
    const tela = document.querySelector(".tela");
    const quiz = response.data;
    const questoes = quiz.questions;

    //pegando as informações de níveis do quiz
    levels = quiz.levels;

    tela.innerHTML += `
        <div class="tela2">
            <div class="banner" style="background-image: url(${quiz.image})">
                <div class="mascara">
                </div>
                <p>${quiz.title}</p>
            </div>
            <ul class="perguntas">
            </ul>
            <div class="conteiner-quiz resultado escondido">
            </div>
            <button type="reset" class="reiniciar escondido" onclick="reiniciarQuiz()">Reiniciar Quizz</button>
            <span class="voltar escondido" onclick="voltar()">Voltar pra home</span>
        </div>
    `

    const perguntasDoQuiz = document.querySelector(".perguntas");

    for (let i = 0; i < questoes.length; i++) {
        const questao = questoes[i];

        perguntasDoQuiz.innerHTML += `
        <li class="conteiner-quiz">
            <div class="box-pergunta" style="background-color: ${questao.color}">
                <p>${questao.title}</p>
            </div>
    
            <div class="opcoes" id="${i}">
                <ul class="linha-1"></ul>
                <ul class="linha-2"></ul>
            </div>
        </li>`

        //Embaralhando as Respostas
        const respostas = embaralharRespostas(questao.answers);
        console.log(respostas);

        for (let j = 0; j < respostas.length; j++) {
            const alternativa = respostas[j];

            if(j<=1){
                //pega pelo id pois, pela querySelector iria pegar só o primeiro 
                const linha1 = document.getElementById(i).querySelector(".linha-1");
                linha1.innerHTML+= `
                <li class="alternativa" name="${alternativa.isCorrectAnswer}" onclick="verificarResposta(this)">
                    <div class="imagem">
                        <img src="${alternativa.image}" alt="">
                    </div>
                    <p>${alternativa.text}</p>
                </li>`
            }

            else{
                const linha2 = document.getElementById(i).querySelector(".linha-2");
                linha2.innerHTML+= `
                <li class="alternativa" name="${alternativa.isCorrectAnswer}" onclick="verificarResposta(this)">
                    <div class="imagem">
                        <img src="${alternativa.image}" alt="">
                    </div>
                    <p>${alternativa.text}</p>
                </li>`
            }
            
        }
    }
}

function verificarResposta(itemClicado){
    //pegando a div com todas as alternativas
    const alternativas = itemClicado.parentNode.parentNode;

    //Pegando o card da pergunta e verificando se ele já foi respondido
    const cardDoQuiz = alternativas.parentNode;
    const foiRespondido = cardDoQuiz.classList.contains("respondido");

    //Se a pergunta ainda não foi respondida
    if(!foiRespondido){

        //adiciona um identificador na alternativa clicada
        itemClicado.classList.add("clicado");
        /* perguntasRespondidas++; //incrementa o número de perguntas respondidas  */
        cardDoQuiz.classList.add("respondido"); //marca a pergunta como respondida
        const linha1 = alternativas.querySelector(".linha-1"); //pegando a linha 1
        const linha2 = alternativas.querySelector(".linha-2"); //pegando a linha 2
        
        //Passa as alternativas da linha 1 e da linha dois para arrays
        const listaLi1 = linha1.getElementsByTagName('li');
        const listaLi2 = linha2.getElementsByTagName('li');

        //Se a pergunta tiver mais de duas alternativas
        if (listaLi2 !== null) {
            //chama a função que processa a resposta do usuário
            processarResposta(listaLi1, itemClicado);
            processarResposta(listaLi2, itemClicado);
        }
        else{ //caso a pergunta tenha apenas duas alternativas
            processarResposta(listaLi1, itemClicado);
        }
        setTimeout(proximaPergunta, 2000, cardDoQuiz); //vai para a próxima pergunta
    }
}

//função que processa as respostas
function processarResposta(listaLi, itemClicado) {
    for (i = 0; i < listaLi.length; i++) {
        const li = listaLi[i];

        //coloca o efeito esbranquiçado
        if (!li.classList.contains("clicado")) {
            li.style.filter = "contrast(25%) brightness(140%)";
        }
        
        //Muda a cor da alternativa certa para verde e as erradas para vermelho
        if(li.getAttribute("name")==='true'){
            li.querySelector("p").style.color="#009C22";
            if (li === itemClicado) {
                acertos++;
            }
        }
        else if(li.getAttribute("name")==='false'){
            li.querySelector("p").style.color="#FF0B0B";
        }
    }
} 

function proximaPergunta(respondida){
    const ulPerguntas = document.querySelector(".perguntas");
    const todasAsPerguntas = ulPerguntas.querySelectorAll('li.conteiner-quiz');

    for (i = 0; i < todasAsPerguntas.length; i++) {
        const li = todasAsPerguntas[i];
        if (li === respondida) {
            //passa para a próxima pergunta apenas se não estivar na última
            if (i !== (todasAsPerguntas.length-1)) {
                const proxima = todasAsPerguntas[i+1];
                proxima.scrollIntoView({behavior: 'smooth'}); 
            }
            else if(i === (todasAsPerguntas.length-1)){
                fimDoQuiz(todasAsPerguntas.length);
            }
        }
    }
}

function fimDoQuiz(numDePerguntas) {
    //Pega a div de resultado
    const divResultado = document.querySelector(".resultado");
    //Calcula a porcentagem de acerto
    const porcentagem = Math.round((acertos / numDePerguntas)*100);

    //contabilizando o level
    let infosDoLevel;
    for (let i = 0; i < levels.length; i++) {
        if (porcentagem >=levels[i].minValue) {
            infosDoLevel = levels[i];
        }
    }

    //Constrói a tela de resultado no HTML
    divResultado.innerHTML+=`
    <div class="box-pergunta" style="background-color: #EC362D">
        <p>${porcentagem}% de acerto: ${infosDoLevel.title}</p>
    </div>

    <div class="conteudo">
        <img src="${infosDoLevel.image}" alt="" />
        <p>${infosDoLevel.image}</p>
    </div>
    `;

    //Torna visível a tela de resultado
    divResultado.classList.remove("escondido");

    //Torna visível os botões de reiniciar quiz e de voltar
    const btnReiniciar = document.querySelector(".reiniciar");
    const btnVoltar = document.querySelector(".voltar");
    btnReiniciar.classList.remove("escondido");
    btnVoltar.classList.remove("escondido");

    //Faz um scroll até a tela de resultado
    divResultado.scrollIntoView({behavior: 'smooth'});
}

function voltar() {
    window.location.reload();
}

function reiniciarQuiz() {
    //zera as variáveis
    acertos = 0;

    //Faz o scroll para o topo da página.
    window.scroll({
        top: 0,
        behavior: 'smooth'
    });
    const divResultado = document.querySelector(".resultado");
    //limpa a tela para reiniciar o quiz
    divResultado.innerHTML="";
    divResultado.classList.add("escondido");

    //1-Pegar a lista de perguntas dentro da ul "perguntas"
    const ulPerguntas = document.querySelector(".perguntas");
    const listaDePerguntas = ulPerguntas.querySelectorAll('li.conteiner-quiz');
    //2-Dentro de um for correr a lista para pegar um card de pergunta por vez
    for (let i = 0; i < listaDePerguntas.length; i++) {
        const pergunta = listaDePerguntas[i];
        //3-Remover a classe "respondido" do card de perguntas
        pergunta.classList.remove("respondido");
        //4-Outro for para correr a linha 1 e a linha 2 pegando cada uma das alternativas
        const linha1 = pergunta.querySelector(".linha-1"); 
        const linha2 = pergunta.querySelector(".linha-2");
        resetaAlternativas(linha1);
        resetaAlternativas(linha2);
    }

    function resetaAlternativas(linha) {
        //Gera um array com os li
        listaLi = linha.querySelectorAll('.alternativa');
        for (let j = 0; j < listaLi.length; j++) {
            const alternativa = listaLi[j];
            //5-Para cada alternativa remover o filtro de esbranquiçado
            alternativa.style.filter = "none";
            //6-Para cada alternativa remover a classe "clicado"
            alternativa.classList.remove("clicado");
            //7-Pegar o p de cada alternativa e voltar a cor para o tom inicial (#000000)
            alternativa.querySelector("p").style.color =  "#000000"
        }
    }

    //Remove os botões de reiniciar quiz e de voltar
    const btnReiniciar = document.querySelector(".reiniciar");
    const btnVoltar = document.querySelector(".voltar");
    btnReiniciar.classList.add("escondido");
    btnVoltar.classList.add("escondido");
}

function embaralharRespostas(questao) {
    //Embaralhando as respostas
    const respostas = questao.sort(embaralhar);

    function embaralhar() {
        return Math.random()-0.5;
    }
    return respostas;
}