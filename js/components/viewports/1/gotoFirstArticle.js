const toFirstArticle = [
    document.getElementById("treze"),
    document.getElementById("pc"),
    document.getElementById("h2WFT")
]


const gotoFirstArticle = () => window.location.href = "/articles/13-ways-of-looking-at-a-typeface"
let antigoClick = () => {}

toFirstArticle.forEach(toFirst => {
    addOnMouseMove((e) => {
        let toFirstBounds = toFirst.getBoundingClientRect()
        const inside =
            (toFirstBounds.left < e.clientX && e.clientX < toFirstBounds.right)
            && (toFirstBounds.top < e.clientY && e.clientY < toFirstBounds.bottom)

        const gotHoverGotoClass = toFirst.classList.contains("onHoverGoto")

        

        if(inside){
            info.style.top = e.clientY + 20 + "px"
            info.style.left = e.clientX + "px"

            if(!gotHoverGotoClass){
                let timeout = setTimeout(() => {
                    info.style.opacity = 1
                    info.style.zIndex = 10
                    info.innerText = `Go to "13 Ways of Looking at a Typeface"`

                    antigoClick = window.onclick
                    window.onclick = gotoFirstArticle

                    toFirst.classList.add("onHoverGoto")

                    clearTimeout(timeout)
                })
            }
        }
        else if(!inside && gotHoverGotoClass){
            toFirst.classList.remove("onHoverGoto")
            info.removeAttribute("style")
            window.onclick = antigoClick
        }
    })
})