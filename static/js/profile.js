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

window.onload = async function loadMyProfile() {
  profile = await getMyProfile();

  const profile_img = document.getElementById("profile_img");
  const username = document.getElementById("username");
  const bio = document.getElementById("bio");

  let image = document.createElement("img");
  image.src = `${backend_base_url}${profile.profile_img}`;
  profile_img.appendChild(image);

  username.innerText = profile.username;
  bio.innerText = profile.bio;
};
