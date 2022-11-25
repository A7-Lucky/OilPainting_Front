console.log("login 로딩 완료");

// 이메일 주소 받기
async function loadEmailAddress() {
  const email_address = document.getElementById("email_address").value;

  const formdata = new FormData();

  formdata.append("email", email_address);

  restPassword(formdata);
}

// 인증 토큰 및 비밀번호 받기
async function loadTokenPassword() {
  const token = document.getElementById("token").value;
  const token_password = document.getElementById("token_password").value;

  const formdata = new FormData();

  formdata.append("token", token);
  formdata.append("password", token_password);

  updateTokenPassword(formdata);
}
