function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
      '((\\d{1,3}\\.){3}\\d{1,3}))'+
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
      '(\\?[;&a-z\\d%_.~+=-]*)?'+
      '(\\#[-a-z\\d_]*)?$','i');
    return !!pattern.test(str);
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
                        <input class="url" type="text" placeholder="URL da imagem do seu quizz" value="">
                        <input class="n" type="text" placeholder="Quantidade de perguntas do quizz (mínimo 3)" value="5">
                        <input class="niveis" type="text" placeholder="Quantidade de níveis do quizz (mínimo 2)" value="5">
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
        dados.questions =  [];
        dados.levels =  [];
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
            <p class="comando">Crie suas perguntas</p>
        </div>
    `
    const content = document.querySelector(".tela32");
    for (let i = 0; i < nPerguntas; i++){
        content.innerHTML += `
            <div>
                <div>
                    <div>
                        <ul onclick="abrirPergunta(this, ${i+1})">
                            <p class="topico" value="1">Pergunta ${i+1}<ion-icon name="create-outline"></ion-icon></p>
                        </ul>
                    </div>
                </div>
            </div>
        `
    };
    content.innerHTML += `
        <button class="prosseguir" onclick="criarNiveis()">Prosseguir pra criar níveis</button>
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
                    <input class="titlePergunta" type="text" placeholder="Texto da pergunta (min. 20 caracteres)" value="">
                    <input class="corPergunta" type="text" placeholder="Cor de fundo da pergunta (em hexadecimal)" value="">
                </div>
                <p class="topico">Resposta correta</p>
                <div class="inputs">
                    <input type="text" placeholder="Resposta correta" value="">
                    <input type="text" placeholder="URL da imagem" value="">
                </div>
                <p class="topico">Respostas incorretas</p>
                <div class="inputs">
                    <input type="text" placeholder="Resposta incorreta 1" value="">
                    <input type="text" placeholder="URL da imagem 1" value="">
                </div>
                <div class="inputs">
                    <input type="text" placeholder="Resposta incorreta 2" value="">
                    <input type="text" placeholder="URL da imagem 2" value="">
                </div>
                <div class="inputs">
                    <input type="text" placeholder="Resposta incorreta 3" value="">
                    <input type="text" placeholder="URL da imagem 3" value="">
                </div>
            </ul>
        </div>
    `
    a();
}

function a(){
    const question = {};
    const tit = document.querySelector(".titlePergunta");
    const col = document.querySelector(".corPergunta");;
    question.title = tit.value;
    question.color = col.value;
    console.log(question);
}

function criarNiveis(){
    const tela32 = document.querySelector(".tela32");
    const tela = document.querySelector(".tela");
    tela32.parentNode.classList.add("escondido");
    tela.innerHTML += `
        <div>
            <div class="content tela33">
                <p class="comando">Agora, decida os níveis</p>
            </div>
        </div>
        `
    const content = document.querySelector(".tela33");
    for (let i = 0; i < nNiveis; i++){
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
    console.log(dados);
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

let dados = {};
let nPerguntas, nNiveis;



/* 


tela.innerHTML += `
        <div class="tela3">
            <div>
                <div class="escondido">
                    <div class="content tela32">
                        <p class="comando">Crie suas perguntas</p>
                        <div class="">
                            <ul>
                                <p class="topico">Pergunta 1<ion-icon name="create-outline"></ion-icon></p>
                            </ul>
                            <ul>
                                <p class="topico">Pergunta 2<ion-icon name="create-outline"></ion-icon></p>
                            </ul>
                            <ul>
                                <p class="topico">Pergunta 3<ion-icon name="create-outline"></ion-icon></p>
                            </ul>
                        </div>
                        <div class="topicos ">
                            <ul>
                                <p class="topico">Pergunta 1</p>
                                <div class="inputs">
                                    <input type="text" placeholder="Texto da pergunta" value="">
                                    <input type="text" placeholder="Cor de fundo da pergunta" value="">
                                </div>
                                <p class="topico">Resposta correta</p>
                                <div class="inputs">
                                    <input type="text" placeholder="Resposta correta" value="">
                                    <input type="text" placeholder="URL da imagem" value="">
                                </div>
                                <p class="topico">Respostas incorretas</p>
                                <div class="inputs">
                                    <input type="text" placeholder="Resposta incorreta 1" value="">
                                    <input type="text" placeholder="URL da imagem 1" value="">
                                </div>
                                <div class="inputs">
                                    <input type="text" placeholder="Resposta incorreta 2" value="">
                                    <input type="text" placeholder="URL da imagem 2" value="">
                                </div>
                                <div class="inputs">
                                    <input type="text" placeholder="Resposta incorreta 3" value="">
                                    <input type="text" placeholder="URL da imagem 3" value="">
                                </div>
                            </ul>
                        </div>
                        <button class="prosseguir">Prosseguir pra criar níveis</button>
                    </div>
                </div>
            </div>
            <div class="escondido">
                <div class="content tela3-3">
                    <p class="comando">Agora, decida os níveis</p>
                    <div class=>
                        <ul>
                            <p class="topico">Nível 1<ion-icon name="create-outline"></ion-icon></p>
                        </ul>
                        <ul>
                            <p class="topico">Nível 2<ion-icon name="create-outline"></ion-icon></p>
                        </ul>
                        <ul>
                            <p class="topico">Nível 3<ion-icon name="create-outline"></ion-icon></p>
                        </ul>
                    </div>
                    <div class="topicos ">
                        <ul>
                            <p class="topico">Nível 1</p>
                            <div class="inputs">
                                <input type="text" placeholder="Título do nível" value="">
                                <input type="text" placeholder="% de acerto mínima" value="">
                                <input type="text" placeholder="URL da imagem do nível" value="">
                                <input type="text" placeholder="Descrição do nível" value="">
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `

*/