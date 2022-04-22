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
