'use strict'

const STORAGE_KEY = 'memesDB'

let gImgs = [
    {id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat']},
    {id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat']},
    {id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat']},
    {id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat']},
    {id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat']},
    {id: 6, url: 'img/6.jpg', keywords: ['funny', 'cat']},
    {id: 7, url: 'img/7.jpg', keywords: ['funny', 'cat']},
    {id: 8, url: 'img/8.jpg', keywords: ['funny', 'cat']},
    {id: 9, url: 'img/9.jpg', keywords: ['funny', 'cat']},
    {id: 10, url: 'img/10.jpg', keywords: ['funny', 'cat']},
    {id: 11, url: 'img/11.jpg', keywords: ['funny', 'cat']},
    {id: 12, url: 'img/12.jpg', keywords: ['funny', 'cat']},
    {id: 13, url: 'img/13.jpg', keywords: ['funny', 'cat']},
    {id: 14, url: 'img/14.jpg', keywords: ['funny', 'cat']},
    {id: 15, url: 'img/15.jpg', keywords: ['funny', 'cat']},
    {id: 16, url: 'img/16.jpg', keywords: ['funny', 'cat']},
    {id: 17, url: 'img/17.jpg', keywords: ['funny', 'cat']},
    {id: 18, url: 'img/18.jpg', keywords: ['funny', 'cat']}, 
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
            txt: gMemeText[getRandomInt(0, 18)],
            size: 20,
            color: getRandomColor()
        }
    ]
}

let gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}

function getMeme() {
    return gMeme
}

function getImg() {
    return gImgs
}

function setLineText(txt) {
    const {lines} = gMeme
    lines[0].txt = txt
}

function setImg(id) {
    gMeme.selectedImgId = id -1
}