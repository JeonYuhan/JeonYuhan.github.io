let score = JSON.parse(localStorage.getItem("score"))

let topStyle = null
let max = 0

for(let style in score){

    if(score[style] > max){
        max = score[style]
        topStyle = style
    }

}

document.getElementById("style-title").innerText =
"당신의 스타일은 " + topStyle + " 입니다"


// 추천 브랜드 데이터
const brandMap = {

    "스트릿":[
        "Stussy",
        "Supreme",
        "Carhartt",
        "Palace"
    ],

    "미니멀":[
        "COS",
        "ARKET",
        "Maison Kitsune",
        "A.P.C"
    ],

    "락시크":[
        "Saint Laurent",
        "AllSaints",
        "Diesel",
        "Rick Owens"
    ],

    "빈티지":[
        "Levi's",
        "Wrangler",
        "Lee",
        "Carhartt"
    ]

}


// 브랜드 출력
let brandHTML = ""

brandMap[topStyle].forEach(b => {

    brandHTML += `<div class="brand">${b}</div>`

})

document.getElementById("brands").innerHTML = brandHTML



// 룩북 이미지 출력
fetch("data/images.json")
.then(res => res.json())
.then(data => {

    let images = data.images

    let styleImages = images.filter(img => img.style === topStyle)

    let shuffled = styleImages.sort(()=>0.5-Math.random())

    let lookbook = shuffled.slice(0,3)

    let html=""

    lookbook.forEach(img => {

        html += `<img src="${img.src}">`

    })

    document.getElementById("lookbook").innerHTML = html

})