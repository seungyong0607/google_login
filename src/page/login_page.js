function LoginPage({ $app, initialState, onClick, }) {
  this.state = initialState;
  this.onClick = onClick;
  this.$target = document.createElement('div');
  this.$target.className = 'loginArea';

  $app.appendChild(this.$target);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    let loginTitle = `
      <div class="welcome">
        <p>MCNT에</p>
        <p>오신 것을</p>
        <p>환영합니다.</p>
      </div>
    `;

    let loginDesc = `
      <div class="loginDesc">
        <p>
          계정에 접근하기 위해 구글로 로그인 해주시기 바랍니다.
        <p>
      </div>
    `

    let loginButton = document.createElement('div');
    loginButton.innerHTML =`
      <div class="loginButton">
        <img src="/public/btn_google_signin_dark_normal_web.png" id="login_button" />
      </div>
    `;

    loginButton.addEventListener('click', e => onClick());

    this.$target.innerHTML = `
      ${loginTitle}
      ${loginDesc}
    `;

    this.$target.append(loginButton);
    $app.appendChild(this.$target);
  }
}

export default LoginPage;


{/* <div style='text-align: center'>
<h3 class="loginTitle">Sign In with</h3>
<img src="/public/btn_google_signin_dark_normal_web.png" id="login_button" />
</div>
<div style="padding-top:40px">
<h6 class="copylight" >test sample login</h6>
</div> */}