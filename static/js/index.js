// 유저 정보 가져오기 //
async function checkLogin(){
    const name = await getName();
    
    const username = document.getElementById("username")
    username.innerText = name.username + " 님 환영합니다!"
}
checkLogin()

window.onload = async function loadArticleList(){
    articles = await getArticleList()
    const article_user = document.getElementById("article_user")
    const article_img = document.getElementById("article_img")
    const article_title = document.getElementById("article_title")
    const article_content = document.getElementById("article_content")
    const article_likes_bookmarks = document.getElementById("article_likes_bookmarks")

    articles.forEach(article => {
        const newuser = document.createElement("ol")
        const newimage = document.createElement("img")
        const newtitle = document.createElement("ol")
        const newcontent = document.createElement("ol")
        const newlikesbookmarks = document.createElement("ol")

        newimage.setAttribute("src", `${backend_base_url}${article.image}`)
        newtitle.setAttribute("id", article.id)
        newimage.setAttribute("id", article.id)

        newuser.innerText = article.user
        newtitle.innerText = article.title
        newcontent.innerText = article.content
        newlikesbookmarks.innerText = article.ikes + article.bookmarks

        newtitle.setAttribute("onclick", "ArticleDetail(this.id)")
        newimage.setAttribute("onclick", "ArticleDetail(this.id)")

        article_user.appendChild(newuser)
        article_img.appendChild(newimage)
        article_title.appendChild(newtitle)
        article_content.appendChild(newcontent)
        article_likes_bookmarks.appendChild(newlikesbookmarks)
    });
}