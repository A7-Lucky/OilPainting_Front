// 전역 변수
// EC2 인스턴스 연결 시
// const backend_base_url = "http://13.209.72.148";
// 백엔드 서버 연결 시
const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http://127.0.0.1:5500/templates";

const token = localStorage.getItem("access");


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

// 마이 아티클 가져오기
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





//index.html ------------------------------------------------------------------------->

// 주소로 아티클 페이지받기 //
const urlParams = new URLSearchParams(window.location.search);
const page_id = urlParams.get("page");


// 아티클 리스트 보여주기 //
async function getArticleList() {
    if (!page_id) {
        var response = await fetch(`${backend_base_url}/articles/viewset/`, {
            method: 'GET',
        })
    } else {
        var response = await fetch(`${backend_base_url}/articles/viewset/?page=${page_id}`, {
            method: 'GET',
        })
    }
    response_json = await response.json()
    return response_json
}


// 아티클 디테일 페이지 연결 //
function ArticleDetail(article_id) {
    const url = `${frontend_base_url}/article_detail.html?id=${article_id}`;
    location.href = url;
}


// 아티클 작성하기 //
async function loadCreateArticle(title, content, image, style) {
    const formdata = new FormData();

    formdata.append('title', title)
    formdata.append('content', content)
    formdata.append('input', image)
    formdata.append('style', style)

    const response = await fetch(`${backend_base_url}/articles/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: 'POST',
        body: formdata
    })
    if (response.status == 200) {
        alert("글 작성 완료!")
        window.location.replace(`${frontend_base_url}/index.html`)
    }
}


//article_detail.html ------------------------------------------------------------------------->
// 아티클 디테일 //
async function GetArticle(article_id) {
    const response = await fetch(`${backend_base_url}/articles/${article_id}`, {
        method: "GET",
    });
    response_json = await response.json();
    return response_json;
}


// 아티클 유저 프로필 가져오기 //
async function GetProfile(article_id) {
    const response = await fetch(`${backend_base_url}/articles/${article_id}/user/`, {
        method: "GET",
    });
    response_json = await response.json();
    return response_json;
}


// 댓글 리스트 가져오기 //
async function GetComment(article_id) {
    const response = await fetch(
        `${backend_base_url}/articles/${article_id}/comment/`,
        {
            method: "GET",
        }
    );
    response_json = await response.json();
    return response_json;
}


// 댓글 작성하기 //
async function loadCreateComment(comment) {
    const response = await fetch(
        `${backend_base_url}/articles/${article_id}/comment/`,
        {
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
            method: "POST",
            body: JSON.stringify({
                article: article_id,
                comment: comment,
            }),
        }
    );

    response_json = await response.json();
    console.log(response_json);

    if (response.status == 200) {
        window.location.replace(
            `${frontend_base_url}/article_detail.html?id=${article_id}`
        );
    } else {
        alert(response.status);
    }
}


// 댓글 수정하기 //
async function loadUpdateComment(comment_id) {
    const input_comment = document.getElementById("modal_comment").value;

    const response = await fetch(
        `${backend_base_url}/articles/${article_id}/comment/${comment_id}/`,
        {
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
            method: "PUT",
            body: JSON.stringify({
                article: article_id,
                comment: input_comment,
            }),
        }
    );
    response_json = await response.json();
    console.log(response_json);

    if (response.status == 200) {
        window.location.replace(
            `${frontend_base_url}/article_detail.html?id=${article_id}`
        );
    } else {
        alert(response.status);
    }
}

// 댓글 삭제하기 //
async function loadDeleteComment(comment_id) {
    const response = await fetch(
        `${backend_base_url}/articles/${article_id}/comment/${comment_id}/`,
        {
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
            method: "DELETE",
        }
    );

    if (response.status == 204) {
        window.location.replace(
            `${frontend_base_url}/article_detail.html?id=${article_id}`
        );
    } else {
        alert(response.status);
    }
}


// 유저 정보 가져오기 --------------------------------------------------------------------------->
// 로그인한 유저 가져오기 //
async function getName() {
    const response = await fetch(`${backend_base_url}/users/profile`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "GET",
    });

    if (response.status == 200) {
        response_json = await response.json();
        return response_json;
    } else {
        return null;
    }
}


// 다크 모드 //
function darkmode() {
    document.getElementById('body').classList.toggle('dark');
  }
