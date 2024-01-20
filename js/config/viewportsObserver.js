const viewportsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting)
    })
}, {threshold: 1})

viewports.forEach(view => {
    viewportsObserver.observe(view)
})