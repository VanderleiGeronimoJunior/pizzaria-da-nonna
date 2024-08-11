pizzaJson.map((item, index) => {
    
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true)
    
    document.querySelector('.pizza-area').append(pizzaItem)
    
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description


    pizzaItem.querySelector('.pizza-item a')
            .addEventListener("click", (e) => {
            e.preventDefault()

            // Abrir janela modal
            document.querySelector('.pizzaWindowArea').style.display = 'flex'

    // Preenchmento dos dados modal
    document.querySelector('.pizzaBig img').src = item.img
    document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`
    document.querySelector('.pizzaInfo h1').innerHTML = item.name
    document.querySelector('.pizzaInfo--desc').innerHTML = item.description

    
    })

    document.querySelector('.pizzaInfo--cancelButton')
    .addEventListener("click", (e) => {
        document.querySelector('.pizzaWindowArea').style.display = 'none'
    })

    document.querySelector('.pizzaInfo--cancelMobileButton')
    .addEventListener("click", (e) => {
        document.querySelector('.pizzaWindowArea').style.display = 'none'
    })


})