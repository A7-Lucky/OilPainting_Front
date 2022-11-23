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

async function loadMyProfile() {
  const profile = await getMyProfile();

  const profile_img = document.getElementById("profile_img");
  const username = document.getElementById("username");
  const bio = document.getElementById("bio");

  profile_img.innerText = profile.profile_img;
  username.innerText = profile.username;
  bio.innerText = profile.bio;
}
loadMyProfile();
