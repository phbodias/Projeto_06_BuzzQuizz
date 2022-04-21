function obterQuizz(){
    const obter = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    obter.then(sucess);
}

function sucess(resposta){
    let data = resposta.data;
    console.log(data[0]);
    const quizzes = document.querySelector(".quizzes");
    for (let i = 0; i < data.length; i++){
        quizzes.innerHTML += `
            <div class="quizz">
                <img src="${data[i].image}" alt="" onclick="ir_para_oquizz(this)">
                <p class="legenda">${data[i].title}</p>
            </div>
        `
    }
}

function addQuizz(){
    const tela1 = document.querySelector(".tela1");
    const tela3 = document.querySelector(".tela3");
    tela1.classList.add("escondido");
    tela3.classList.remove("escondido");
}

function ir_para_oquizz(){
    const tela1 = document.querySelector(".tela1");
    const tela = document.querySelector(".tela");
    tela1.classList.add("escondido");
    tela.innerHTML += `
        <div class="tela2">
            <div class="banner">
                <p>O quão Potterhead é você?</p>
            </div>
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
        </div>
    `
}

obterQuizz();

