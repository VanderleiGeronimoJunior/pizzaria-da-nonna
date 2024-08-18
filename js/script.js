
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
    // console.log(item)
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

    console.log('Pizza clicada ' + key)
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

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if(cart.length > 0){
        //  mostrar o carrinho
        seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex'
    }

    // exibir aside do carrinho no mobile
    seleciona('.menu-openner').addEventListener('click', () => {
        if(cart.length > 0){
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

const adionarCarrinho = () => {
    seleciona('.pizzaInfo--addButton').addEventListener('click', ()=>{
        console.log('Adicionar no Carrinho!!')

        // Pegar dados da janela modal atual
        // qual Pizza? pegue o modalKey para uasr pzzaJazon[modalKey]
        console.log('Pizza ' + modalKey)
        // Tamanho
        let size = seleciona('.pizzaInfo--size.selected').getAttribute('data-key')
        console.log('Tamanho ' + size)

        // quantidade
        console.log('Quant. ' + quantPizzas)

        // Preço
        let price = seleciona('.pizzaInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')
        console.log('Preço ' + price)


        // Crie um identificador que junte id e tamanho
        // concatene as duas informações separadas por um símbolo
        let identificador = pizzaJson[modalKey].id + 't' + size
        console.log(identificador)

        // Antes de adicionar verifique se já tem o código e tamanho
        // Para adicionarmos a quantidade
        let key = cart.findIndex( (item)=> item.identificador == identificador)
        console.log(key)

        if(key > -1){
            // console.log(cart[key].qt)
            // se encontrar aumente a quantidade
            cart[key].qt += quantPizzas
            console.log(cart[key].qt)
        }else{
            // adicionar objeto pizza no carrinho
            let pizza = {
                identificador,
                id: pizzaJson[modalKey].id,
                size, // size: size
                qt: quantPizzas,
                price: parseFloat(price) // price: price
            }
            cart.push(pizza)
            console.log(cart)
            console.log(pizza)
            console.log('Sub total R$ ' + (pizza.qt * pizza.price).toFixed(2))
        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

const fecharCarrinho = () => {
    // fechar o carrinho com o botão x no modo mobile
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}
const atualizarCarrinho = () => {
    // exibir números de itens no carrinho
    seleciona('.menu-openner span').innerHTML = cart.length

    // mostrar ou não o carrinho
    if(cart.length > 0){
        seleciona('aside').classList.add('show')


        // zerar meu .cart para não fazer inserções duplicadas
        seleciona('.cart').innerHTML = ''

        // Crie as variáveis antes do for
        let subTotal = 0 
        let desconto = 0 
        let total = 0 


        // para preenche os itens do carrinho, calcule o subTotal
        for( let i in cart) {
            // use o find para pegar o item por id
            let pizzaItem  = pizzaJson.find( (item) => item.id == cart[i].id)
            console.log(pizzaItem)

            // em cada item pegar o subTotal
            subTotal += cart[i].price * cart[i].qt

            // fazer o clone, exibir na tela e depois preencher as informações
            let cartItem = seleciona('.models .cart--item').cloneNode(true)
            seleciona('.cart').append(cartItem)

            let pizzaSizeName = cart[i].size

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            // preenche as informações
            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

            //  selecionar botões + e -
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                console.log('clicou no botão mais')
                //  Adicionar apenas a quantidade que está nesse contexto
                cart[i].qt++
                // atualizar a quantidade
                atualizarCarrinho()
            })


            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                console.log('clicou no botão menos')
                if(cart[i].qt > 1){
                //  subtrair apenas a quantidade que está nesse contexto
                    cart[i].qt--
                }else{
                    // remover se for zero
                    cart.splice(i, 1)
                }

                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''
                
                // atualizar a quantidade
                atualizarCarrinho()
            })

            seleciona('.cart').append(cartItem)

        }

        // fora do for
        // calcule desconto 10% e total
        // desconto = subtotal * 0.1
        desc = 0
        desconto = subTotal * desc
        total = subTotal - desconto

        // exibir na tela os resultados
        // selecionar o último span do elemento
        // console.log(seleciona('.subtotal span:last-child'))
        seleciona('.subtotal span:last-child').innerHTML = formatoReal(subTotal)
        seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
        seleciona('.total span:last-child').innerHTML = formatoReal(total)

    }else {
        // ocultar o carrinho
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'

    }

}

const finalizarCarrinho = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('finalizar carrinho')
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'

        seleciona('.menu-openner span').innerHTML = '0'

        seleciona('.cart').innerHTML = ''

        seleciona('.subtotal span:last-child').innerHTML = ''
        seleciona('.desconto span:last-child').innerHTML = ''
        seleciona('.total span:last-child').innerHTML = ''
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

adionarCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCarrinho()