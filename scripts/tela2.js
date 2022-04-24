//variável global com a qualtidade de acertos
let acertos = 0;

function ir_para_oquizz(quizEscolhido){
    const tela1 = document.querySelector(".tela1");
    const tela = document.querySelector(".tela");
    tela1.classList.add("escondido");

    const quizID = quizEscolhido.getAttribute("name");

    axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${quizID}`)
    .then(mostrarQuiz);
}

function mostrarQuiz(response) {
    const quiz = response.data;
    const questions = quiz.questions;
    const questoes = questions.sort(embaralhar);

    function embaralhar() {
        return Math.random()-0.5;
    }

    tela.innerHTML += `
        <div class="tela2">
            <div class="banner" style="background-image: url(${quiz.image})">
                <div class="mascara">
                </div>
                <p>${quiz.title}</p>
            </div>
        </div>
    `

    const tela2 = document.querySelector(".tela2");

    for (let i = 0; i < questoes.length; i++) {
        const questao = questoes[i];
        
        tela2.innerHTML += `
        <div class="conteiner-quiz">
            <div class="box-pergunta" style="background-color: ${questao.color}">
                <p>${questao.title}</p>
            </div>
    
            <div class="opcoes" id="${i}">
                <ul class="linha-1"></ul>
                <ul class="linha-2"></ul>
            </div>
        </div>`

        for (let j = 0; j < questao.answers.length; j++) {
            const alternativa = questao.answers[j];

            if(j<=1){
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
        cardDoQuiz.classList.add("respondido"); //marca a pergunta como respondida
        const linha1 = alternativas.querySelector(".linha-1"); //pegando a linha 1
        const linha2 = alternativas.querySelector(".linha-2"); //pegando a linha 2
        
        //Passa as alternativas da linha 1 e da linha dois para arrays
        const listaLi1 = linha1.getElementsByTagName('li');
        const listaLi2 = linha2.getElementsByTagName('li');

        //Se a pergunta tiver mais de duas alternativas
        if (listaLi2 !== null) {
            //chama a função de esbranquiçar as alternativas que não foram clicadas
            processarResposta(listaLi1, itemClicado);
            processarResposta(listaLi2, itemClicado);
        }
        else{
            processarResposta(listaLi1, itemClicado);
        }

        //função que dá o efeito esbranquiçado
        function processarResposta(listaLi) {
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
    }
}
