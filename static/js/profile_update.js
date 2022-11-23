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

window.onload = async function loadMyProfile() {
  profile = await getMyProfile();

  const profile_update_img = document.getElementById("profile_update_img");

  let image = document.createElement("img");
  image.src = `${backend_base_url}${profile.profile_img}`;
  profile_update_img.appendChild(image);
};

async function loadMyProfileUpdate() {
  const profile_img = document.getElementById("profile_img").files[0];
  const bio = document.getElementById("bio").value;

  const formdata = new FormData();

  formdata.append("profile_img", profile_img);
  formdata.append("bio", bio);

  updateMyProfile(formdata);
}
