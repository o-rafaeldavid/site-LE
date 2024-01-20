const main = document.querySelector('main')
const delayScroll = 50

const getNowMaxScroll = () => main.scrollWidth - main.clientWidth
let prevMaxScroll = -1
const setPrevMaxScroll = () => { prevMaxScroll = getNowMaxScroll() }




main.onwheel = (e) => {
    const sinal = Math.sign(e.wheelDelta)

    if(
        !main.classList.contains("scrolling") &&
        (
            (sinal < 0 && main.scrollLeft < getNowMaxScroll()) ||
            (sinal > 0 && main.scrollLeft > 0)
        )
    ){

        main.classList.add("scrolling")
        const addTotal = -1 * sinal * (getNowMaxScroll() / (main.childElementCount - 1))
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