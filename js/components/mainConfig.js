const main = document.querySelector('main')
const delayScroll = 50

const getNowMaxScroll = () => main.scrollWidth - main.clientWidth
let prevMaxScroll = -1
const setPrevMaxScroll = () => { prevMaxScroll = getNowMaxScroll() }

                    Element.prototype.isOverflowing = function(){
                        return this.scrollHeight > this.clientHeight || this.scrollWidth > this.clientWidth;
                    }


main.onwheel = (e) => {
    const sinal = Math.sign(e.wheelDelta)

    const hoverNodeList = document.querySelectorAll(":hover")
    const mainIndex = Array.prototype.indexOf.call(hoverNodeList, main)

    let doMainScroll = true
    for(let i = mainIndex + 1; i < hoverNodeList.length; i++){
        if(hoverNodeList[i].isOverflowing() && hoverNodeList[i].tagName === "SECTION"){
            doMainScroll = false
            console.log(hoverNodeList)
            console.log(hoverNodeList[i])
            break
        }
    }

    if(
        doMainScroll &&
        !main.classList.contains("scrolling") &&
        (
            (sinal < 0 && main.scrollLeft < getNowMaxScroll()) ||
            (sinal > 0 && main.scrollLeft > 0)
        )
    ){

        main.classList.add("scrolling")
        const addTotal = -1 * sinal * (getNowMaxScroll() / (viewports.length - 1))
        let counter = 0;
        let scroll = main.scrollLeft

        let interval = setInterval(() => {
            if(counter < delayScroll){
                scroll += addTotal / delayScroll
                main.scrollLeft = scroll

                counter++;
            }
            else{
                main.classList.remove("scrolling")
                clearInterval(interval)
            }
        }, 1)

    }
    
}

main.onscroll = (e) => { e.preventDefault() }





addOnLoad(setPrevMaxScroll)
addOnWindowResize(() => {
    const scrollRemapeado = mapear(main.scrollLeft, 0, prevMaxScroll, 0, getNowMaxScroll())
    setPrevMaxScroll()

    main.scrollLeft = scrollRemapeado
})


