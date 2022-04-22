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
                        <input class="tit" type="text" placeholder="Título do seu quizz" value="">
                        <input class="url" type="text" placeholder="URL da imagem do seu quizz" value="">
                        <input class="n" type="text" placeholder="Quantidade de perguntas do quizz" value="">
                        <input class="niveis" type="text" placeholder="Quantidade de níveis do quizz" value="">
                    </ul>
                    <button class="prosseguir" onclick="addDados_perguntas()">Prosseguir pra criar perguntas</button>
                </div>
            </div>
        </div>
    `
}

function addDados_perguntas(){
    let tit = document.querySelector(".tit");
    let url = document.querySelector(".url");
    let n = document.querySelector(".n");
    let niveis = document.querySelector(".niveis");
    if (tit.value !== "" && url.value !== "" && n.value !== "" && n.value % 1 === 0 && niveis.value !== ""){
        let dados = {
            titulo: tit.value,
            url_img: url.value,
            n_perg: n.value,
            num_niveis: niveis.value,
        }
        criarPerguntas(dados)
    }else{
        alert("Preencha todos os campos");
    }
}

function criarPerguntas(dados){
    const tela3= document.querySelector(".tela3");
    const part1 = document.querySelector(".parte1");
    part1.classList.add("escondido");
    tela3.innerHTML += `
        <div>
            <div class="">
                <div class="content tela32">
                    <p class="comando">Crie suas perguntas</p>
                </div>
            </div>
        </div>
    `
    const content = document.querySelector(".tela32");
    console.log(content);
    for (let i = 0; i < dados.n_perg; i++){
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
        <button class="prosseguir">Prosseguir pra criar níveis</button>
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
    `
}

/*---------------------------------------------- VARIÁVEIS GLOBAIS  ----------------------------------------------*/





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