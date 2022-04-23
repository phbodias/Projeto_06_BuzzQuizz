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
        const questoes = quiz.questions;
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
            for (let j = 0; j < questao.length; j++) {
                const alternativa = questao[j];
                
            }
        }
    }
}
