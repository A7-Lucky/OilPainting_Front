console.log("login 로딩 완료");

if (token) {
  window.location.replace(`${frontend_base_url}/index.html`);
}

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

async function handleLogin() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

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
  }

  const login_data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  const response = await fetch(`${backend_base_url}/users/api/token/`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(login_data),
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
    alert("아이디와 비밀번호를 확인해주세요!");
    window.location.reload();
  }
}
