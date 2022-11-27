console.log("api 로딩 완료");

// 전역 변수
// EC2 인스턴스 연결 시
// const backend_base_url = "http://13.209.72.148";
// 백엔드 서버 연결 시
const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http://127.0.0.1:5500/templates";

const token = localStorage.getItem("access");


// 회원가입
async function handleSignup() {
  // 이메일 정규식
  let userCheck = RegExp(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
  // 패스워드 정규식 (영문 대문자와 소문자, 숫자, 특수문자를 하나 이상 포함하여 8~16자)
  let passwdCheck = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/);

  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
  let password2 = document.querySelector("#password2");

  // 이메일 유효성 검사
  if (email.value == "") {
    alert("이메일 주소를 입력해 주세요!");
    email.focus();
    return false;
  } else if (!userCheck.test(email.value)) {
    alert("이메일 주소 형식이 잘못되었습니다!");
    email.focus();
    return false;
  }

  // 비밀번호 공백 검증
  if (password.value == "") {
    alert("비밀번호를 입력해주세요!");
    password.focus();
    return false;
  }
  // 비밀번호 유효성 검사
  else if (!passwdCheck.test(password.value)) {
    alert("비밀번호는 영문 대문자와 소문자, 숫자, 특수문자를 하나 이상 포함하여 8~16자로 입력해주세요!");
    password.focus();
    return false;
  }
  // 비밀번호 재확인 공백 검증
  else if (password2.value == "") {
    alert("비밀번호 재확인을 해주세요!");
    password2.focus();
    return false;
  }
  // 비밀번호와 비밀번호 재확인 일치 여부 검증
  else if (password.value != password2.value) {
    alert("비밀번호가 일치하지 않습니다!");
    password2.focus();
    return false;
  }
  // 이메일 비밀번호 값 중복 검증
  else if (email.value == password.value) {
    alert("이메일 주소와 비밀번호는 같을 수 없습니다!");
    password.focus();
    return false;
  }

  const signupData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  const response = await fetch(`${backend_base_url}/users/signup/`, {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(signupData),
  });

  response_json = await response.json();

  if (response.status == 201) {
    alert("가입 완료!");
    window.location.replace(`${frontend_base_url}/login.html`);
  } else {
    alert("이미 가입된 유저입니다!");
  }
}

// 로그아웃
function handleLogout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("payload");

  window.location.replace(`${frontend_base_url}/login.html`);
}

// 프로필 가져오기
async function getMyProfile() {
  const response = await fetch(`${backend_base_url}/users/profile/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 프로필 수정하기
async function updateMyProfile(formdata) {
  const response = await fetch(`${backend_base_url}/users/profile/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "PUT",
    body: formdata,
  });

  if (response.status == 200) {
    alert("프로필 변경 완료!");
    window.location.replace(`${frontend_base_url}/profile.html`);
  } else {
    alert("잘못된 입력입니다!");
  }
}

// 아티클 가져오기
async function getMyArticle() {
  const response = await fetch(`${backend_base_url}/articles/myarticle/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 비밀번호 수정하기
async function updatePassword(formdata) {
  let passwdCheck = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/);

  const response = await fetch(`${backend_base_url}/users/api/change-password/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "PUT",
    body: formdata,
  });

  if (!passwdCheck.test(new_password.value)) {
    alert("새 비밀번호는 영문 대문자와 소문자, 숫자, 특수문자를 하나 이상 포함하여 8~16자로 입력해주세요!");
  } else if (old_password.value == new_password.value) {
    alert("현재 비밀번호와 새 비밀번호는 같을 수 없습니다!");
  } else if (response.status == 200) {
    alert("비밀번호 변경 완료!");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("payload");

    window.location.replace(`${frontend_base_url}/login.html`);
  } else {
    alert("비밀번호를 확인하세요!");
  }
}

// 비밀번호 분실(인증 토큰 발급)
async function restPassword(formdata) {
  const response = await fetch(`${backend_base_url}/users/api/password_reset/`, {
    method: "POST",
    body: formdata,
  });

  if (response.status == 200) {
    alert("이메일 전송 완료!");
    window.location.replace(`${frontend_base_url}/login.html`);
  } else {
    alert("이메일 주소를 확인하세요!");
  }
}

// 비밀번호 등록(인증 토큰 입력)
async function updateTokenPassword(formdata) {
  let passwdCheck = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/);
  const response = await fetch(`${backend_base_url}/users/api/password_reset/confirm/`, {
    method: "POST",
    body: formdata,
  });

  if (!passwdCheck.test(token_password.value)) {
    alert("새 비밀번호는 영문 대문자와 소문자, 숫자, 특수문자를 하나 이상 포함하여 8~16자로 입력해주세요!");
  } else if (response.status == 200) {
    alert("비밀번호 변경 완료!");

    window.location.replace(`${frontend_base_url}/login.html`);
  } else {
    alert("인증 토큰 및 비밀번호를 확인하세요!");
  }
}
