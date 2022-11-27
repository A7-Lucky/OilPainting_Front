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
    console.log(articles)
    articles = articles['results']
    console.log(articles)
    const article_list = document.getElementById("article_list")

    articles.forEach(article => {
        // 사진만 들어가는 버전
        const newimage = document.createElement("img")

        newimage.setAttribute("src", `${backend_base_url}/${article.image}`)
        newimage.setAttribute("id", article.id)


        newimage.setAttribute("onclick", "ArticleDetail(this.id)")

        article_list.appendChild(newimage)

        // 제목+내용까지
        // const newuser = document.createElement("ol")
        // const newtitle = document.createElement("ol")
        // newtitle.setAttribute("id", article.id)
        // newuser.innerText = article.user
        // newtitle.innerText = article.title
        // newtitle.setAttribute("onclick", "ArticleDetail(this.id)")
        // article_list.appendChild(newuser)
        // article_list.appendChild(newtitle)
    });
}


// 아티클 생성 (임시) //
async function CreateArticle() {
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const image = document.getElementById("image").files[0]
    const style = $('input[name=setstyle]:checked').val();
    loadCreateArticle(title, content, image, style)
}

function MovePrevious() {
    if (!page_id || page_id == 1) {
      alert("첫 페이지입니다")
    } else {
      var newpage_id = Number(page_id) - 1
      location.replace(`${frontend_base_url}/index.html?page=${newpage_id}`)
    }
}

function MoveNext() {
  var newpage_id = Number(page_id) + 1
  location.replace(`${frontend_base_url}/index.html?page=${newpage_id}`)
}