console.log("profile 로딩 완료");

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

// 프로필 보여주기
window.onload = async function loadMyProfile() {
  profile = await getMyProfile();

  const profile_img = document.getElementById("profile_img");
  const email = document.getElementById("email");
  const bio = document.getElementById("bio");

  let image = document.createElement("img");
  image.setAttribute("class", "profile_image");
  image.src = `${backend_base_url}${profile.profile_img}`;
  profile_img.appendChild(image);

  email.innerText = profile.email;
  bio.innerText = "[ " + profile.bio + " ]";
};

// 비밀번호 변경
async function loadPasswordUpdate() {
  const old_password = document.getElementById("old_password").value;
  const new_password = document.getElementById("new_password").value;

  const formdata = new FormData();

  formdata.append("old_password", old_password);
  formdata.append("new_password", new_password);

  updatePassword(formdata);
}

// 아티클 리스트 보여주기
async function loadMyArticle() {
  articles = await getMyArticle();

  const article_list = document.getElementById("article_list");
  articles.forEach((article) => {
    const newImage = document.createElement("img");
    newImage.setAttribute("id", article.id);
    newImage.setAttribute("class", "article_image");
    newImage.src = `${backend_base_url}${article.image}`;
    article_list.appendChild(newImage);

    const newTitle = document.createElement("li");
    newTitle.setAttribute("id", article.id);
    newTitle.setAttribute("class", "article_title");
    newTitle.innerText = "제목\n\n" + article.title;
    article_list.appendChild(newTitle);

    const newContent = document.createElement("li");
    newContent.setAttribute("id", article.id);
    newContent.setAttribute("class", "article_content");
    newContent.innerText = "내용\n\n" + article.content;
    article_list.appendChild(newContent);
  });
}
loadMyArticle();
