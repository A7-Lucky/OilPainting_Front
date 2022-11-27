if (token) {
  window.location.replace(`${frontend_base_url}/index.html`);
}

async function handleSignup() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const password2 = document.getElementById("password2");

  // 이메일 정규표현식
  var regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  // 패스워드 정규식 (영문 대문자와 소문자, 숫자, 특수문자를 하나 이상 포함하여 8~16자)
  let passwdCheck = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/);

  if (email.value == "") {
    alert("이메일을 입력해주세요!");
    email.focus();
    return false;
  } else if (!regEmail.test(email.value)) {
    alert("이메일 형식에 맞게 입력해주세요!");
    email.focus();
    return false;
  } else if (password.value == "") {
    alert("비밀번호를 입력해주세요!");
    password.focus();
    return false;
  } else if (!passwdCheck.test(password.value)) {
    alert("비밀번호는 영문 대문자와 소문자, 숫자, 특수문자를 하나 이상 포함하여 8~16자로 입력해주세요!");
    password.focus();
    return false;
  } else if (password2.value == "") {
    alert("비밀번호를 한 번 더 입력해주세요!");
    password2.focus();
    return false;
  } else if (password.value != password2.value) {
    alert("비밀번호가 일치하지 않습니다!");
    password.value = "";
    password2.value = "";
    password.focus();
    return false;
  }

  // 회원가입 요청에 필요한 사용자 데이터
  const signup_data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  const response = await fetch(`${backend_base_url}/users/signup/`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(signup_data),
  });

  response_json = await response.json();
  if (response.status == 201) {
    alert("가입 완료!");
    window.location.replace(`${frontend_base_url}/login.html`);
  } else {
    alert("이미 가입된 계정입니다!");
    window.location.reload();
  }
}
