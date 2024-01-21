const altaGrande = document.getElementById("altaGrande")
const amp = document.getElementById("amp")
const baixaGrande = document.getElementById("baixaGrande")

const altaBaixa = [altaGrande, baixaGrande]
const quadrante = 0.5 < Math.random()


    if(quadrante > 0){
        altaGrande.style.transformOrigin = `top left`
        altaGrande.style.rotate = 30 * Math.random() + "deg"
        altaGrande.style.right = 0

        baixaGrande.style.transformOrigin = `bottom right`
        baixaGrande.style.rotate = 30 * Math.random() + "deg"

    }
    else{
        altaGrande.style.transformOrigin = `top right`
        altaGrande.style.rotate = -30 * Math.random() + "deg"

        baixaGrande.style.transformOrigin = `bottom left`
        baixaGrande.style.rotate = -30 * Math.random() + "deg"
        baixaGrande.style.right = 0
    }
    
    amp.style.rotate = 60 * Math.random() - 30 + "deg"