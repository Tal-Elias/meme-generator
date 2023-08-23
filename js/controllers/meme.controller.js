'use strict'

let gElCanvas
let gCtx
let gCurrFillColor = ''
let gCurrStrokeColor = ''

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // const {selectedImgId, lines} = getMeme()
    // console.log(selectedImgId, lines[0].color, lines[0].txt, lines[0].size);
    renderMeme()
    // resizeCanvas()
    // addListeners()
}

function addListeners() {
    // addMouseListeners()
    // addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function renderMeme() {
    const { selectedImgId, lines } = getMeme()
    const { url } = getImg()[selectedImgId]
    const elImg = new Image()
    elImg.src = url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
        drawText(lines[0].txt, lines[0].color, lines[0].size, lines[0].font, 200, 50)
    }
}

function drawText(text, color, size, font, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = (gCurrStrokeColor) ? gCurrStrokeColor : 'black'
    gCtx.fillStyle = (gCurrFillColor) ? gCurrFillColor : color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onInputText(txt) {
    setLineText(txt)
    renderMeme()
}

function toggleGallery() {
    const editor = document.querySelector('.main-content')
    const gallery = document.querySelector('.gallery')
    if (editor.classList.contains('hide')) {
        editor.classList.remove('hide')
        gallery.classList.add('hide')
    } else {
        editor.classList.add('hide')
        gallery.classList.remove('hide')
    }
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function onSetStrokeColor(strokeColor) {
    gCurrStrokeColor = strokeColor
    renderMeme()
}

function onSetFillColor(fillColor) {
    gCurrFillColor = fillColor
    renderMeme()
}

function onDownloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-img'
}
