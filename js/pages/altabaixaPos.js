const altaGrande = document.getElementById("altaGrande")
const baixaGrande = document.getElementById("baixaGrande")

const quadrante = {
    alta: 0.5 < Math.random(),
    baixa: 0.5 < Math.random()
}

if(quadrante.alta > 0){
    altaGrande.style.transformOrigin = "top left"
    altaGrande.style.rotate = 30 * Math.random() + "deg"
    altaGrande.style.right = 0
}
else{
    altaGrande.style.transformOrigin = "top right"
    altaGrande.style.rotate = -30 * Math.random() + "deg"
}

const altaGrandeBounds = altaGrande.getBoundingClientRect()