if (!token) {
  window.location.replace(`${frontend_base_url}/login.html`);
}

// 유저 정보 가져오기 //
async function checkLogin() {
  const name = await getName();

  const username = document.getElementById("username");
  username.innerText = name.email + " 님 환영합니다!";
}
checkLogin();

// 디테일 페이지 보여주기 //
const urlParams = new URLSearchParams(window.location.search);
const article_id = urlParams.get("id");

async function loadArticle(article_id) {
  const article = await GetArticle(article_id);

  const title = document.getElementById("title");
  const user = document.getElementById("user");

  const image = document.getElementById("image");
  let articleImage = document.createElement("img");
  articleImage.src = `${backend_base_url}/${article.image}`;
  image.appendChild(articleImage);

  const content = document.getElementById("content");
  const likes = document.getElementById("likes");
  const bookmarks = document.getElementById("bookmarks");
  const created_at = document.getElementById("created_at");

  const dolike = document.getElementById("dolike");
  const dolike_button = document.createElement("button");
  dolike_button.innerText = "❤️";
  dolike_button.setAttribute("id", article.id);
  dolike_button.setAttribute("class", "btn btn-outline-danger");
  dolike_button.setAttribute("onclick", "DoLike(this.id)");
  dolike.appendChild(dolike_button);

  const dobookmark = document.getElementById("dobookmark");
  const dobookmark_button = document.createElement("button");
  dobookmark_button.innerText = "🔖";
  dobookmark_button.setAttribute("id", article.id);
  dobookmark_button.setAttribute("class", "btn btn-outline-warning");
  dobookmark_button.setAttribute("onclick", "DoBookmark(this.id)");
  dobookmark.appendChild(dobookmark_button);

  title.innerText = article.title;
  user.innerText = article.user;
  content.innerText = article.content;
  likes.innerText = article.likes;
  bookmarks.innerText = article.bookmarks;
  created_at.innerText = article.created_at.replace("T", " ").substr(0, 16);
}
loadArticle(article_id);

// 아티클 유저 프로필 보여주기 //
async function loadGetProfile(article_id) {
  user = await GetProfile(article_id);

  const profile = document.getElementById("profile_img");
  let profileImage = document.createElement("img");
  profileImage.src = `${backend_base_url}${user.profile_img}`;
  profileImage.setAttribute("class", "profile_img");
  profile.appendChild(profileImage);
}
loadGetProfile(article_id);

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
    newUser.innerText = comment.user;
    newComment.innerText = comment.comment;
    newCreatedat.innerText = comment.created_at.replace("T", " ").substr(0, 16);
    user_list.appendChild(newUser);
    comment_list.appendChild(newComment);
    created_at_list.appendChild(newCreatedat);

    const update_comment_button = document.createElement("button");
    const delete_comment_button = document.createElement("button");

    update_comment_button.innerText = "수정";
    delete_comment_button.innerText = "삭제";

    update_comment_button.setAttribute("id", comment.id);
    update_comment_button.setAttribute("class", "btn btn-success create_button");
    update_comment_button.setAttribute("data-bs-toggle", "modal");
    update_comment_button.setAttribute("data-bs-target", "#exampleModal");

    delete_comment_button.setAttribute("id", comment.id);
    delete_comment_button.setAttribute("class", "btn btn-danger create_button");
    update_comment_button.setAttribute("onclick", "UpdateComment(this.id)");
    delete_comment_button.setAttribute("onclick", "DeleteComment(this.id)");
    update_button_list.appendChild(update_comment_button);
    delete_button_list.appendChild(delete_comment_button);

    if (userinfo.email != comment.user) {
      update_comment_button.style.visibility = "hidden";
      delete_comment_button.style.visibility = "hidden";
    }
  });
}
loadGetComment(article_id);

// 댓글 작성하기 //
function CreateComment() {
  const comment = document.getElementById("comment-input").value;
  loadCreateComment(comment);
}

// 댓글 수정하기 //
async function UpdateComment(comment_id) {
  const save_button = document.getElementById("save_button");

  save_button.setAttribute("id", comment_id);
  save_button.setAttribute("onclick", "loadUpdateComment(this.id)");
}

// 댓글 삭제하기 //
async function DeleteComment(article_id) {
  await loadDeleteComment(article_id);
}
