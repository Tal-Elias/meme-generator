'use strict'

renderGallery()
function renderGallery() {
    var strHTML = `<img src="./img/1.jpg" alt="" id="1" onclick="onImgSelect(this)">
                    <img src="./img/2.jpg" alt="" id="2" onclick="onImgSelect(this)">
                    <img src="./img/3.jpg" alt="" id="3" onclick="onImgSelect(this)">
                    <img src="./img/4.jpg" alt="" id="4" onclick="onImgSelect(this)">
                    <img src="./img/5.jpg" alt="" id="5" onclick="onImgSelect(this)">
                    <img src="./img/6.jpg" alt="" id="6" onclick="onImgSelect(this)">
                    <img src="./img/7.jpg" alt="" id="7" onclick="onImgSelect(this)">
                    <img src="./img/8.jpg" alt="" id="8" onclick="onImgSelect(this)">
                    <img src="./img/9.jpg" alt="" id="9" onclick="onImgSelect(this)">
                    <img src="./img/10.jpg" alt="" id="10" onclick="onImgSelect(this)">
                    <img src="./img/11.jpg" alt="" id="11" onclick="onImgSelect(this)">
                    <img src="./img/12.jpg" alt="" id="12" onclick="onImgSelect(this)">
                    <img src="./img/13.jpg" alt="" id="13" onclick="onImgSelect(this)">
                    <img src="./img/14.jpg" alt="" id="14" onclick="onImgSelect(this)">
                    <img src="./img/15.jpg" alt="" id="15" onclick="onImgSelect(this)">
                    <img src="./img/16.jpg" alt="" id="16" onclick="onImgSelect(this)">
                    <img src="./img/17.jpg" alt="" id="17" onclick="onImgSelect(this)">
                    <img src="./img/18.jpg" alt="" id="18" onclick="onImgSelect(this)">
                    `
    document.querySelector('.gallery-container').innerHTML = strHTML
}

function onImgSelect(img) {
    const {id} = img
    setImg(id)
    renderMeme()
    toggleGallery()
}