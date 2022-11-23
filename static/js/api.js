console.log("api 로딩 완료");

// 전역 변수
const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http://127.0.0.1:5500/templates";

var token = localStorage.getItem("access");

// 로그인
async function handleLogin() {
  // 아이디 정규식 (4~12자의 영문 대소문자와 숫자)
  var userCheck = RegExp(/^[a-zA-Z0-9]{4,12}$/);
  // 패스워드 정규식 (영문 대문자와 소문자, 숫자, 특수문자를 하나 이상 포함하여 8~16자)
  var passwdCheck = RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/
  );

  let username = document.querySelector("#username");
  let password = document.querySelector("#password");

  // 아이디 공백 및 유효성 검사
  if (username.value == "") {
    alert("아이디를 입력해주세요!");
    username.focus();
    return false;
  } else if (!userCheck.test(username.value)) {
    alert("아이디는 4~12자의 영문 대소문자와 숫자로만 입력해주세요!");
    username.focus();
    return false;
  }

  // 비밀번호 공백 및 유효성 검사
  if (password.value == "") {
    alert("비밀번호를 입력해주세요!");
    password.focus();
    return false;
  } else if (!passwdCheck.test(password.value)) {
    alert(
      "비밀번호는 영문 대문자와 소문자, 숫자, 특수문자를 하나 이상 포함하여 8~16자로 입력해주세요!"
    );
    password.focus();
    return false;
  }

  const loginData = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };
  const response = await fetch(`${backend_base_url}/users/api/token/`, {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(loginData),
  });

  response_json = await response.json();

  if (response.status == 200) {
    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);

    const base64Url = response_json.access.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    localStorage.setItem("payload", jsonPayload);
    window.location.replace(`${frontend_base_url}/index.html`);
  } else {
    alert("로그인 정보를 확인하세요.", response.status);
  }
}

// 회원가입
async function handleSignup() {
  // 아이디 정규식 (4~12자의 영문 대소문자와 숫자)
  var userCheck = RegExp(/^[a-zA-Z0-9]{4,12}$/);
  // 패스워드 정규식 (영문 대문자와 소문자, 숫자, 특수문자를 하나 이상 포함하여 8~16자)
  var passwdCheck = RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/
  );

  let username = document.querySelector("#username");
  let password = document.querySelector("#password");
  let password2 = document.querySelector("#password2");

  // 아이디 유효성 검사
  if (username.value == "") {
    alert("아이디를 입력해주세요!");
    username.focus();
    return false;
  } else if (!userCheck.test(username.value)) {
    alert("아이디는 4~12자의 영문 대소문자와 숫자로만 입력해주세요!");
    username.focus();
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
    alert(
      "비밀번호는 영문 대문자와 소문자, 숫자, 특수문자를 하나 이상 포함하여 8~16자로 입력해주세요!"
    );
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
  // 아이디 비밀번호 값 중복 검증
  else if (username.value == password.value) {
    alert("아이디와 비밀번호는 같을 수 없습니다!");
    password.focus();
    return false;
  }

  const signupData = {
    username: document.getElementById("username").value,
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
  } else if (response.status == 400) {
    alert("이미 가입된 유저입니다!");
    window.location.reload();
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
    alert(response.status);
  }
}
