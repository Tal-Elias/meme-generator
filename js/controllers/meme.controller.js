'use strict'

let gElCanvas
let gCtx
let gStartPos
let gLineVerticalPos
let gLineCount
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    gLineVerticalPos = 90
    gLineCount = 2
    addListeners()
    renderGallery()
    renderMeme()
}

function renderMeme() {
    const { selectedImgId, lines, selectedLineIdx } = getMeme()
    const { url } = getImgs()[selectedImgId]
    const elImg = new Image()
    elImg.src = url
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

    lines.forEach((line, idx) => {
        drawText(line, line.pos.x, line.pos.y)
        setTextMetrics(line.txt, line)
        if (idx === selectedLineIdx) {
            document.querySelector('.text-input').placeholder = line.txt
            drawFrameAroundLine(line)
        }
    })
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

function drawText(line, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = line.stroke
    gCtx.fillStyle = line.fill
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)
}

function findClickedLine(clickPos) {
    const meme = getMeme()
    let clickedLineIdx = -1

    meme.lines.forEach((line, idx) => {
        const textWidth = line.length
        const lineHeight = line.size

        const lineLeft = line.pos.x - textWidth / 2
        const lineRight = line.pos.x + textWidth / 2
        const lineTop = line.pos.y - lineHeight / 2
        const lineBottom = line.pos.y + lineHeight / 2

        if (
            clickPos.x >= lineLeft && clickPos.x <= lineRight &&
            clickPos.y >= lineTop && clickPos.y <= lineBottom
        ) {
            clickedLineIdx = idx
        }
    })
    return clickedLineIdx
}

function drawFrameAroundLine(line) {
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 3
    gCtx.strokeRect(
        line.pos.x - line.length / 2,
        line.pos.y - line.size / 2,
        line.length,
        line.size
    )
}

function onDown(ev) {
    const res = getEvPos(ev)
    const clickedLineIdx = findClickedLine(res)
    setSelectedLineIdx(clickedLineIdx)
    const meme = getMeme()
    const selectedLine = meme.lines[clickedLineIdx]
    if (selectedLine) {
        selectedLine.isDrag = true
        gStartPos = { x: res.x, y: res.y }
        const elInput = document.querySelector('.text-input')
        elInput.value = selectedLine.txt
        elInput.placeholder = selectedLine.txt
    }
    renderMeme()
}

function onMove(ev) {
    const res = getEvPos(ev)
    const meme = getMeme()
    const { selectedLineIdx } = meme
    const selectedLine = meme.lines[selectedLineIdx]

    if (selectedLine && selectedLine.isDrag) {
        const dx = res.x - gStartPos.x
        const dy = res.y - gStartPos.y

        selectedLine.pos.x += dx
        selectedLine.pos.y += dy

        gStartPos = { x: res.x, y: res.y }
        renderMeme()
    }
}

function onUp() {
    const meme = getMeme()
    const { selectedLineIdx } = meme
    const selectedLine = meme.lines[selectedLineIdx]
    if (selectedLine) {
        selectedLine.isDrag = false
    }
}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onInputText(txt) {
    setLineText(txt)
    renderMeme()
}

function onAddLine() {
    const meme = getMeme()
    const { lines } = meme
    if (!lines.length) {
        gLineVerticalPos = 50
    }
    const line = {
        txt: 'Input Text Here',
        font: 'roboto-bold',
        size: 40,
        fill: 'white',
        stroke: 'black',
        isDrag: false,
        pos: { x: 450 / 2, y: gLineVerticalPos }
    }
    gLineVerticalPos += 5
    gLineCount = lines.length + 1
    lines.push(line)
    renderMeme()
}

function onSwitchLine() {
    const meme = getMeme()
    const { selectedLineIdx, lines } = meme

    const nextLineIdx = (selectedLineIdx + 1) % lines.length
    setSelectedLineIdx(nextLineIdx)

    const selectedLine = lines[nextLineIdx]
    const elInput = document.querySelector('.text-input')
    elInput.value = selectedLine.txt
    elInput.placeholder = selectedLine.txt

    renderMeme()
}

function onRemoveLine() {
    const meme = getMeme()
    let { selectedLineIdx, lines } = meme
    if (!lines.length) return
    if (selectedLineIdx !== -1) {
        meme.lines.splice(selectedLineIdx, 1)
        selectedLineIdx = 0
        renderMeme()
    }
    gLineCount = lines.length
}

function toggleMemeGenerator() {
    const editor = document.querySelector('.main-content')
    const gallery = document.querySelector('.gallery')
    editor.classList.remove('hide')
    gallery.classList.add('hide')
    renderMeme()
}

function toggleGallery() {
    const editor = document.querySelector('.main-content')
    const gallery = document.querySelector('.gallery')
    if (editor.classList.contains('hide')) {
        editor.classList.remove('hide')
        gallery.classList.add('hide')
        renderMeme()
    } else {
        editor.classList.add('hide')
        gallery.classList.remove('hide')
        renderMeme()
    }
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function onSetFontIncrease() {
    const meme = getMeme()
    const { selectedLineIdx } = meme
    const line = meme.lines[selectedLineIdx]
    if (line.size > 100) return
    line.size += 5
    renderMeme()
}

function onSetFontDecrease() {
    const meme = getMeme()
    const { selectedLineIdx } = meme
    const line = meme.lines[selectedLineIdx]
    if (line.size <= 10) return
    line.size -= 5
    renderMeme()
}

function onSetStrokeColor(strokeColor) {
    const meme = getMeme()
    const { selectedLineIdx } = meme
    const line = meme.lines[selectedLineIdx]
    line.stroke = strokeColor
    renderMeme()
}

function onSetFillColor(fillColor) {
    const meme = getMeme()
    const { selectedLineIdx } = meme
    const line = meme.lines[selectedLineIdx]
    line.fill = fillColor
    renderMeme()
}

function onDownloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-img'
}

function setTextMetrics(txt, line) {
    const textMetrics = gCtx.measureText(txt)
    line.length = textMetrics.width
}