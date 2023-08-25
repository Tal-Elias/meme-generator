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