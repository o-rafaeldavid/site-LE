const magenta = "#E6007E"

const createInfo = () => {
    const info = document.createElement("div")
    info.id = "info"
    info.classList.add("absolutoAncoradoCentro")

    document.body.appendChild(info)
}


const canvasLineHovarable = (sketch) => {
    let canvas

    const setCanvasWindow = () => {
        canvas = sketch.createCanvas(0, 0);
    }

    sketch.setup = () => {
        setCanvasWindow()
        canvas.parent(body)
        canvas.id('linhaHoverableInfoCanvas')
    }

    sketch.draw = () => {
        sketch.clear()
        sketch.stroke(magenta)
        sketch.line(0, 0, sketch.width, sketch.height)
    }
}

var p5CanvasLineHovarable = new p5(canvasLineHovarable)


// e: mouseEvent (da target q recebe o hover)
// caseBounds: bounds relativas a quem se relativarizará a posição da info

const lineHovarableShow = (e, caseBounds) => {
    const infoBounds = info.getBoundingClientRect()

    const caseBoundsCenter = {
        x: caseBounds.left + caseBounds.width*0.5,
        y: caseBounds.top + caseBounds.height*0.5
    }

    const basePosition = {
        top: caseBounds.top + (
            (e.clientY > caseBoundsCenter.y)
            ? caseBounds.height + infoBounds.height * 2
            : -2 * infoBounds.height
        ),
        left: caseBoundsCenter.x
    }

    const plusBase = {
        top: mapear(e.clientY, caseBoundsCenter.y, caseBounds.bottom, 0, 10),
        left: mapear(e.clientX, caseBoundsCenter.x, caseBounds.right, 0, 50)
    }

    const finalPosition = {
        top: basePosition.top + plusBase.top,
        left: basePosition.left + plusBase.left
    }

    info.style.top = `${finalPosition.top}px`
    info.style.left = `${finalPosition.left}px`

    const invert = {
        top: e.clientY > caseBoundsCenter.y,
        left: e.clientX < caseBoundsCenter.x
    }

    const multiplier = {
        top: (invert.top) ? -1 : 1,
        left: (invert.left) ? -1 : 1 
    }

    let scale = {x: 1, y: 1}
    if(!invert.left){ scale.x = -1 }
    if(!invert.top){ scale.y = -1 }

    linhaHoverableInfoCanvas.style.transform = `scaleX(${scale.x}) scaleY(${scale.y})`


    linhaHoverableInfoCanvas.style.top = `${((!invert.top) ? finalPosition.top : e.clientY)}px`
    linhaHoverableInfoCanvas.style.left = `${((!invert.left) ? finalPosition.left : e.clientX)}px`

    p5CanvasLineHovarable.resizeCanvas(
        multiplier.left * e.clientX - multiplier.left * finalPosition.left,
        multiplier.top * e.clientY - multiplier.top * finalPosition.top
    )

}