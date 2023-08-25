'use strict'

let gCurrLang = 'en'

const gTrans = {
    title: {
        en: 'Meme-Generator',
        he: 'מחולל הממים'
    },
    logo: {
        en: 'Memegen',
        he: 'המחולל'
    },
    'link-gallery': {
        en: 'Gallery',
        he: 'גלריה'
    },
    'link-saved': {
        en: 'Saved',
        he: 'ארכיון'
    },
    'link-about': {
        en: 'About',
        he: 'אודות'
    },
    download: {
        en: 'Download',
        he: 'הורדה'
    },
    share: {
        en: 'Share',
        he: 'שיתוף'
    },
    'search-placeholder': {
        en: 'Search here...',
        he: 'חפש כאן...'
    }
}

function getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'
    let transTxt = transMap[gCurrLang]
    if (!transTxt) transTxt = transMap.en
    return transTxt
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const transTxt = getTrans(transKey)
        if (el.placeholder) el.placeholder = transTxt
        else el.innerText = transTxt
    })
}

function SetLang(lang) {
    gCurrLang = lang
}

function getCurrLang() {
    return gCurrLang
}