'use strict'

let gElCanvas
let gCtx
let gCurrFillColor = ''
let gCurrStrokeColor = ''
let gStartPos
let gLineVerticalPoseight
let gLineCount
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    gLineVerticalPoseight = 90
    gLineCount = 0
    addListeners()
    renderMeme()
}

function renderMeme() {
    const { selectedImgId, lines } = getMeme()
    const { url } = getImg()[selectedImgId]
    const elImg = new Image()
    elImg.src = url
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

    for (const line of lines) {
        drawText(line.txt, line.fill, line.stroke, line.size, line.font, gElCanvas.width / 2, line.y)
    }
}

function drawText(text, fill, stroke, size, font, x, y) {
    // console.log(x, y);
    gCtx.lineWidth = 2
    gCtx.strokeStyle = (gCurrStrokeColor) ? gCurrStrokeColor : stroke
    gCtx.fillStyle = (gCurrFillColor) ? gCurrFillColor : fill
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    getEvPos(ev)
}

function onMove(ev) {

}

function onUp() {

}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        // Prevent triggering the mouse ev
        ev.preventDefault()
        // Gets the first touch point
        ev = ev.changedTouches[0]
        // Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    // console.log(pos);
    return pos
}

function findClickedLineIdx(clickedPos) {

}

function onInputText(txt) {
    setLineText(txt)
    renderMeme()
}

function onAddLine() {
    if (gLineCount > 7) return
    const meme = getMeme()
    const { lines } = meme
    const line = {
        txt: gMemeText[getRandomInt(0, 18)],
        font: 'roboto-bold',
        size: 40,
        fill: 'white',
        stroke: 'black',
        isDrag: false,
        y: gLineVerticalPoseight
    }
    gLineVerticalPoseight += 40
    gLineCount++
    lines.push(line)
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

function onSetFontIncrease() {
    const meme = getMeme()
    const line = meme.lines[0]
    if (line.size > 100) return
    line.size += 5
    renderMeme()
}

function onSetFontDecrease() {
    const meme = getMeme()
    const line = meme.lines[0]
    if (line.size <= 10) return
    line.size -= 5
    renderMeme()
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
