'use strict'

const STORAGE_KEY = 'memesDB'

let gFilterBy = { keywords: '' }

let gKeywordSearchCountMap =
{
    'funny': 12,
    'cat': 4,
    'baby': 2,
    'dog': 6,
    'crazy': 7,
    'children': 2,
    'movies': 16
}

let gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'crazy'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'dog'] },
    { id: 3, url: 'img/3.jpg', keywords: ['baby', 'dog'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'children'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'crazy'] },
    { id: 7, url: 'img/7.jpg', keywords: ['crazy', 'baby'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'crazy'] },
    { id: 9, url: 'img/9.jpg', keywords: ['crazy', 'children'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'happy'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'WTF'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'crazy'] },
    { id: 13, url: 'img/13.jpg', keywords: ['happy', 'movies'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny', 'movies'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'movies'] },
    { id: 16, url: 'img/16.jpg', keywords: ['crazy', 'movies'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny', 'crazy'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'movies'] },
]

let gMemeText = [
    "Doge approves",
    "Epic fail",
    "Cats be like",
    "Me trying code",
    "I can has memes",
    "Too much coffee",
    "Friday vibes",
    "404 humor not found",
    "When CSS works",
    "Life of a programmer",
    "Squad goals",
    "Monday blues",
    "Debugging time",
    "Expectation vs Reality",
    "Weekend plans",
    "Coding all night",
    "Infinite loop",
    "Mood swings"
]

let gMeme = {
    selectedImgId: getRandomInt(0, 18),
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Input Text Here', //gMemeText[getRandomInt(0, 18)]
            font: 'roboto-bold',
            size: 40,
            fill: 'white',
            stroke: 'black',
            isDrag: false,
            pos: { x: 390 / 2, y: 40 }
        },
        {
            txt: 'Input Text Here', //gMemeText[getRandomInt(0, 18)]
            font: 'roboto-bold',
            size: 40,
            fill: 'white',
            stroke: 'black',
            isDrag: false,
            pos: { x: 390 / 2, y: 350 }
        }
    ]
}

function getMeme() {
    return gMeme
}

function getImgs() {
    let imgs = gImgs
    if (gFilterBy.keywords) {
        imgs = imgs.filter(img =>
            img.keywords.includes(gFilterBy.keywords)
        )
    }
    return imgs
}

function setImgFilter(filterBy = {}) {
    if (filterBy.keywords !== undefined) gFilterBy.keywords = filterBy.keywords
    return gFilterBy
}

function getSelectedLine() {
    const { selectedLineIdx } = gMeme
    const line = gMeme.lines[selectedLineIdx]
    return line
}

function setLineText(txt) {
    const line = getSelectedLine()
    line.txt = txt
}

function setImgById(id) {
    gMeme.selectedImgId = id - 1
}

function addLine() {
    const { lines } = gMeme
    const line = {
        txt: 'Input Text Here',
        font: 'roboto-bold',
        size: 40,
        fill: 'white',
        stroke: 'black',
        isDrag: false,
        pos: { x: gElCanvas.width / 2, y: gLineVerticalPos }
    }
    lines.push(line)
}

function removeLine() {
    let { selectedLineIdx, lines } = gMeme
    if (!lines.length) return
    if (selectedLineIdx !== -1) {
        gMeme.lines.splice(selectedLineIdx, 1)
        selectedLineIdx = 0
    }
}

function SetFontIncrease() {
    const line = getSelectedLine()
    if (line.size > 100) return
    line.size += 5
}

function SetFontDecrease() {
    const line = getSelectedLine()
    if (line.size <= 10) return
    line.size -= 5
}

function setAlignLeft() {
    const line = getSelectedLine()
    line.pos.x = 150
}

function setAlignCenter() {
    const line = getSelectedLine()
    line.pos.x = 195
}

function setAlignRight() {
    const line = getSelectedLine()
    line.pos.x = 240
}

function setFontFamily(font) {
    const { lines } = gMeme
    if (!lines.length) return
    if (font) lines.forEach(line => line.font = font)
    else lines.forEach(line => line.font = 'roboto-bold')
}

function setStrokeColor(strokeColor) {
    const line = getSelectedLine()
    line.stroke = strokeColor
}

function setFillColor(fillColor) {
    const line = getSelectedLine()
    line.fill = fillColor
}

function setSelectedLineIdx(idx) {
    gMeme.selectedLineIdx = idx
}

function setLinesCurrLang() {
    const currLang = getCurrLang()
    const { lines } = gMeme
    if (currLang === 'he') {
        lines.forEach(line => line.txt = 'הכנס טקסט כאן')
    } else {
        lines.forEach(line => line.txt = 'Input Text Here')
    }
}

function saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gMeme)
}

function getKeywordsMap() {
    return gKeywordSearchCountMap
}