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


// 디테일 페이지 보여주기 //
const urlParams = new URLSearchParams(window.location.search);
const article_id = urlParams.get("id");

async function loadArticle(article_id) {
    const article = await GetArticle(article_id);

    const title = document.getElementById("title");
    const user = document.getElementById("user");

    const image = document.getElementById("image");
    let articleImage = document.createElement("img")
    articleImage.src = `${backend_base_url}${article.image}`
    image.appendChild(articleImage)

    const content = document.getElementById("content");
    const likes = document.getElementById("likes");
    const bookmarks = document.getElementById("bookmarks");
    const created_at = document.getElementById("created_at");

    title.innerText = article.title;
    user.innerText = article.user;
    content.innerText = article.content;
    likes.innerText = "❤️" + article.likes;
    bookmarks.innerText = "🔖" + article.bookmarks;
    created_at.innerText = article.created_at;
}
loadArticle(article_id);


// 아티클 유저 프로필 보여주기 //
async function loadGetProfile(article_id) {
    user = await GetProfile(article_id);

    const profile = document.getElementById("profile_img");
    let profileImage = document.createElement("img")
    profileImage.src = `${backend_base_url}${user.profile_img}`
    profileImage.setAttribute("class", "profile_img")
    profile.appendChild(profileImage)
}
loadGetProfile(article_id)


// 댓글 리스트 보여주기 //
async function loadGetComment(article_id) {
    comments = await GetComment(article_id);
    const userinfo = await getName();
    const user_list = document.getElementById("email");
    const comment_list = document.getElementById("comment");
    const created_at_list = document.getElementById("comment_created_at");
    const update_button_list = document.getElementById("update_button");
    const delete_button_list = document.getElementById("delete_button");

    comments.forEach((comment) => {
        const newUser = document.createElement("li");
        const newComment = document.createElement("li");
        const newCreatedat = document.createElement("li");
        newUser.setAttribute("id", comment.id);
        newUser.innerText = comment.user
        newComment.innerText = comment.comment
        newCreatedat.innerText = comment.created_at
        user_list.appendChild(newUser);
        comment_list.appendChild(newComment);
        created_at_list.appendChild(newCreatedat);


        const update_comment_button = document.createElement("button");
        const delete_comment_button = document.createElement("button");

        update_comment_button.innerText = "수정";
        delete_comment_button.innerText = "삭제";

        update_comment_button.setAttribute("id", comment.id);
        update_comment_button.setAttribute("class", "btn btn-success create_button")
        update_comment_button.setAttribute("data-bs-toggle", "modal");
        update_comment_button.setAttribute("data-bs-target", "#exampleModal");

        delete_comment_button.setAttribute("id", comment.id);
        delete_comment_button.setAttribute("class", "btn btn-danger create_button");
        update_comment_button.setAttribute(
            "onclick",
            "UpdateComment(this.id)"
        );
        delete_comment_button.setAttribute(
            "onclick",
            "DeleteComment(this.id)"
        );
        update_button_list.appendChild(update_comment_button);
        delete_button_list.appendChild(delete_comment_button);

        if(userinfo.email != comment.user) {
            update_comment_button.style.visibility ="hidden"
            delete_comment_button.style.visibility ="hidden"
        }
        });
}
loadGetComment(article_id);


// 댓글 작성하기 //
function CreateComment() {
    const comment = document.getElementById("comment-input").value
    loadCreateComment(comment)
}


// 댓글 수정하기 //
async function UpdateComment(comment_id) {
    const save_button = document.getElementById("save_button")

    save_button.setAttribute("id", comment_id)
    save_button.setAttribute(
        "onclick",
        "loadUpdateComment(this.id)"
    );
}


// 댓글 삭제하기 //
async function DeleteComment(article_id) {
    await loadDeleteComment(article_id);
};