let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let latereal = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');
//Variaveis de controle de ambiente:
let etapaAtual = 0;
let numero = '';
let branco = false;
let votos = [];
//

function comecarEtapa () {
    let etapa = etapas[etapaAtual];
    let numeroHTML = '';
    numero = '';
    branco = false;
    for(let i=0; i<etapa.numeros;i++) {
        if(i===0) {
            numeroHTML += '<div class="numero pisca"></div>';
        }else {
            numeroHTML += '<div class="numero"></div>';
        }
        
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    latereal.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true;
        }else {
            return false;
        }
    });

    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}</br>Partido: ${candidato.partido}`;
        let fotosHtml = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }else{
                fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }

            
        }
        latereal.innerHTML = fotosHtml;
    }else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</>';
    }
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero!== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;
        const audio = new Audio('audio/click.mp3');
audio.play();
        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        }else {
            atualizaInterface()
        }
        
    }
}

function votoBranco() {
    if(numero === '') {
        branco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</>'
    }else {
        alert('Para votar em BRANCO, não pode ter digitado nenhum numero.')
    }
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfimardo = false;
    if(branco == true) {
        votoConfimardo = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });//para coletar os votos.
        const audio = new Audio('audio/fim_do_voto.mp3');
audio.play();

    }else if (numero.length === etapa.numeros) {
        votoConfimardo = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });//para coletar os votos.

    }
    if(votoConfimardo) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        }else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</>'
            const audio = new Audio('audio/fim_da_votacao.mp3');
audio.play();
        }
    }
}


//usar o teclado:
document.body.addEventListener('keyup', (event) => {
    let numeral = event.key

    let int = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (int.indexOf(numeral) != -1) {
        clicou(numeral)
    }
});

comecarEtapa();
