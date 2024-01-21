const viewportsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting)
        if(footer !== undefined){
            footer.querySelectorAll("section")[
                parseInt(entry.target.getAttribute("param"))
            ].classList.toggle("selected", entry.isIntersecting)
        }
    })
}, {threshold: 1})

viewports.forEach((view, index) => {
    view.setAttribute("param", index)
    viewportsObserver.observe(view)
})