function populatesUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(res => res.json()).then(states => {
        for (let state of states) {
            ufSelect.innerHTML = ufSelect.innerHTML + `<option value=${state.id}>${state.nome}</option>`
        }
    })
}

populatesUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city")
    const stateInput = document.querySelector("input[name=state")

    const ufValue = event.target.value

    const indexOfSelectedState =event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = '<option value="">Selecione a cidade</option>'
    citySelect.disabled = true
    fetch(url).then(res => res.json()).then(cities => {
        for (let city of cities) {
            citySelect.innerHTML = citySelect.innerHTML + `<option value=${city.nome}>${city.nome}</option>`
        }

        citySelect.disabled = false
    })


}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



//Itens de coleta

const itemstoCollect = document.querySelectorAll(".items-grid li")

for(let item of itemstoCollect){
    item.addEventListener("click", handleSelectedItem)
}



const collectedItem = document.querySelector("input[name=items]")


let selectedItems = [];


function handleSelectedItem(event){
    const itemLi = event.target//Armazena o card que eu cliquei
    
    itemLi.classList.toggle("selected")//Adiciona ou remove classe

    const itemId = itemLi.dataset.id//Pega o id que eu setei no html para o card clickado 


    const alreadySelected = selectedItems.findIndex (item => {//Verifica se existem items selecionados
        return item == itemId
        //Vai rodar a function até dar true, qnd ele dar true, vai armazenar o index (id) do numero em alreadySelected
    })

    //Se já estiver selecionado, tirar da seleção

    if(alreadySelected >= 0){ //Caso o item não esteja no array, alreadySelected = -1, por isso o >=0
        const filteredItems = selectedItems.filter( item => {//Filtered items é um novo array que vai percorrer o SelectedItems e filtrar para dentro dele caso retorne falso
            return item != itemId
        })

        selectedItems = filteredItems

        //Se não estiver selecionado, adicionar à seleção
    } else{
        selectedItems.push(itemId)
    } 

    //Atualizar o campo escondido com os itens selecionados

    collectedItem.value = selectedItems

}