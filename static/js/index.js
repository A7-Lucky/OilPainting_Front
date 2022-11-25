// 로그인한 사용자 액세스 정보 추적 //
function parseJwt(token) {
    var base64Url = localStorage.getItem("access").split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  
    return JSON.parse(jsonPayload);
  }


// 유저 정보 가져오기 //
async function checkLogin(){
    const name = await getName();
    
    const username = document.getElementById("username")
    username.innerText = name.email + " 님 환영합니다!"
}
checkLogin()


// 아티클 리스트 가져오기 (임시) //
window.onload = async function loadArticleList(){
    articles = await getArticleList()
    const article_list = document.getElementById("article_list")

    articles.forEach(article => {
        const newuser = document.createElement("ol")
        const newimage = document.createElement("img")
        const newtitle = document.createElement("ol")

        newimage.setAttribute("src", `${backend_base_url}${article.image}`)
        newtitle.setAttribute("id", article.id)
        newimage.setAttribute("id", article.id)

        newuser.innerText = article.user
        newtitle.innerText = article.title

        newtitle.setAttribute("onclick", "ArticleDetail(this.id)")
        newimage.setAttribute("onclick", "ArticleDetail(this.id)")

        article_list.appendChild(newimage)
        article_list.appendChild(newuser)
        article_list.appendChild(newtitle)
    });
}


// 아티클 생성 (임시) //
async function CreateArticle() {
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const image = document.getElementById("image").files[0]
    loadCreateArticle(title, content, image)
}