const setImageAbove = (nodeTo, parentNode, url, style = undefined, id = undefined) => {
    setTimeout(() => {
        const bounds = nodeTo.getBoundingClientRect()

        const img = document.createElement("img")
        img.src = url
        img.alt = ""
        if(id !== undefined) img.id = id

        img.style.top = `${bounds.y}px`
        img.style.left = `${bounds.x - window.innerWidth * parseInt(bounds.x / window.innerWidth)}px`
        img.classList.add("absoluto")
        img.style.width = `${bounds.width}px`
        img.style.height = `auto`

        if(style !== undefined){
            Object.keys(style).forEach(propertyString => {
                let propertyReString = propertyString
                let allCaps = propertyString.match(/[A-Z]+/g, "")
            
                if(allCaps !== null){
                    allCaps.forEach(cap => {
                        let splittedByCap = propertyReString.split(cap)
                        let string = ""
                    
                        for(let i = 0; i < splittedByCap.length - 1; i++){
                            const split = splittedByCap[i]
                            string += `${split}-${cap.toLowerCase()}`
                        }
                        string += `${splittedByCap[splittedByCap.length - 1]}`
                    
                        propertyReString = string
                    })
                }
                img.style.setProperty(`${propertyReString}`, `${style[propertyString]}`)
            })
        }

        parentNode.appendChild(img)
    }, 1)
}