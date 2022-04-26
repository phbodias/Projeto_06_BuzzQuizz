function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)/.test(url);
}

function validURL(str) {
    var regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if(!regex .test(str)) {
        return false;
    } else {
        return isImage(str);
    }
}

function validHexa(str){
    var regex = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i;
    if(!regex. test(str)) {
        return false;
    } else {
        return true;
    }
}

function addQuizz(){
    const tela = document.querySelector(".tela");    
    const tela1 = document.querySelector(".tela1");
    tela1.classList.add("escondido");
    tela.innerHTML += `
        <div class="tela3">
            <div class="parte1">
                <div class="content tela31">
                    <p class="comando">Comece pelo começo</p>
                    <ul>
                        <input class="tit" type="text" placeholder="Título do seu quizz (20-65 caracteres)" value="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa">
                        <input class="url" type="text" placeholder="URL da imagem do seu quizz" value="https://img.freepik.com/vetores-gratis/imagens-animadas-abstratas-neon-lines_23-2148344065.jpg?w=2000">
                        <input class="n" type="text" placeholder="Quantidade de perguntas do quizz (mínimo 3)" value="3">
                        <input class="niveis" type="text" placeholder="Quantidade de níveis do quizz (mínimo 2)" value="3">
                    </ul>
                    <button class="prosseguir" onclick="addDados_perguntas()">Prosseguir pra criar perguntas</button>
                </div>
            </div>
        </div>
    `
}

function verificaDados(title, url, n, niveis){
    if ((20 <= title.length && title.length <= 65) && validURL(url) && (n > 2) && (n % 1 === 0) && (niveis % 1 === 0) && (niveis > 1)){
        return true;
    }
    return false;
}

function addDados_perguntas(){
    let tit = document.querySelector(".tit");
    let url = document.querySelector(".url");
    let n = document.querySelector(".n");
    let niveis = document.querySelector(".niveis");
    if (verificaDados(tit.value, url.value, n.value, niveis.value)){
        dados.title = tit.value;
        dados.image = url.value;
        nPerguntas = n.value;
        nNiveis = niveis.value;
        criarPerguntas();
    }else{
        if (!validURL(url.value)){
            alert("URL inválida!")
        }else{
            alert("Preencha todos os campos conforme intruções");
        }
        tit.value = "";
        url.value = "";
        n.value = "";
        niveis.value = "";
    }
}

function criarPerguntas(){
    
    const tela3= document.querySelector(".tela3");
    const part1 = document.querySelector(".parte1");
    part1.classList.add("escondido");
    tela3.innerHTML += `
        <div class="content tela32">
            <ul class="comando">
                <p class="topico">Pergunta 1</p>
                <div class="inputs">
                <input class="titlePergunta" type="text" maxlength="65" placeholder="Texto da pergunta (min. 20 caracteres)" value="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa">
                    <input class="corPergunta" type="color" placeholder="Cor de fundo da pergunta (em hexadecimal)" value="#FFFFFF">
                </div>
                <p class="topico">Resposta correta</p>
                <div class="inputs">
                    <input class="respObrigatoria correta" type="text" placeholder="Resposta correta (obrigatório)" value="a">
                    <input class="urlObrigatoria" type="text" placeholder="URL da imagem (obrigatório)" value="https://i.pinimg.com/originals/e4/34/2a/e4342a4e0e968344b75cf50cf1936c09.jpg">
                </div>
                <p class="topico">Respostas incorretas</p>
                <div class="inputs">
                    <input class="respObrigatoria incorreta1" type="text" placeholder="Resposta incorreta (obrigatório)" value="a">
                    <input class="urlObrigatoria" type="text" placeholder="URL da imagem (obrigatório)" value="https://i.pinimg.com/originals/e4/34/2a/e4342a4e0e968344b75cf50cf1936c09.jpg">
                </div>
                <div class="inputs">
                    <input class="respOpcional" type="text" placeholder="Resposta incorreta 2" value="">
                    <input class="urlOpcional" type="text" placeholder="URL da imagem" value="">
                </div>
                <div class="inputs">
                    <input class="respOpcional" type="text" placeholder="Resposta incorreta 3" value="">
                    <input class="urlOpcional" type="text" placeholder="URL da imagem" value="">
                </div>
            </ul>
        </div>
    `
    
    const content = document.querySelector(".tela32");
    for (let i = 1; i < nPerguntas; i++){
        content.innerHTML += `
            <div>
                <div>
                    <div>
                        <ul onclick="abrirPergunta(this, ${i+1})">
                            <p class="topico">Pergunta ${i+1}<ion-icon name="create-outline"></ion-icon></p>
                        </ul>
                    </div>
                </div>
            </div>
        `
    };
    content.innerHTML += `
        <button class="prosseguir" onclick="verificarPerguntas()">Prosseguir pra criar níveis</button>
    `
}

function abrirPergunta(pergunta, i){
    const parent = pergunta.parentNode;
    parent.parentNode.classList.add("escondido");

    parent.parentNode.parentNode.innerHTML += `
        <div class="topicos ">
            <ul>
                <p class="topico">Pergunta ${i}</p>
                <div class="inputs">
                <input class="titlePergunta" type="text" maxlength="65" placeholder="Texto da pergunta (min. 20 caracteres)" value="">
                    <input class="corPergunta" type="text" placeholder="Cor de fundo da pergunta (em hexadecimal)" value="">
                </div>
                <p class="topico">Resposta correta</p>
                <div class="inputs">
                    <input class="respObrigatoria correta" type="text" placeholder="Resposta correta" value="">
                    <input class="urlObrigatoria" type="text" placeholder="URL da imagem" value="">
                </div>
                <p class="topico">Respostas incorretas</p>
                <div class="inputs">
                    <input class="respObrigatoria incorreta1" type="text" placeholder="Resposta incorreta 1" value="">
                    <input class="urlObrigatoria" type="text" placeholder="URL da imagem 1" value="">
                </div>
                <div class="inputs">
                    <input class="respOpcional" type="text" placeholder="Resposta incorreta 2" value="">
                    <input class="urlOpcional" type="text" placeholder="URL da imagem 2" value="">
                </div>
                <div class="inputs">
                    <input class="respOpcional" type="text" placeholder="Resposta incorreta 3" value="">
                    <input class="urlOpcional" type="text" placeholder="URL da imagem 3" value="">
                </div>
            </ul>
        </div>
    `
}

function verificarPerguntas(){
    if (verificarTudo()){
        return criarNiveis();
    }
}

function verificarTudo(){
    if (verificarTitulo() && verificarCor() && verificarRespObrigatoria() && urlObrigatoria() && verificarOpcional()){
        return true;
    }
    return false;
}

function verificarTitulo(){
    let titlePergunta = document.querySelectorAll(".titlePergunta");
    for (let i = 0; i < titlePergunta.length; i++){
        if (titlePergunta[i].value.length < 20) {
            alert("O titulo da pergunta deve ter no mínimo 20 caracteres!")
            return false;
        }
    }
    return true;
}

function verificarCor(){
    let corPergunta = document.querySelectorAll(".corPergunta");
    alert(corPergunta[0].value)
    for (let i = 0; i < corPergunta.length; i++){
        if (!validHexa(corPergunta[i].value)) {
            alert(corPergunta[i].value)
            alert("A cor da pergunta deve ser definida em formato hexadecimal!")
            return false;
        }
    }
    return true;
}

function verificarRespObrigatoria(){
    let respObrigatoria = document.querySelectorAll(".respObrigatoria");
    for (let i = 0; i < respObrigatoria.length; i++){
        if (respObrigatoria[i].value.length < 1) {
            alert("A resposta não pode ser vazia!")
            return false;
        }
    }
    return true;
}

function urlObrigatoria(){
    let urlObrigatoria = document.querySelectorAll(".urlObrigatoria");
    for (let i = 0; i < urlObrigatoria.length; i++){
        if (!validURL(urlObrigatoria[i].value)) {
            alert("A url não é válida!")
            return false;
        }
    }
    return true;
}

function verificarOpcional(){
    let respOpcional = document.querySelectorAll(".respOpcional");
    let urlOpcional = document.querySelectorAll(".urlOpcional");
    for (let i = 0; i < respOpcional.length; i++){
        if (respOpcional[i].value.length > 0 || urlOpcional[i].value.length > 0) {
            if (!validURL(urlOpcional[i].value) || respOpcional[i].value.length < 1 || urlOpcional[i].value.length < 1) {
                alert("Preencha os campos opcionais corretamente ou deixe-os em branco!")
                return false;
            }
        }
    }
    return true;
}

function criarNiveis(){
    const tela32 = document.querySelector(".tela32");
    const tela = document.querySelector(".tela");
    tela32.parentNode.classList.add("escondido");
    tela.innerHTML += `
        <div>
            <div class="content tela33">
                <p class="comando">Agora, decida os níveis</p>
                <ul>
                    <p class="topico">Nível 1</p>
                    <div class="inputs">
                        <input type="text" placeholder="Título do nível" value="">
                        <input type="text" placeholder="% de acerto mínima" value="">
                        <input type="text" placeholder="URL da imagem do nível" value="">
                        <input type="text" placeholder="Descrição do nível" value="" class="descNivel">
                    </div>
                </ul>
            </div>
        </div>
    `
    const content = document.querySelector(".tela33");
    for (let i = 1; i < nNiveis; i++){
        content.innerHTML += `
            <div>
                <div>
                    <ul onclick="abrirNivel(this, ${i+1})">
                        <p class="topico">Nível ${i+1}<ion-icon name="create-outline"></ion-icon></p>
                    </ul>
                </div>
            </div>
        `
    }
    content.innerHTML += `
        <button class="prosseguir" onclick="finalizar()">Finalizar Quizz</button>
    `
}

function abrirNivel(nivel, i){
    const parent = nivel.parentNode;
    parent.classList.add("escondido");
    parent.parentNode.innerHTML += `
        <div class="topicos ">
            <ul>
                <p class="topico">Nível ${i}</p>
                <div class="inputs">
                    <input type="text" placeholder="Título do nível" value="">
                    <input type="text" placeholder="% de acerto mínima" value="">
                    <input type="text" placeholder="URL da imagem do nível" value="">
                    <input type="text" placeholder="Descrição do nível" value="" class="descNivel">
                </div>
            </ul>
        </div>
    `
}

function finalizar(){
    const tela = document.querySelector(".tela33");
    tela.parentNode.classList.add("escondido");
    tela.parentNode.parentNode.innerHTML += `
        <div>
            <div>
                <div class="tela">
                    <div>
                        <div class="content tela34">
                            <p class="comando">Seu quizz está pronto!</p>
                            <img class="image_quizz" src="${dados.image}" alt="">
                            <p class="legenda">${dados.title}</p>
                            <button class="acessar" onclick="acessarQuiz()">Acessar Quizz</button>
                            <button class="voltarHome" onclick="home()">Voltar pra home</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    `
}

function home(){
    window.location.reload();
}

/*---------------------------------------------- VARIÁVEIS GLOBAIS  ----------------------------------------------*/

let nPerguntas, nNiveis;

let inputPerguntas = [];

let dados = {
    id:"",
    title: "", 
    image: "", 
    questions: [],
    levels: []
};

dados.questions.push({
    title:"",
    color:"#ffffff",
    answers:[{text:"", image:""},{text:"", image:""},{text:"", image:""},{text:"", image:""}]
})

dados.levels.push({
    title:"",
    image:"",
    minValue: "",
    text:""
});

//dados.questions[0].answers.push({text:"", image:""});

/* 


function a(){
    const question = {};
    const titlePergunta = document.querySelector(".titlePergunta");
    const corPergunta = document.querySelector(".corPergunta");
    if (titlePergunta.value !== "" && titlePergunta.value.length >= 20 && validHexa(corPergunta.value.toUpperCase())){
        const correta = document.querySelector(".correta");
        const urlCorreta = document.querySelector(".urlCorreta");
        const incorreta1 = document.querySelector(".incorreta1");
        const urlIncorreta1 = document.querySelector(".urlIncorreta1");
        const incorreta2 = document.querySelector(".incorreta2");
        const urlIncorreta2 = document.querySelector(".urlIncorreta2");
        const incorreta3 = document.querySelector(".incorreta3");
        const urlIncorreta3 = document.querySelector(".urlIncorreta3");
        question.title = titlePergunta.value;
        question.color = corPergunta.value;
        question.answers = [];
        const answer = {};
        const inco1 = {};
        const inco2 = {};
        const inco3 = {};
        if (correta.value !== "" && validURL(urlCorreta.value)){
            answer.text = correta.value;
            answer.image = urlCorreta.value;
            answer.isCorrectAnswer = true;
            question.answers.push(answer);
            if (incorreta1.value !== "" && validURL(urlIncorreta1.value)){
                inco1.text = incorreta1.value;
                inco1.image = urlIncorreta1.value;
                inco1.isCorrectAnswer = false;
                question.answers.push(inco1);
            }
            if (incorreta2.value !== "" && validURL(urlIncorreta2.value)){
                inco2.text = incorreta2.value;
                inco2.image = urlIncorreta2.value;
                inco2.isCorrectAnswer = false;
                question.answers.push(inco2);
            }
            if (incorreta3.value !== "" && validURL(urlIncorreta3.value)){
                inco3.text = incorreta3.value;
                inco3.image = urlIncorreta3.value;
                inco3.isCorrectAnswer = false;
                question.answers.push(answer);
                question.answers.push(inco3);
            }
            if (question.answers.length >= 2){
                criarNiveis();
            }else{
                alert("Insira ao menos 1 resposta errada!");
            }
        }else{
            alert("Insira a resposta correta!");
        }
    }else{
        alert(validHexa(corPergunta.value));
    }
    
}


function a(){
    console.log("cheguei aqui")
    console.log(dados.questions[0]);
    const question = {};
    const titlePergunta = document.querySelectorAll(".titlePergunta");
    const corPergunta = document.querySelectorAll(".corPergunta");
    if (titlePergunta.value !== "" && titlePergunta.value.length >= 20 && validHexa(corPergunta.value.toUpperCase())){
        const correta = document.querySelectorAll(".correta");
        const urlCorreta = document.querySelectorAll(".urlCorreta");
        const incorreta1 = document.querySelectorAll(".incorreta1");
        const urlIncorreta1 = document.querySelectorAll(".urlIncorreta1");
        const incorreta2 = document.querySelectorAll(".incorreta2");
        const urlIncorreta2 = document.querySelectorAll(".urlIncorreta2");
        const incorreta3 = document.querySelectorAll(".incorreta3");
        const urlIncorreta3 = document.querySelectorAll(".urlIncorreta3");
        question.title = titlePergunta.value;
        question.color = corPergunta.value;
        question.answers = [];
        const answer = {};
        const inco1 = {};
        const inco2 = {};
        const inco3 = {};
        if (correta.value !== "" && validURL(urlCorreta.value)){
            answer.text = correta.value;
            answer.image = urlCorreta.value;
            answer.isCorrectAnswer = true;
            question.answers.push(answer);
            if (incorreta1.value !== "" && validURL(urlIncorreta1.value)){
                inco1.text = incorreta1.value;
                inco1.image = urlIncorreta1.value;
                inco1.isCorrectAnswer = false;
                question.answers.push(inco1);
            }
            if (incorreta2.value !== "" && validURL(urlIncorreta2.value)){
                inco2.text = incorreta2.value;
                inco2.image = urlIncorreta2.value;
                inco2.isCorrectAnswer = false;
                question.answers.push(inco2);
            }
            if (incorreta3.value !== "" && validURL(urlIncorreta3.value)){
                inco3.text = incorreta3.value;
                inco3.image = urlIncorreta3.value;
                inco3.isCorrectAnswer = false;
                question.answers.push(answer);
                question.answers.push(inco3);
            }
            if (question.answers.length >= 2){
                criarNiveis();
            }else{
                alert("Insira ao menos 1 resposta errada!");
            }
        }else{
            alert("Insira a resposta correta!");
        }
    }else{
        alert(correta.value);
    }
    
}
*/