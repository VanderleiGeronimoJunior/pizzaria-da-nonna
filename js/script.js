const seleciona = (element) => document.querySelector(element)
const selecionaTodos = (element) => document.querySelectorAll(element)

const abrirModal = () => {
    seleciona('.pizzaWindowArea').style.opacity = 0
    seleciona('.pizzaWindowArea').style.display = 'flex'
    setTimeout(()=>{
        seleciona('.pizzaWindowArea').style.opacity = 1
    }, 300)
} 
const fecharModal = () => {
    seleciona('.pizzaWindowArea').style.opacity = 0
    setTimeout(()=>{
        seleciona('.pizzaWindowArea').style.display = 'none'
    }, 500)
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
            .forEach((item)=>{
                item.addEventListener('click', fecharModal)
            })
}

const dataPizzas = (pizzaItem, item)=>{
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
}

const dataModal = (item) => {
    // Preenchmento dos dados modal
    // document.querySelector('.pizzaBig img').src = item.img
    // document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`
    // document.querySelector('.pizzaInfo h1').innerHTML = item.name
    // document.querySelector('.pizzaInfo--desc').innerHTML = item.description

    seleciona('.pizzaBig img').src = item.img
    seleciona('.pizzaInfo h1').innerHTML = item.name
    seleciona('.pizzaInfo--desc').innerHTML = item.description
    seleciona('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`
}



pizzaJson.map((item, index) => {
    
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true)
    
    // document.querySelector('.pizza-area').append(pizzaItem)
    seleciona('.pizza-area').append(pizzaItem)
    
    
    dataPizzas(pizzaItem, item)



    pizzaItem.querySelector('.pizza-item a')
            .addEventListener("click", (e) => {
            e.preventDefault()

            // Abrir janela modal
            // document.querySelector('.pizzaWindowArea').style.display = 'flex'
            abrirModal()

    dataModal(item)
    
    })

    botoesFechar()

})