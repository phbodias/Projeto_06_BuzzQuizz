function obterQuizz(){
    const obter = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    obter.then(sucess);
}

function sucess(resposta){
    let data = resposta.data;
    console.log(data);
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

obterQuizz();

/*  



*/