function ir_para_oquizz(quizEscolhido){
    const tela1 = document.querySelector(".tela1");
    const tela = document.querySelector(".tela");
    tela1.classList.add("escondido");

    console.log("elemento recebido:")
    console.log(quizEscolhido);
    console.log("ID recebido:");

    const quizID = quizEscolhido.getAttribute("name");

    console.log(quizID);

    axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${quizID}`)
    .then(mostrarQuiz);

    function mostrarQuiz(response) {
        const quiz = response.data;
        const questions = quiz.questions;
        const questoes = questions.sort(embaralhar);

        function embaralhar() {
            return Math.random()-0.5;
        }

        console.log(quiz);

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
            console.log("Entrou pra rederizar");
            
            tela2.innerHTML += `
            <div class="conteiner-quiz">
                <div class="box-pergunta" style="background-color: ${questao.color}">
                    <p>${questao.title}</p>
                </div>
        
                <div class="opcoes" id="${i}">
                    <div class="linha-1"></div>
                    <div class="linha-2"></div>
                </div>
            </div>`

            for (let j = 0; j < questao.length; j++) {
                const alternativa = questao[j];

                if(j<=1){
                    console.log("Entrou no IF");
                    const linha1 = document.getElementById(i).querySelector(".linha-1");
                    linha1.innerHTML+= `
                    <div class="alternativa" name="${isCorrectAnswer}" onclick="verificarResposta()">
                        <div class="imagem">
                            <img src="${alternativa.image}" alt="">
                        </div>
                        <p>${alternativa.text}</p>
                    </div>`
                    console.log("Linha 1");
                    console.log(linha1);
                }
    
                else{
                    const linha2 = document.getElementById(i).querySelector(".linha-2");
                    linha2.innerHTML+= `
                    <div class="alternativa" name="${isCorrectAnswer}" onclick="verificarResposta()">
                        <div class="imagem">
                            <img src="${alternativa.image}" alt="">
                        </div>
                        <p>${alternativa.text}</p>
                    </div>`
                }
                
            }
        }
    }
}

/* 
<div class="conteiner-quiz">
    <div class="box-pergunta">
        <p>Em qual animal Olho-Tonto Moody transfigurou Malfoy?</p>
    </div>

    <div class="opcoes">
        <div class="linha-1">
            <div class="alternativa">
                <div class="imagem">
                    <img src="images/gato.jpg" alt="gato">
                </div>
                <p>Gatíneo</p>
            </div>
            
            <div class="alternativa">
                <div class="imagem">
                    <img src="images/rato.jpg" alt="Rato">
                </div>
                <p>Ratata</p>
            </div>
        </div>

        <div class="linha-2">
            <div class="alternativa">
                <div class="imagem">
                    <img src="images/Sapo.jpg" alt="Sapo gordo">
                </div>
                <p>Sapo gordo</p>
            </div>
            
            <div class="alternativa">
                <div class="imagem">
                    <img src="images/furao.jpg" alt="furão">
                </div>
                <p>Mustela putorius (o Furão)</p>
            </div>
        </div>
    </div>
</div>
*/
