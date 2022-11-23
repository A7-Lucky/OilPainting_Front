// 디테일 페이지 보여주기 //
const urlParams = new URLSearchParams(window.location.search);
const article_id = urlParams.get("id");

async function loadArticle(article_id) {
    const article = await GetArticle(article_id);

    const title = document.getElementById("title");
    const user = document.getElementById("user");
    const image = document.getElementById("image");
    const content = document.getElementById("content");
    const likes = document.getElementById("likes");
    const bookmarks = document.getElementById("bookmarks");
    const created_at = document.getElementById("created_at");

    title.innerText = article.title;
    user.innerText = article.user;
    image.innerText = article.image;
    content.innerText = article.content;
    likes.innerText = "❤️" + article.likes;
    bookmarks.innerText = "🔖" + article.bookmarks;
    created_at.innerText = article.created_at;
}
loadArticle(article_id);


// 댓글 리스트 보여주기 //
async function loadGetComment(article_id) {
    comments = await GetComment(article_id);
    const comment_list = document.getElementById("comment");
    const update_button_list = document.getElementById("update_button");
    const delete_button_list = document.getElementById("delete_button");

    comments.forEach((comment) => {
        const newComment = document.createElement("li");
        newComment.setAttribute("id", comment.id);
        newComment.innerText = comment.user + comment.comment + comment.created_at;
        comment_list.appendChild(newComment);

        const update_comment_button = document.createElement("button");
        const delete_comment_button = document.createElement("button");

        update_comment_button.innerText = "수정";
        delete_comment_button.innerText = "삭제";
        update_comment_button.setAttribute("id", comment.id);
        delete_comment_button.setAttribute("id", comment.id);
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
    });
}
loadGetComment(article_id);


// 댓글 작성하기 //
function loadCreateComment() {
    const comment = document.getElementById("comment-input").value
    CreateComment(comment)
}


// 댓글 수정하기 //
async function UpdateComment(comment_id) {
    const update_review_list = document.getElementById("update_box");

    const input_comment = document.createElement("textarea");
    input_comment.setAttribute("id", "input_comment");
    input_comment.innerText = "댓글을 수정해 주세요!";
    update_review_list.appendChild(input_comment);

    const update_comment_button = document.createElement("button");
    update_comment_button.innerText = "수정";
    update_comment_button.setAttribute("id", comment_id);
    update_comment_button.setAttribute(
        "onclick",
        "loadUpdateComment(this.id)"
    );
    update_review_list.appendChild(update_comment_button);
}


// 댓글 삭제하기 //
async function DeleteComment(article_id) {
    await loadDeleteComment(article_id);
}

