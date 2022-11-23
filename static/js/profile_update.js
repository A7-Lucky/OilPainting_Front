console.log("profile_update 로딩 완료");

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

async function loadMyProfileUpdate() {
  const profile_img = document.getElementById("profile_img").value;
  const bio = document.getElementById("bio").value;
  updateMyProfile(profile_img, bio);
}
