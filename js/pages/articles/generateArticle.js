const generateArticle = (nodeTodo, content, onStopLimit = undefined, doBecause = true) => {
    const num = parseInt(nodeTodo.getAttribute("tit"))
    const txt = nodeTodo.getAttribute("txt")
    const txtSplitted = txt.split(" ")

    let BECAUSE, txtNoBECAUSE;

    if(doBecause){
        BECAUSE = txtSplitted.shift()
        txtNoBECAUSE = txtSplitted.join(" ")
    }

    const article = document.createElement("article")
        article.classList.add("columns")
        if((num >= 10)) article.classList.add("twodigits")

        article.innerHTML = `
            <section>
                <div class="title">
                    <h1><span class='spanToBrush' limit="300" corTraco="#000" ${(onStopLimit !== undefined) ? 'onStopLimit=' + onStopLimit : ''}>${num}.</span></h1>
                    <h3>${(doBecause) ? `<span class='because'>${BECAUSE}</span> <wbr>${txtNoBECAUSE}` : txt}</h3>
                </div>
            </section>
            <section>
                <article class="columns">
                    ${content}
                </article>
            </section>
        `

    nodeTodo.appendChild(article)
}