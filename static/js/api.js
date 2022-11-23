// 전역 변수 //
const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http://127.0.0.1:5500/templates";

var token = localStorage.getItem("access");


// 로그인 //
async function handleLogin() {
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


// 로그아웃 //
function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("payload");

    window.location.replace(`${frontend_base_url}/login.html`);
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
async function CreateComment(comment) {
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
