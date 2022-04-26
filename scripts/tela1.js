function obterQuizz(){
    const obter = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    obter.then(sucess);
}

function sucess(resposta){
    const data = resposta.data;
    console.log(data);
    const quizzes = document.querySelector(".quizzes");
    for (let i = 0; i < data.length; i++){
        if (validURL(data[i].image)){
            quizzes.innerHTML += `
                <div class="quizz" name="${data[i].id}" onclick="abrirQuiz(this)" style="background-image: linear-gradient(to top, black, transparent), url(${data[i].image})">
                    <p class="legenda">${data[i].title}</p>
                </div>
            `
        }
    }
    verificaQuizLocal();
    function verificaQuizLocal(){
        const idsDesserializados = JSON.parse(localStorage.getItem("idsDoUsuario"));
        console.log("existeIDSalvo?");
        console.log(existeIDSalvo());
/*         console.log("data");
        console.log(data); */
        if (existeIDSalvo()) {
            console.log("passou aqui");
            for (let i = 0; i < idsDesserializados.length; i++){
                axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${idsDesserializados[i]}`)
                .then(renderizar);
            }
            function renderizar(response) {
                const data = response.data;
                const seus = document.querySelector(".quizzes_usuario");
                if (validURL(data.image)){
                    console.log("encontrou um igual");
                    seus.innerHTML += `
                        <div class="quizz" name="${data.id}" onclick="ir_para_oquizz(${data.id})" style="background-image: linear-gradient(to top, black, transparent), url(${data.image})">
                            <p class="legenda">${data.title}</p>
                        </div>
                    `
                }  
            }
            const nenhumQuiz = document.querySelector(".nenhum");
            const temQuiz = document.querySelector(".seus");
            nenhumQuiz.classList.add("escondido");
            temQuiz.classList.remove("escondido");
        }
    }
}

obterQuizz();

/*  



*/