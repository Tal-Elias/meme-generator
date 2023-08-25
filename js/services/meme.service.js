'use strict'

const STORAGE_KEY = 'memesDB'

let gFilterBy = { keywords: '' }

let gKeywordSearchCountMap =
{
    'funny': 12,
    'cat': 16,
    'baby': 2,
    'dog': 2,
    'crazy': 2,
    'children': 2,
    'movies': 5
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
            pos: { x: 450 / 2, y: 50 }
        },
        {
            txt: 'Input Text Here', //gMemeText[getRandomInt(0, 18)]
            font: 'roboto-bold',
            size: 40,
            fill: 'white',
            stroke: 'black',
            isDrag: false,
            pos: { x: 450 / 2, y: 400 }
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

function setLineText(txt) {
    const { selectedLineIdx, lines } = gMeme
    const line = lines[selectedLineIdx]
    line.txt = txt
}

function setImgById(id) {
    gMeme.selectedImgId = id - 1
}

function setSelectedLineIdx(idx) {
    gMeme.selectedLineIdx = idx
}