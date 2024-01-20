class SpanToBrush{
    c = '';
    node = undefined;

    constructor(c, limit){
        this.c = c
    }

    ///////////////////////////////////////////
    // canvas
    //
    //
    #createSketch(sketch){
        let canvas = undefined, parent = undefined
        let mouseOver = false
        let counter = 0
        let STOPLIMIT = false

        // from tag
        let limit = -1, corTraco = ""

        const cirRadFraction = 0.05
        const maxRad = 7
        let finalRad = -1
        let arrayLinhas = []

        ////////////////
        ////////////////
        ////////////////

        const setCanvasDims = () => {
            const parentBounds = parent.getBoundingClientRect()
            canvas = sketch.createCanvas(parentBounds.width, parentBounds.height)
        }

        const mousePosFraction = () => {
            const fraction = {
                x: sketch.mouseX / sketch.width,
                y: sketch.mouseY / sketch.height,
                px: sketch.pmouseX / sketch.width,
                py: sketch.pmouseY / sketch.height
            }

            const constraint = {
                width: {
                    min: (finalRad * 0.5) / sketch.width,
                    max: (sketch.width - finalRad * 0.5) / sketch.width
                },
                height: {
                    min: (finalRad * 0.5) / sketch.height,
                    max: (sketch.height - finalRad * 0.5) / sketch.height
                }
            }

            const returnable = (frac) => {return {
                x: () => returnableSkeleton(frac, constraint.width.min, constraint.width.max),
                y: () => returnableSkeleton(frac, constraint.height.min, constraint.height.max)
            }}
            const returnableSkeleton = (frac, min, max) => (frac >= min) ? (frac <= max) ? frac : max : min

            return{
                x: returnable(fraction.x).x(),
                y: returnable(fraction.y).y(),
                px: returnable(fraction.px).x(),
                py: returnable(fraction.py).y()
            }
        }

        ////////////////
        ////////////////
        ////////////////

        sketch.setup = () => {
            canvas = sketch.createCanvas(0, 0);
            parent = canvas.parent()

            const limitAttr = parseInt(parent.getAttribute("limit"))
                limit = (isNaN(limitAttr)) ? 100 : limitAttr
            const corTracoAttr = parent.getAttribute("corTraco")
                corTraco = (corTracoAttr === null) ? magenta : corTracoAttr

            setCanvasDims()
        }

        sketch.draw = () => {
            sketch.clear();

            sketch.stroke(corTraco)

            
            mouseOver = (0 < sketch.mouseX && sketch.pmouseX < sketch.width) && (0 < sketch.mouseY && sketch.mouseY < sketch.height)

            const radius = cirRadFraction * sketch.width
            finalRad = (radius <= maxRad) ? radius : maxRad
            sketch.strokeWeight(finalRad)

            const setLinhas = () => arrayLinhas.forEach(
                linha => {
                    sketch.line(
                        linha.x * sketch.width, linha.y * sketch.height,
                        linha.px * sketch.width, linha.py * sketch.height
                    )
                })

            if(counter < limit) setLinhas()
            else if(!STOPLIMIT){
                setLinhas()
                arrayLinhas = []

                const fun = parent.getAttribute("onStopLimit")
                if(fun !== null) Function(fun)()


                STOPLIMIT = true
                sketch.noLoop()
            }
            
            if(mouseOver &&
                sketch.dist(
                    sketch.mouseX, sketch.mouseY,
                    sketch.pmouseX, sketch.pmouseY
                ) > 0) counter++
        }

        sketch.windowResized = () => {
            setCanvasDims()
        }

        sketch.mouseMoved = () => {
            if(
                mouseOver && sketch.frameCount > 1 &&
                (sketch.mouseX > finalRad * 0.5 && sketch.mouseX < sketch.width - finalRad * 0.5) &&
                (sketch.mouseY > finalRad * 0.5 && sketch.mouseY < sketch.height - finalRad * 0.5)
            ){
                arrayLinhas.push(mousePosFraction())
            }
        }
    }


    ///////////////////////////////////////////
    //
    //
    brushit(node){
        if(
            node !== undefined && 
            node.nodeType === Node.ELEMENT_NODE && 
            node.tagName === "SPAN" && 
            node.classList.contains('spanToBrush')
        ){
            const span = document.createElement('span')
            span.innerText = this.c
            node.appendChild(span)

            var p5Brushit = new p5(this.#createSketch, node)
        }
        else {
            console.log('node inválido para o objeto (tem que ser um span de classe .spanToBrush):')
            console.log(this)
        }
    }
}

////// settar o span to brush
addOnLoad(
    document.querySelectorAll("span.spanToBrush").forEach(span => {
        const stb = new SpanToBrush(span.innerText)
        span.innerText = ""
        stb.brushit(span)
    })
)