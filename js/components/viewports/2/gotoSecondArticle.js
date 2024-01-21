const h2TerceiraViewport = document.querySelector("#terceiraViewport > h2")

const gotoSecondArticle = () => window.location.href = "/articles/using-autoencoders-to-generate-skeleton-based-typography.html"
let antigoClick2 = () => {}


addOnMouseMove((e) => {
    let bounds = h2TerceiraViewport.getBoundingClientRect()
    const inside =
        (bounds.left < e.clientX && e.clientX < bounds.right)
        && (bounds.top < e.clientY && e.clientY < bounds.bottom)

    const gotHoverGotoClass = h2TerceiraViewport.classList.contains("onHoverGoto")

    

    if(inside){
        info.style.top = e.clientY + 20 + "px"
        info.style.left = e.clientX + "px"

        if(!gotHoverGotoClass){
            let timeout = setTimeout(() => {
                info.style.opacity = 1
                info.style.zIndex = 10
                info.innerText = `Go to "Using Autoencoders to Generate Skeleton Based Typography"`

                antigoClick = window.onclick
                window.onclick = gotoSecondArticle

                h2TerceiraViewport.classList.add("onHoverGoto")

                clearTimeout(timeout)
            })
        }
    }
    else if(!inside && gotHoverGotoClass){
        h2TerceiraViewport.classList.remove("onHoverGoto")
        info.removeAttribute("style")
        window.onclick = antigoClick
    }
})