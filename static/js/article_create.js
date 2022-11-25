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


// 아티클 생성 (임시) //
async function CreateArticle() {
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const image = document.getElementById("image").files[0]
    loadCreateArticle(title, content, image)
}