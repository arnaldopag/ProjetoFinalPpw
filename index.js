const url = 'https://projeto-final-ppw.herokuapp.com/api/115928'

function listarRegistros() {
    var dados = fetch(url).then(function (response) {
        return response.json()
    })
    dados.then(function (response) {
        var pages = document.getElementById('pages');
        pages.textContent = ""
        for (i = 0; i < response.length; i++) {
            var page = document.createElement('div')
            page.id = response[i]._id
            var image = document.createElement('div')
            var texts = document.createElement('div')
            var buttons = document.createElement('div')
            page.classList.add('page')
            image.classList.add('imagem')
            texts.classList.add('texts')
            buttons.classList.add('buttons')
            //imagem
            var img = document.createElement('img')
            img.alt = "imagem"
            img.src = response[i].imagem
            image.appendChild(img)
            //textos
            var nome = document.createElement('p')
            var temporada = document.createElement('p')
            var ep = document.createElement('p')
            var link = document.createElement('p')
            var a = document.createElement('a')
            nome.textContent = "Nome: " + response[i].nome
            temporada.textContent = "Temporada: " + response[i].temporada
            ep.textContent = "Episódio: " + response[i].episodio
            a.href = response[i].link
            a.textContent = "Clique aqui"
            a.target = "_blank"
            link.textContent = "Link: "
            link.appendChild(a)
            texts.appendChild(nome)
            texts.appendChild(temporada)
            texts.appendChild(ep)
            texts.appendChild(link)
            //botões
            var botaoExcluir = document.createElement('button')
            var botaoEditar = document.createElement('button')
            botaoEditar.classList.add('btn')
            botaoEditar.classList.add("btn-warning")
            botaoExcluir.classList.add('btn')
            botaoExcluir.classList.add('btn-danger')
            botaoEditar.appendChild(document.createTextNode('Editar'))
            botaoEditar.onclick = changeToEditar
            botaoEditar.value = response[i]._id
            botaoExcluir.appendChild(document.createTextNode('Excluir'))
            botaoExcluir.onclick = excluir
            botaoExcluir.value = response[i]._id
            buttons.appendChild(botaoExcluir)
            buttons.appendChild(botaoEditar)
            //junta tudo
            page.appendChild(image)
            page.appendChild(texts)
            page.appendChild(buttons)
            //coloca na view
            pages.appendChild(page)
        }
    })
}

function changeToEditar(evento) {
    var id = evento.target.value
    var mainPage = document.getElementById(id)
    var dados = fetch(url + "/" + id).then(function (response) {
        return response.json()
    })
    dados.then(function (response) {
        mainPage.textContent = ""
        var image = document.createElement('div')
        var texts = document.createElement('div')
        var buttons = document.createElement('div')
        var form = document.createElement('form')
        image.classList.add('imagem')
        texts.classList.add('texts')
        buttons.classList.add('buttons')
        //imagem
        var img = document.createElement('img')
        img.alt = "imagem"
        img.src = response.imagem
        img.id = "imagem-"+response._id
        image.appendChild(img)
        //textos
        var nome = document.createElement('input')
        var temporada = document.createElement('input')
        var ep = document.createElement('input')
        var link = document.createElement('input')
        var nomeP = document.createElement('p')
        var temporadaP = document.createElement('p')
        var epP= document.createElement('p')
        var linkP= document.createElement('p')
        nome.value = response.nome
        nome.id= "nome-"+response._id
        temporada.type = "number"
        temporada.value = response.temporada
        temporada.classList.add('number')
        temporada.min=1
        temporada.id="temporada-"+response._id
        ep.type = "number"
        ep.value = response.episodio
        ep.classList.add('number')
        ep.min=1
        ep.id="ep-"+response._id
        link.value=response.link
        link.id="link-"+response._id
        nomeP.textContent="Nome: "
        nomeP.appendChild(nome)
        temporadaP.textContent="Temporada: "
        temporadaP.appendChild(temporada)
        epP.textContent="Episódio: "
        epP.appendChild(ep)
        linkP.textContent="Link: "
        linkP.appendChild(link)
        form.appendChild(nomeP)
        form.appendChild(temporadaP)
        form.appendChild(epP)
        form.appendChild(linkP)
        texts.appendChild(form)
        //botões
        var botaoConcluido = document.createElement('button')
        botaoConcluido.classList.add('btn')
        botaoConcluido.classList.add('btn-success')
        botaoConcluido.appendChild(document.createTextNode('Concluir'))
        botaoConcluido.value=response._id
        botaoConcluido.onclick = editar
        buttons.appendChild(botaoConcluido)
        //junta tudo
        mainPage.appendChild(image)
        mainPage.appendChild(texts)
        mainPage.appendChild(buttons)
    })
}

function editar(evento){
    const id = evento.target.value
    var img = document.getElementById("imagem-"+id).value
    var serieNome = document.getElementById("nome-"+id).value
    var temp = document.getElementById("temporada-"+id).value
    var eps = document.getElementById("ep-"+id).value
    var link = document.getElementById("link-"+id).value
    let serie = {
        nome: serieNome,
        temporada: temp,
        episodio: eps,
        link: link,
        imagem: img
    }
    const texto = JSON.stringify(serie);
    const options = {
        method: "PUT",
        body: texto,
        headers: {
            "content-type": "application/json"
        }
    }
    const requisicao = fetch(url+"/"+id, options)
    requisicao.then(function (resposta) {
        console.log(resposta.statusText)
        console.log(resposta.status)
        listarRegistros()
    })
}

function cadastro() {
    var serieNome = document.getElementById('nome').value;
    var temp = document.getElementById('temp').value;
    var eps = document.getElementById('eps').value;
    var link = document.getElementById('link').value;
    var img = document.getElementById('img').value;
    let serie = {
        nome: serieNome,
        temporada: temp,
        episodio: eps,
        link: link,
        imagem: img
    }
    const texto = JSON.stringify(serie);
    const options = {
        method: "POST",
        body: texto,
        headers: {
            "content-type": "application/json"
        }
    }
    const requisicao = fetch(url, options)
    requisicao.then(function (resposta) {
        console.log(resposta.statusText)
        console.log(resposta.status)
        listarRegistros()
    })
}

function excluir(evento) {
    fetch(url + "/" + evento.target.value, {
        method: 'DELETE',
    }).then(function (resposta) {
        return resposta.json()
    }).then(function (response) {
        listarRegistros()
        console.log(response)
    })
}
listarRegistros()