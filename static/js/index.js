window.onload = async function loadArticleList(){
    articles = await getArticleList()
    const article_list = document.getElementById("articles")

    articles.forEach(article => {
        const newArticle = document.createElement("div")
        const articleImage = document.createElement("img")
        articleImage.setAttribute("src", `${backend_base_url}${article.image}`)
        newArticle.setAttribute("id", article.id)
        newArticle.innerText = article.user + article.title + article.content + article.likes + article.bookmarks
        newArticle.setAttribute("onclick", "ArticleDetail(this.id)")
        newArticle.appendChild(articleImage)
        article_list.appendChild(newArticle)
    });
}