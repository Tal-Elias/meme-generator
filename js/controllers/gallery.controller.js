'use strict'

function renderGallery() {
    let imgs = getImgs()
    let strHTMLs = imgs.map(img => `
    <img src="./img/${img.id}.jpg" alt="" onclick="onImgSelect(${img.id})">
    `)
    document.querySelector('.gallery-container').innerHTML = strHTMLs.join('')
}

function onImgSelect(id) {
    const meme = getMeme()
    const { lines } = meme
    if (!lines.length) addLine()
    setImgById(id)
    toggleGallery()
}

function onSetFilterBy(filterBy) {
    filterBy = setImgFilter(filterBy)
    renderGallery()
}

function onSetFilterByKeyword(ev) {
    const keyword = ev.target.innerText.toLowerCase()
    onSetFilterBy({keywords: keyword})
}

function setKeywordsSize() {
    const keywordsMap = getKeywordsMap()
    const keywordsList = document.querySelectorAll('.keywords ul li')

    keywordsList.forEach(keyword => {
        const elKeyword = keyword.innerText.toLowerCase()
        if (keywordsMap[elKeyword]) {
            const fontSize = keywordsMap[elKeyword] * 2 + 12
            keyword.style.fontSize = `${fontSize}px`
        }
    })
}