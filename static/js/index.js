if (!token) {
  window.location.replace(`${frontend_base_url}/login.html`);
}

// 유저 정보 가져오기 //
async function checkLogin() {
  const name = await getName();

  const username = document.getElementById("username");
  username.innerText = name.email + " 님 환영합니다!";
}
checkLogin();

// 아티클 리스트 가져오기 (페이지네이션 적용)  //
window.onload = async function loadArticleList() {
  viewset = await getArticleList();
  // 아티클 받아오기 //
  articles = viewset["results"];
  // 페이지 수 가져오기 // 
  pages = viewset['count']
  pages = Math.ceil(Number(pages)/3)

  // 아티클 생성하기 //
  const article_list = document.getElementById("article_list");

  articles.forEach((article) => {
    // 사진만 들어가는 버전
    const newimage = document.createElement("img");

    newimage.setAttribute("src", `${backend_base_url}/${article.image}`);
    newimage.setAttribute("id", article.id);

    newimage.setAttribute("onclick", "ArticleDetail(this.id)");

    article_list.appendChild(newimage);

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

  // 페이지네이션 페이지 생성하기 //
  for (let i = 1; i < pages+1; i++) {
    let temp_html = `
    <li class="page-item"><a class="page-link" href="?page=${i}">${i}</a></li>
    `
    
    $('#pagination').append(temp_html)
  }
};

// 아티클 생성 //
async function CreateArticle() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const image = document.getElementById("image").files[0];
  const style = $("input[name=setstyle]:checked").val();
  loadCreateArticle(title, content, image, style);
}

function MovePrevious() {
  if (!page_id || page_id == 1) {
    alert("첫 페이지입니다");
  } else {
    var newpage_id = Number(page_id) - 1;
    location.replace(`${frontend_base_url}/index.html?page=${newpage_id}`);
  }
}

function MoveNext() {
  var newpage_id = Number(page_id) + 1;
  location.replace(`${frontend_base_url}/index.html?page=${newpage_id}`);
}
