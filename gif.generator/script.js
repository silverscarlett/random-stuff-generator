const API_KEY = "Z53tDskKvZ6XRLDYZr9ACfoeyVVtGLuP"
const randomUrl = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`
const quoteUrl = "https://api.chucknorris.io/jokes/random"
const input = document.getElementById('tag-input')
const gallery = document.getElementById('gif-gallery')
const btn = document.getElementById('gif-generator')
const quoteBtn = document.getElementById('quote-generator')
const quoteContainer = document.getElementById('quote-container')

btn.onclick = function () {
    gallery.innerHTML = ''
    if (input.value == '') {
        generateRandom()
    } else {
        generateTag()
    }
    input.value = ''
}

quoteBtn.onclick = function () {
    quoteContainer.innerHTML = ''
    generateQuote()
}

function generateRandom() {
    fetch(randomUrl)
        .then((resp) => {
            return resp.json()
        })
        .then((resp) => {
            //console.log(resp.data.images.original.url)
            const image = document.createElement('img')
            image.src = resp.data.images.original.url
            image.height = 500
            image.width = 500
            gallery.appendChild(image)
        })
}

function generateTag() {
    const inputValue = input.value
    const tagUrl = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${inputValue}`
    fetch(tagUrl)
        .then((resp) => {
            return resp.json()
        })
        .then((resp) => {
            //console.log(resp.data.images.original.url)
            const tagImage = document.createElement('img')
            tagImage.src = resp.data.images.original.url
            tagImage.height = 500
            tagImage.width = 500
            gallery.appendChild(tagImage)
        })
}

function enterBtn(event) {
    const ent = event.keyCode
    if (ent == 13) {
        gallery.innerHTML = ''
        generateTag()
        input.value = ''

    }
}
input.addEventListener('keydown', enterBtn)

function generateQuote() {
    fetch(quoteUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            const quote = document.createElement('h3')
            quote.innerHTML = data.value
            quoteContainer.appendChild(quote)
        })
}
