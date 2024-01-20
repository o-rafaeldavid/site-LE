const alta = document.getElementById('alta')
//
alta.querySelectorAll(".hoverable").forEach(hoverable => {
    var inside = false

    hoverable.onmouseenter = (e) => {
        inside = true

        info.innerHTML = hoverable.getAttribute("name")
        const altaBounds = alta.getBoundingClientRect()
        lineHovarableShow(e, altaBounds)
    }

    hoverable.onmousemove = (e) => {
        const altaBounds = alta.getBoundingClientRect()
        if(inside) lineHovarableShow(e, altaBounds)
    }

    hoverable.onmouseleave = (e) => {
        inside = false
    }
})