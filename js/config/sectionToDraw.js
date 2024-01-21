const sectionToDraw = (
    node,
    limit = undefined,
    corTraco = undefined,
    onStopLimit = undefined,
    nodeAbaixo
) => {
    if(nodeAbaixo.nodeType !== Node.ELEMENT_NODE){
        console.error("node inválido: o node selecionado para estar debaixo, nao é um elemento")
        return
    }
    else if(
        node.nodeType === Node.ELEMENT_NODE
        &&
        node.tagName === "SECTION"
    ){

        const setSectionToDrawPosition = () => {
            const abaixoBounds = nodeAbaixo.getBoundingClientRect()
            node.style.top = `${abaixoBounds.top}px`
            node.style.left = `${abaixoBounds.left - window.innerWidth * parseInt(abaixoBounds.left / window.innerWidth)}px`
            node.style.position = "absolute"

            node.style.width = `${abaixoBounds.width}px`
            node.style.height = `${abaixoBounds.height}px`

            const span = document.createElement("span")
                span.classList.add("spanToBrush")
                if(limit !== undefined) span.setAttribute("limit", limit)
                if(corTraco !== undefined) span.setAttribute("corTraco", corTraco)
                if(onStopLimit !== undefined) span.setAttribute("onStopLimit", onStopLimit)

                span.style.height = "100%"
                span.style.width = "100%"
                span.style.display = "block"

            node.appendChild(span)
        }

        setSectionToDrawPosition()

        window.addEventListener("resize", () => {
            setSectionToDrawPosition()
        })

    }
    else console.error("node inválido para a criação de draw (tem q ser uma section)")
}