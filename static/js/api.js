// 전역 변수 //
const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http://127.0.0.1:5500/templates";

var token = localStorage.getItem("access");


// 로그인 //
async function handleLogin() {
    const loginData = {
        email: document.getElementById("email").value,
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


// 로그아웃 //
function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("payload");

    window.location.replace(`${frontend_base_url}/login.html`);
}


//index.html ------------------------------------------------------------------------->
// 아티클 리스트 보여주기 //
async function getArticleList() {
    const response = await fetch(`${backend_base_url}/articles`, {
        method: 'GET',
    })
    response_json = await response.json()
    return response_json
}


// 아티클 디테일 페이지 연결 //
function ArticleDetail(article_id) {
    const url = `${frontend_base_url}/article_detail.html?id=${article_id}`;
    location.href = url;
}


// 아티클 작성하기 //
async function loadCreateArticle(title, content, image) {
    const formdata = new FormData();

    formdata.append('title', title)
    formdata.append('content', content)
    formdata.append('image', image)

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

