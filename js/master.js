//Local Storage Main Color
let colorsLi = document.querySelectorAll('.list-group li')
let mainColor = localStorage.getItem('color-option');
if(mainColor !==null){
    document.documentElement.style.setProperty('--main-color',mainColor)
    colorsLi.forEach((li)=>{
        li.classList.remove('active')
        if(li.dataset.color === mainColor){
            li.classList.add('active')
        }
    })
}

//Switch Colors
colorsLi.forEach((li)=>{
    li.addEventListener('click',(e) => {
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color)
        localStorage.setItem('color-option',e.target.dataset.color)
        handleActive(e)
    })
})

//Setting Box Opening & Gear Spanning
document.querySelector('.fa-gear').onclick = () => {
    document.querySelector('.fa-gear').classList.toggle('fa-spin')
    document.querySelector('.settings-box').classList.toggle('open')
}

//Change Landing Page Background Every 5s
let randomBG = document.querySelector(`#randomBackground`)
let myInterval
function RBG () {
    myInterval = setInterval(()=>{
    document.querySelector('.landing-page').style.backgroundImage=`url('./imgs/0${Math.ceil(Math.random() * 6)}.jpg')`
},5000);
}
RBG()
if (localStorage.getItem('background_option') === 'false'){
    clearInterval(myInterval)
    randomBG.checked = false
}
randomBG.addEventListener('change',()=>{
    if (!randomBG.checked){
        localStorage.setItem('background_option','false')
        clearInterval(myInterval)
    }else{
        localStorage.setItem('background_option',randomBG.checked)
        RBG()
    }
})

//Show Right Bullets Or Hide It
let showBullets = document.getElementById('showBullets')
if(localStorage.getItem('showBullets') === 'false'){
    document.querySelector('.nav-bullets').style.display = 'none'
    showBullets.checked = false
}
showBullets.addEventListener('change',(e)=>{
    if(showBullets.checked){
        localStorage.setItem('showBullets',showBullets.checked)
        document.querySelector('.nav-bullets').style.display = 'block'
    }else{
        localStorage.setItem('showBullets',false)
        document.querySelector('.nav-bullets').style.display = 'none'
    }
})

//Reset Button
document.querySelector('.btn').onclick = () => {
    localStorage.removeItem('color-option')
    localStorage.removeItem('background_option')
    localStorage.removeItem('showBullets')
    colorsLi.forEach((li)=>{
        li.classList.remove('active')
    })
    colorsLi[0].classList.add('active')
    document.documentElement.style.setProperty('--main-color',colorsLi[0].dataset.color)
    randomBG.checked = true
    RBG()
    showBullets.checked = true
    document.querySelector('.nav-bullets').style.display = 'block'
}



//Skills Selector
let ourSkills = document.querySelector('.skills')
window.onscroll = ()=>{
    let skillsOffsetTop = ourSkills.offsetTop;
    //console.log(`Skills Offset Top (الجزء اللي فوق السيكشن) is ${skillsOffsetTop}`)

    let SkillsOuterHeight = ourSkills.offsetHeight;
    //console.log(`Skills Offset Height is (ارتفاع السيكشن نفسه) ${SkillsOuterHeight}`)

    let windowHeight = this.innerHeight
    //console.log(`Window inner Height is (مساحة الويندو اللي ادامك سواء كان الزوم 100% او غيره) ${windowHeight}`)

    let windowScrollTop = this.pageYOffset
    //console.log(`Window Scroll Top is (ارتفاع الجزء اللي انت عملتله اسكرول) ${windowScrollTop}`)

    if(windowScrollTop > (skillsOffsetTop + SkillsOuterHeight - windowHeight)){
        let allSkills = document.querySelectorAll('.skills .card .card-body .progress-bar')
        allSkills.forEach((skill)=>{
            skill.style.width = skill.dataset.progress
            skill.textContent = skill.dataset.progress
        })
    }
}

//Create Popup With Image
let ourGallery = document.querySelectorAll('.gallery .row img');
ourGallery.forEach((img)=>{
    img.addEventListener('click',(e)=>{
        let overlay = document.createElement('div')
        overlay.classList.add('popup-overlay')
        document.body.appendChild(overlay)
        let popupBox = document.createElement('div')
        popupBox.classList.add('popup-box')
        if(img.alt !==null){
            let imgHeading = document.createElement('h3')
            let imgText = document.createTextNode(img.alt)
            imgHeading.appendChild(imgText)
            popupBox.appendChild(imgHeading)
        }
        let popupImg = document.createElement('img')
        popupImg.src = img.src
        popupBox.appendChild(popupImg)
        document.body.appendChild(popupBox)
        let closeButton = document.createElement('span')
        closeButton.textContent = 'X'
        closeButton.className = 'close-button'
        popupBox.appendChild(closeButton)
    })
})

//Close Popup
document.addEventListener('click',(e)=>{
    if (e.target.className == 'close-button' || e.target.className == 'popup-overlay'){
        document.querySelector('.popup-box').remove()
        document.querySelector('.popup-overlay').remove()
    }
})

//Scroll TO A Specific Section
function scrollToSection(elements){
    elements.forEach((ele) =>{
        ele.addEventListener(('click'),(e)=>{
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:'smooth'
            })
        })
    })
}
let allBullets = document.querySelectorAll('.nav-bullets .bullet')
scrollToSection(allBullets)
let allLinks = document.querySelectorAll('.nav-item a')
scrollToSection(allLinks)

//Handle Active State
function handleActive(e){
    e.target.parentElement.querySelectorAll('.active').forEach((element)=>{
        element.classList.remove('active')
    })
    e.target.classList.add('active')
}
