/* style: styles/general/header.css */

const createNavigation = (setinhaURL) => {
    /* criar header */
    const header = document.createElement("header")

    header.classList.add("fixado")
    header.classList.add("invisible")
    header.classList.add("forHeader")

        const nav = document.createElement("nav")
        const addHyperlink = (text, href) => {
                const a = document.createElement("a")
                    a.href = href

                const div = document.createElement("div")
                const divNotText = div.cloneNode(false)
                    divNotText.classList.add("divNotText")
                    const divNotTextBack = divNotText.cloneNode(true)
                    divNotTextBack.classList.add("back")
                const divText = div.cloneNode(false)
                    const h2 = document.createElement("h2")
                    h2.innerHTML = text
                    divText.appendChild(h2)

                a.appendChild(divNotTextBack)
                a.appendChild(divText)
                a.appendChild(divNotText)
            nav.appendChild(a)
        }

        const spanToBrush = {
            start: "<span class='spanToBrush' corTraco='#fff'>",
            stop: "</span>"
        }
        addHyperlink(`<i>Ar${spanToBrush.start}tigo${spanToBrush.stop}s</i>`, "/")
        addHyperlink(`<i>Quem ${spanToBrush.start}Somos${spanToBrush.stop}</i>`, "/quemsomos.html")

    header.appendChild(nav)
    document.body.appendChild(header)



    /* criar setinha */
    const btnSetinha = document.createElement("button")
    btnSetinha.id = "setinha"
    btnSetinha.onclick = () => {
        header.classList.toggle("invisible")
        btnSetinha.classList.toggle("rotate")
    }
    
        const setinhaIMG = document.createElement("img")
        setinhaIMG.alt = ""
        setinhaIMG.src = setinhaURL

        btnSetinha.appendChild(setinhaIMG)
    document.body.appendChild(btnSetinha)
}