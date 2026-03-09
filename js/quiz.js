let images=[]
let questionCount=0
let maxQuestion=12

let usedImages = new Set()

fetch("data/images.json")
.then(res=>res.json())
.then(data=>{
    images=data.images
    showQuestion()
})

function showQuestion(){

    if(questionCount>=maxQuestion){
        window.location.href="result.html"
        return
    }

    let available = images.filter(img => !usedImages.has(img.src))

    let shuffled=[...available].sort(()=>0.5-Math.random())

    let selected=[]
    let usedStyles=new Set()

    for(let img of shuffled){

        if(!usedStyles.has(img.style)){
            selected.push(img)
            usedStyles.add(img.style)
        }

        if(selected.length===2) break
    }

    let container=document.getElementById("image-container")
    container.innerHTML=""

    selected.forEach(img=>{

        usedImages.add(img.src)

        let el=document.createElement("img")
        el.src=img.src

        el.onclick=()=>chooseStyle(img.style)

        container.appendChild(el)

    })

    document.getElementById("progress").innerText =
    `Question ${questionCount+1} / ${maxQuestion}`
}

function chooseStyle(style){

    let score=JSON.parse(localStorage.getItem("score")) || {}

    if(!score[style]){
        score[style]=0
    }

    score[style]++

    localStorage.setItem("score",JSON.stringify(score))

    questionCount++

    showQuestion()
}