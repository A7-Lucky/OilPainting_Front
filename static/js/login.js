// 전역 변수
const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5500/templates/'

var token = localStorage.getItem("access");

if (token) {
    window.location.replace(`http://127.0.0.1:5500/templates/index.html`);
}

async function handleLogin() {
    
    const email = document.getElementById('email')
    const password = document.getElementById('password')

    // 이메일 정규표현식
    var regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if (email.value == ''){
        alert('이메일을 입력해주세요!')
        email.focus();
        return false;
    } else if (!regEmail.test(email.value)){
        alert('이메일 형식에 맞게 입력해주세요!')
        email.focus();
        return false;
    } else if (password.value == ''){
        alert('비밀번호를 입력해주세요!')
        password.focus();
        return false;
    }

    const login_data = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    const response = await fetch(`${backend_base_url}users/api/token/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(login_data)
    })
    response_json = await response.json()

    if (response.status == 200){
        localStorage.setItem("access", response_json.access)
        localStorage.setItem("refresh", response_json.refresh)

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        localStorage.setItem("payload", jsonPayload);
        
        window.location.replace(`${frontend_base_url}index.html`)
    } else if (response.status == 401){
        alert('아이디와 비밀번호를 확인해주세요!')
        window.location.reload();
    }
}