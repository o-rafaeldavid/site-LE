let footer = undefined

const createFooter = () => {
    let viewports = document.getElementsByClassName("viewport")
    footer = document.createElement("footer")
    footer.style.gridTemplateColumns = `repeat(${viewports.length}, 1fr)`

    viewports.forEach(viewport => {
        let section = document.createElement("section")
        if(viewport.getAttribute("id") !== null){
            section.classList.add("haveClick")
            section.onclick = () => {
                window.location.href = '#' + viewport.getAttribute("id")
            }
        }
            let h4 = document.createElement("h4")
            h4.innerText = viewport.getAttribute("tit")

            let p = document.createElement("p")
            if(viewport.getAttribute("italic") === "true") p.innerHTML = `<i>${viewport.getAttribute("txt")}</i>`
            else p.innerText = viewport.getAttribute("txt").replace(/<[^>]+>/g, '')

            section.appendChild(h4)
            section.appendChild(p)
        footer.appendChild(section)
    });
    
    document.querySelector("main").appendChild(footer)
}