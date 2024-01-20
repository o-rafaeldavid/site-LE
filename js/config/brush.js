const maxTimeLinha = 30
const maxWeightLinha = 5

const canvasBrush = (sketch) => {
    const canvasBrush = document.getElementById('canvasBrush')
    let canvas
    let arrayLinhasBrush = []

    // a posição do rato 24 frames antes (para verificar se o user moveu)
    let last24framePosition

    const setCanvasWindow = (resize) => {
        canvas = 
        (!resize)
            ? sketch.createCanvas(window.innerWidth, window.innerHeight)
            : sketch.resizeCanvas(window.innerWidth, window.innerHeight)
    }

    const setL24FP = () => {
        last24framePosition = {
            x: sketch.mouseX,
            y: sketch.mouseY
        }
    }

    ///////////////////////////////////////////

    sketch.setup = () => {
        setCanvasWindow(false)
        canvas.parent(canvasBrush)
        setL24FP()
    }

    sketch.draw = () => {
        sketch.clear()
        //distancia entre a posição atual e a posição dos últimos 24 frames
        const last30toNow = sketch.dist(last24framePosition.x, last24framePosition.y, sketch.mouseX, sketch.mouseY)

        if(sketch.frameCount % 24 === 0) setL24FP()


        sketch.stroke(magenta)
        sketch.strokeWeight(2)
        if(sketch.frameCount > 1){
            arrayLinhasBrush.forEach(
                (linha) => {
                    if(linha.deltaFrame <= maxTimeLinha) linha.desenhar(sketch)
                }
            )
        }
    }

    sketch.windowResized = () => {
        setCanvasWindow(true)
    }

    sketch.mouseMoved = () => {
        if(sketch.frameCount > 1) arrayLinhasBrush.push(new LinhaBrush(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY, sketch.frameCount))
    }
}

var p5CanvasBrush = new p5(canvasBrush)


class LinhaBrush{
    constructor(x, y, px, py, frameCriado){
        this.x = x
        this.y = y
        this.px = px
        this.py = py
        this.frameCriado = frameCriado
        this.deltaFrame = 0
    }

    desenhar(p5){
        this.deltaFrame = p5.frameCount - this.frameCriado;
        const alpha = p5.map(this.deltaFrame, 0, maxTimeLinha, 255, 0)
        const weight = p5.map(this.deltaFrame, 0, maxTimeLinha, maxWeightLinha, 0)
        p5.stroke(230, 0, 126, alpha)
        p5.strokeWeight(weight)
        p5.line(this.x, this.y, this.px, this.py)
    }
}