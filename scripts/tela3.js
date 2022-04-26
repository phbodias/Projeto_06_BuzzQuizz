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

function removerVazios(value){
    if (value.text !== ""){
        return value;
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
                    <input class="corPergunta" type="text" placeholder="Cor de fundo da pergunta (em hexadecimal)" value="#FFFFFF">
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
        <button class="prosseguir" onclick="verificarInputs()">Prosseguir pra criar níveis</button>
    `
}

function abrirPergunta(pergunta, i){
    if(!verificarInputs()){
        return;
    }
    const parent = pergunta.parentNode;
    parent.parentNode.classList.add("escondido");

    parent.parentNode.parentNode.innerHTML += `
        <div class="topicos ">
            <ul>
                <p class="topico">Pergunta ${i}</p>
                <div class="inputs">
                <input class="titlePergunta" type="text" maxlength="65" placeholder="Texto da pergunta (min. 20 caracteres)" value="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa">
                    <input class="corPergunta" type="text" placeholder="Cor de fundo da pergunta (em hexadecimal)" value="#FFFFFF">
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
}

function verificarInputs(){
    let titlePergunta = document.querySelectorAll(".titlePergunta");
    let corPergunta = document.querySelectorAll(".corPergunta");
    let respObrigatoria = document.querySelectorAll(".respObrigatoria");
    let urlObrigatoria = document.querySelectorAll(".urlObrigatoria");
    let respOpcional = document.querySelectorAll(".respOpcional");
    let urlOpcional = document.querySelectorAll(".urlOpcional");
    if (verificarTitulo(titlePergunta) && verificarCor(corPergunta) && verificarRespObrigatoria(respObrigatoria) && verificarUrlObrigatoria(urlObrigatoria) && verificarOpcional(respOpcional, urlOpcional) && titlePergunta.length !== parseInt(nPerguntas)){
        return true;
    }else if (verificarTitulo(titlePergunta) && verificarCor(corPergunta) && verificarRespObrigatoria(respObrigatoria) && verificarUrlObrigatoria(urlObrigatoria) && verificarOpcional(respOpcional, urlOpcional) && titlePergunta.length === parseInt(nPerguntas)){
        let j = 0;
        for (let i = 0; i < titlePergunta.length; i++){
            dados.questions.push({
                title: titlePergunta[i].value,
                color: corPergunta[i].value,
                answers:[{text:respObrigatoria[j].value, image:urlObrigatoria[j].value, isCorrectAnswer: true},{text:respObrigatoria[j+1].value, image:urlObrigatoria[j+1].value, isCorrectAnswer: false},{text:respOpcional[j].value, image:urlOpcional[j].value, isCorrectAnswer: false},{text:respOpcional[j+1].value, image:urlOpcional[j+1].value, isCorrectAnswer: false}]
            })
            j += 2;
            dados.questions[i].answers =  dados.questions[i].answers.filter(removerVazios);          
        }
        return criarNiveis();
    }
    return false;
}

function verificarTitulo(titlePergunta){
    for (let i = 0; i < titlePergunta.length; i++){
        if (titlePergunta[i].value.length < 20) {
            alert("O titulo da pergunta deve ter no mínimo 20 caracteres!")
            return false;
        }
    }
    return true;
}

function verificarCor(corPergunta){
    for (let i = 0; i < corPergunta.length; i++){
        if (!validHexa(corPergunta[i].value)) {
            alert("A cor da pergunta deve ser definida em formato hexadecimal!")
            return false;
        }
    }
    return true;
}

function verificarRespObrigatoria(respObrigatoria){
    for (let i = 0; i < respObrigatoria.length; i++){
        if (respObrigatoria[i].value.length < 1) {
            alert("A resposta não pode ser vazia!")
            return false;
        }
    }
    return true;
}

function verificarUrlObrigatoria(urlObrigatoria){
    for (let i = 0; i < urlObrigatoria.length; i++){
        if (!validURL(urlObrigatoria[i].value)) {
            alert("A url não é válida!")
            return false;
        }
    }
    return true;
}

function verificarOpcional(respOpcional, urlOpcional){
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
                        <input class="nivelTitulo" type="text" placeholder="Título do nível (mínimo de 10 caracteres)" value="">
                        <input class="porcentagem" type="text" placeholder="% de acerto mínima (um número entre 0 e 100, pelo menos 1 nível igual a 0)" value="">
                        <input class="imgNivel" type="text" placeholder="URL da imagem do nível (deve ter formato de URL)" value="">
                        <input class="descNivel" type="text" placeholder="Descrição do nível (mínimo de 30 caracteres)" value="" class="descNivel">
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
        <button class="prosseguir" onclick="verificarNivel()">Finalizar Quizz</button>
    `
}

function abrirNivel(nivel, i){
    if (!verificarNivel()){
        return;
    }
    const parent = nivel.parentNode;
    parent.classList.add("escondido");
    parent.parentNode.innerHTML += `
        <div class="topicos ">
            <ul>
                <p class="topico">Nível ${i}</p>
                <div class="inputs">
                    <input class="nivelTitulo" type="text" placeholder="Título do nível (mínimo de 10 caracteres)" value="">
                    <input class="porcentagem" type="text" placeholder="% de acerto mínima (um número entre 0 e 100, pelo menos 1 nível igual a 0)" value="">
                    <input class="imgNivel" type="text" placeholder="URL da imagem do nível (deve ter formato de URL)" value="">
                    <input class="descNivel" type="text" placeholder="Descrição do nível (mínimo de 30 caracteres)" value="" class="descNivel">
                </div>
            </ul>
        </div>
    `
}

function verificarNivel(){
    let nivelTitulo = document.querySelectorAll(".nivelTitulo");
    let porcentagem = document.querySelectorAll(".porcentagem");
    let imgNivel = document.querySelectorAll(".imgNivel");
    let descNivel = document.querySelectorAll(".descNivel");
    if (verificaNTitulo(nivelTitulo) && verificaPorcentagem(porcentagem) && verificaImgNivel(imgNivel) && verificaDescNivel(descNivel) && nivelTitulo.length !== parseInt(nNiveis)){
        return true;
    }else if (verificaNTitulo(nivelTitulo) && verificaPorcentagem(porcentagem) && verificaImgNivel(imgNivel) && verificaDescNivel(descNivel) && nivelTitulo.length === parseInt(nNiveis)){
        if (verificarZero(porcentagem)){
            for (let i = 0; i < nivelTitulo.length; i++){
                    dados.levels.push({
                        title:nivelTitulo[i].value,
                        image:imgNivel[i].value,
                        minValue:porcentagem[i].value,
                        text:descNivel[i].value
                    });
                }
            return finalizar();
        }
    }else{
        alert("Preencha corretamente os campos!");
        return false;
    }
}

function verificarZero(porcentagem){
    for (let i = 0; i < porcentagem.length; i++){
        if (porcentagem[i].value === "0"){
            return true;
        }
    }
    alert("Deve haver ao menos um nível com porcentagem 0!");
    return false;
}

function verificaNTitulo(nivelTitulo){
    for (let i = 0; i < nivelTitulo.length; i++){
        if (nivelTitulo[i].value.length < 10){
            return false;
        }
    }
    return true;
}

function verificaPorcentagem(porcentagem){
    for (let i = 0; i < porcentagem.length; i++){
        if (parseFloat(porcentagem[i].value) < 0 || parseFloat(porcentagem[i].value) > 100 || porcentagem[i].value === ""){
            return false;
        }
    }
    return true;
}

function verificaImgNivel(imgNivel){
    for (let i = 0; i < imgNivel.length; i++){
        if (!validURL(imgNivel[i].value)) {
            alert("A url não é válida!")
            return false;
        }
    }
    return true;
}

function verificaDescNivel(descNivel){
    for (let i = 0; i < descNivel.length; i++){
        if (descNivel[i].value.length < 30){
            return false;
        }
    }
    return true;
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
