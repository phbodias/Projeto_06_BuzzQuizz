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
    const tela2 = document.querySelector(".tela2");
    tela1.classList.add("escondido");
    tela2.classList.remove("escondido");
}

obterQuizz();

