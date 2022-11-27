console.log("index 로딩 완료");

if (!token) {
  window.location.replace(`${frontend_base_url}/login.html`);
}