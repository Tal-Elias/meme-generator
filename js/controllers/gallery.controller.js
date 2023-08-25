'use strict'

function renderGallery() {
    let imgs = getImgs()
    let strHTMLs = imgs.map(img => `
    <img src="./img/${img.id}.jpg" alt="" id="${img.id}" onclick="onImgSelect(this)">
    `)
    document.querySelector('.gallery-container').innerHTML = strHTMLs.join('')
}

function onImgSelect(img) {
    const {id} = img
    setImgById(id)
    renderMeme()
    toggleGallery()
}

function onSetFilterBy(filterBy) {
    filterBy = setImgFilter(filterBy)
    renderGallery()
}