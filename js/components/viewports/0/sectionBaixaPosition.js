const baixa = document.getElementById("baixa")
const baixaSection = document.getElementById("baixaSection")

window.addEventListener("resize", () => {
    setBaixaSectionPosition()
})

const setBaixaSectionPosition = () => {
    const baixaBounds = baixa.getBoundingClientRect()
    baixaSection.style.top = `${baixaBounds.top}px`
    baixaSection.style.left = `${baixaBounds.left}px`


    baixaSection.style.width = `${baixaBounds.width}px`
    baixaSection.style.height = `${baixaBounds.height}px`
}

setBaixaSectionPosition()