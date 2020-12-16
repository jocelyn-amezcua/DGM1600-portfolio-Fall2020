
async function getAPIData(url) {
    try {

        const response = await fetch(url)
        const data = await response.json()
        return data

    } catch (error) {
        console.error(error)
    }
}


function loadPage() {
    getAPIData(`https://pokeapi.co/api/v2/pokemon`).then
    (async (data) => {
        for (const pokemon of data.results) {
            await getAPIData(pokemon.url).then((pokeData) => {
                populatePokeCard(pokeData)
            })
        }
    })
}

const pokemonGrid = document.querySelector('.pokemonGrid')

/** load button
const loadButton = document.querySelector('button')
    loadButton.className = 'loadbutton'

loadButton.addEventListener('click', () => {
    getAPIData(`https://pokeapi.co/api/v2/pokemon/7`).then
    (async (data) => {
        let loadAbilities = document.createElement('ul')
        data.abilities.forEach(abilities => {
            console.log(data)
            let abilityItem = document.createElement('li')
            abilityItem.textContent = abilities.ability.name
            loadAbilities.appendChild(abilityItem)
        });
        let loadImage = document.createElement('img')
        loadImage.src = `../pokemon/images/007.png`
        pokemonGrid.appendChild(loadAbilities)
        pokemonGrid.appendChild(loadImage)
    })
})
**/


function populatePokeCard(pokemon) {
    let pokeScene = document.createElement('div')
        pokeScene.className = 'scene'
    let pokeCard = document.createElement('div')
        pokeCard.className = 'card'
        pokeCard.addEventListener('click', () => {
            pokeCard.classList.toggle('is-flipped')
        })
    
    pokeCard.appendChild(populateCardFront(pokemon))
    pokeCard.appendChild(populateCardBack(pokemon))
    pokeScene.appendChild(pokeCard)
    pokemonGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
    let cardFront = document.createElement('div')
        cardFront.className = `card_face card_face_front`
    let frontLabel = document.createElement('p')
    let frontImage = document.createElement('img')
    frontLabel.textContent = pokemon.name
        frontLabel.className = `frontlabeltext`
    frontImage.src = `../pokemon/images/${getImageFileName(pokemon)}.png`
    cardFront.appendChild(frontImage)
    cardFront.appendChild(frontLabel)
    return cardFront
}

function populateCardBack(pokemon) {
    let cardBack = document.createElement('div')
        cardBack.className = `card_face card_face_back`
    //let backLabel = document.createElement('p')
    let backImage = document.createElement('img')
    //backLabel.textContent = `I'm the back of the card`
    backImage.src = `../pokemon/images/cardback.png`
    //cardBack.appendChild(backLabel)
    cardBack.appendChild(backImage)
    return cardBack
}

function getImageFileName(pokemon) {
    if (pokemon.id < 10) {
        return `00${pokemon.id}`
    } else if (pokemon.id > 9 && pokemon.id < 99) {
        return `0${pokemon.id}`
    }
}


loadPage()