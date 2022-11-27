if (!token) {
  window.location.replace(`${frontend_base_url}/login.html`);
}

// 기존 프로필 이미지 보여주기
window.onload = async function loadMyProfile() {
  profile = await getMyProfile();

  const profile_update_img = document.getElementById("profile_update_img");

  let image = document.createElement("img");
  image.src = `${backend_base_url}${profile.profile_img}`;
  profile_update_img.appendChild(image);
};

// 프로필 수정
async function loadMyProfileUpdate() {
  const profile_img = document.getElementById("profile_img").files[0];
  const bio = document.getElementById("bio").value;

  const formdata = new FormData();

  formdata.append("profile_img", profile_img);
  formdata.append("bio", bio);

  updateMyProfile(formdata);
}

// 회원 탈퇴
async function Unsignup() {
  const name = await getName();
  const email = document.getElementById("email_check").value
  
  if (email == name.email) {
    handleUnsignup()
    alert("회원 탈퇴 완료!")
    window.location.replace(`${frontend_base_url}/signup.html`);
  } else {
    alert("이메일을 다시 입력해주세요.")
  }
}
