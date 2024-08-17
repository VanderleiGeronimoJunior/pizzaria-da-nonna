
let modalKey = 0
// Variável que controla a quantidade de pizza na modal
let quantPizzas = 1

let cart = [] // Carrinho

const seleciona = (element) => document.querySelector(element)
const selecionaTodos = (element) => document.querySelectorAll(element)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
}

const formatoMonetario = (valor) => {
    if(valor){
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.pizzaWindowArea').style.opacity = 0
    seleciona('.pizzaWindowArea').style.display = 'flex'
    setTimeout(()=> seleciona('.pizzaWindowArea').style.opacity = 1, 300)
} 
const fecharModal = () => {
    seleciona('.pizzaWindowArea').style.opacity = 0
    setTimeout(()=> seleciona('.pizzaWindowArea').style.display = 'none', 500)
} 

const botoesFechar = () => {
     // document.querySelector('.pizzaInfo--cancelButton')
    // .addEventListener("click", (e) => {
    //     document.querySelector('.pizzaWindowArea').style.display = 'none'
    // })

    // document.querySelector('.pizzaInfo--cancelMobileButton')
    // .addEventListener("click", (e) => {
    //     document.querySelector('.pizzaWindowArea').style.display = 'none'
    // })
    
    selecionaTodos('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton')
            .forEach((item)=> item.addEventListener('click', fecharModal))
}

const dataPizzas = (pizzaItem, item, index)=>{
    console.log(item)
    // console.log(index)
    // seta um atributo para identificar qual item/elemento fo clicado
    pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = formatoReal(item.price[2])
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
}

const dataModal = (item) => {
    // Preenchmento dos dados modal
    // document.querySelector('.pizzaBig img').src = item.img
    // document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`
    // document.querySelector('.pizzaInfo h1').innerHTML = item.name
    // document.querySelector('.pizzaInfo--desc').innerHTML = item.description
    console.log(item)
    seleciona('.pizzaBig img').src = item.img
    seleciona('.pizzaInfo h1').innerHTML = item.name
    seleciona('.pizzaInfo--desc').innerHTML = item.description
    seleciona('.pizzaInfo--actualPrice').innerHTML = formatoReal(item.price[2])
}

const pegarKey = (e) => {
    // .closest retorna o elemento mais próximo que tem a class qua passamos
    // do .pizza-item ele vai pegar o valor atributo data-key
    let key = e.target.closest('.pizza-item').getAttribute('data-key')
    console.log(key)

    console.log('Pizza clicada' + key)
    console.log(pizzaJson[key])

    //  garantir que a quantidade inicial de pizzas é 1
    quantPizzas = 1

    // Para manter a informação de qual pizza foi clicada
    modalKey = key

    return key
}

const preencherTamanhos = (key) => {
    // console.log(key)
    //  tira a seleção do tamanho atual e seleciona  o tamanho grando
    seleciona('.pizzaInfo--size.selected').classList.remove('selected')

    // seleciona todos os tamanhos
    selecionaTodos('.pizzaInfo--size').forEach((size, sizeIndex) =>{
        // seleciona o tamanho grande
        (sizeIndex == 2) ? size.classList.add('selected') : ''
        size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
    })
    
}

const escolherTamanhosPreco = (key) => {
    // Ações nos botões de tamanaho
    // selecionar todos os tamanhos
    selecionaTodos('.pizzaInfo--size').forEach((size, sizeIndex) =>{
        size.addEventListener('click', (e)=>{
        // clicou em um item, tirar a seleção dos outros e marcar o que você clicou
        // tirar a seleção de tamanho atual e selecionar o tamanho grande
        seleciona('.pizzaInfo--size.selected').classList.remove('selected')
        // marcar o  que você clicou, ao inves de usar e.target use size, pois ele é o item dentro do loop
        size.classList.add('selected')

        // mudar o preço de acordo com o tamanho
        seleciona('.pizzaInfo--actualPrice').innerHTML = formatoReal(pizzaJson[key].price[sizeIndex])
        })
    })
}

const mudarQuantidade = () => {
    // Ações nos botões + e - da janela modal
    seleciona('.pizzaInfo--qtmais').addEventListener('click', () => {
        quantPizzas++
        seleciona('.pizzaInfo--qt').innerHTML = quantPizzas
    })
    seleciona('.pizzaInfo--qtmenos').addEventListener('click', () => {
        if(quantPizzas > 1){
            quantPizzas--
            seleciona('.pizzaInfo--qt').innerHTML = quantPizzas
        }
    })
}


pizzaJson.map((item, index) => {
    
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true)
    
    // document.querySelector('.pizza-area').append(pizzaItem)
    seleciona('.pizza-area').append(pizzaItem)
    
    
    dataPizzas(pizzaItem, item, index)



    pizzaItem.querySelector('.pizza-item a')
            .addEventListener("click", (e) => {
            e.preventDefault()

            let chave = pegarKey(e)
            
            // Abrir janela modal
            // document.querySelector('.pizzaWindowArea').style.display = 'flex'
            abrirModal()

            dataModal(item)

            // pegar tamnhos selecionados
            preencherTamanhos(chave)

            // definir quantidade inicial como 1
            seleciona('.pizzaInfo--qt').innerHTML = quantPizzas

            // seleciona o tamnho e preço com o click no botão
            escolherTamanhosPreco(chave)
    
    })

    botoesFechar()

})

// mudar quantidade coom os botões - e +
mudarQuantidade()