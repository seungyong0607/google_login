import HistoryPage from "./page/history_page.js";
import LoginPage from "./page/login_page.js";
import MyPage from "./page/my_page.js";
import TransferPage from "./page/transfer_page.js";
import { setItem, getItem, removeItem } from "./util/storage.js";

function App($app) {
  const self = this;
  this.state = {
    isRoot: true,
    depth: [],
    nodes: [],
    pageName: 'login',
    userInfo: null,
  }

  async function useRefreshToken() {
    const token = getItem('refreshToken');

    if(token != '') {
      let res = await fetch('http://www.litriggy.com:7777/api/v1/auth/renew', {
        method: "GET",
        headers: {
          authorization: token,
        },
        'contentType': 'json'
      })

      console.log("resres", res);

      let data = await res.json();
      console.log("useRefreshTokenuseRefreshToken : ", data); // 419
    }
    
    return data;
  }

  async function useAssessToken(token) {
    try {
      let res = await fetch('http://www.litriggy.com:7777/api/v1/auth/check/google', {
        method: "GET",
        headers: {
          authorization: token,
        },
        'contentType': 'json'
      })
      
      let data = await res.json();
      
      if(res.status == 419) {
        // 401에러
        await useRefreshToken();
      }

      console.log("data data : ", data.data[0]); // 419
      return data.data[0];
      
    } catch(e) {
      console.log('error');
      console.log(e);
    }
  }

  async function init() {
    removeItem('accessToken');
    removeItem('refreshToken');
    let token = getItem('accessToken');

    // if(token == '') {
    //   token = getItem('refeshToken');
    // }
    // console.log(self.state.userInfo);
    if(self.state.userInfo == null && token == undefined) {
      loginPage.render();
    } else {
      self.state.userInfo = await useAssessToken(token);
      console.log("self.state.userInfo ,", self.state.userInfo);
      myPage.setState(self.state);
    }
  }

  function onClose() {
    window.close();
  }

  async function login() {
    const { token } = await chrome.identity.getAuthToken({ interactive: true });
    console.log('login' , token);

    if (token == null) {
      console.log('login fail');
      return;
    }

    // const params = {
    //   method: 'GET',
    //   async: true,
    //   headers: {
    //     Authorization: 'Bearer ' + token,
    //     'Content-Type': 'application/json'
    //   },
    //   'contentType': 'json'
    // };

    // let res = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?', params);
    // const userInfo = await res.json();
    
    try {
      const res = await fetch("http://www.litriggy.com:7777/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          AccessToken: token,
          OauthType: "google",
        }),
      });

      const data = await res.json();
      setItem('accessToken', data['access-token']);
      setItem('refreshToken', data['refresh-token']);

      self.state.userInfo = data['message'];
      myPage.setState(self.state);
      
    }catch(e) {
      console.log(e);
    }
  }

  function moveMypage () {
    self.state.page = 'mypage';
    myPage.setState(self.state);
  }

  const loginPage = new LoginPage({
    $app,
    initialState: {},
    onClick: login,
  })

  const transferPage = new TransferPage({
    $app,
    initialState: {},
    moveMypage,
  });

  const historyPage = new HistoryPage({
    $app,
    initialState: {},
    moveMypage,
  });

  const myPage = new MyPage({
    $app,
    initialState: {},
    onClose: onClose,
    transferClick: () => { 
      this.state.page = 'transfer';
      transferPage.setState(self.state);
    },
    historyClick: () => {
      this.state.page = 'history';
      historyPage.setState(self.state);
    },
  });

  init();
  // const { pathname } = location;
  // if (pathname === '/login.html') {
  // } 
}

export default App;