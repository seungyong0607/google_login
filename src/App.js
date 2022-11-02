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
    balance: {},
  }

  async function useRefreshToken() {
    const token = getItem('refreshToken');
    console.log('re', token);

    try {
      if(token != '') {
        let res = await fetch('http://www.litriggy.com:7777/api/v1/auth/renew', {
          method: "GET",
          headers: {
            authorization: token,
          },
          'contentType': 'json'
        })
        
        let data = await res.json();
        // console.log("useRefreshTokenuseRefreshToken : ", data); // 419
        return data.Access;
      }
    } catch(e) {
      loginPage.render();
    }
  }

  async function useAssessToken(token) {
    let obj = {
      token,
      data: null,
    }

    try {
      let res = await fetch('http://www.litriggy.com:7777/api/v1/auth/check/google', {
        method: "GET",
        headers: {
          authorization: token,
        },
        'contentType': 'json'
      })
      
      let { data } = await res.json();
      obj.data = data;
      
      if(res.status == 419) {
        // 419 에러
        let authorization = await useRefreshToken();
        obj.token = authorization;

        let res = await fetch('http://www.litriggy.com:7777/api/v1/auth/check/google', {
          method: "GET",
          headers: {
            authorization,
          },
          'contentType': 'json'
        })
      
        let data = await res.json();
        obj = {
          ...obj,
          data: data.data,
        }

        removeItem('accessToken');
        setItem('accessToken', obj.token);
      }

      return obj;
    } catch(e) {
      console.log('error');
      console.log(e);
    }
  }

  async function getBalance(accessToken) {
    const balRes = await fetch("http://www.litriggy.com:7777/api/v1/user/balance/mcnt", {
      method: "GET",
      headers: {
        authorization: accessToken,
        "Content-Type": "application/json",
      },
    });

    const balance = await balRes.json();
    self.state = {
      ...self.state,
      balance,
    }
  }

  async function focusOut(e){
    const res = await fetch(`http://www.litriggy.com:7777/api/v1/user/name/${e.target.value}`);
    const data = await res.json();
    // console.log("email check value :", data);
    
    if(data.status === 200) {
      return true;
    }

    return false;
  } 

  async function init() {
    // removeItem('accessToken');
    // removeItem('refreshToken');
    const token = getItem('accessToken');
    console.log("accessToken", token);

    if(self.state.userInfo == null && token == undefined) {
      loginPage.render();
    } else {
      let data  = await useAssessToken(token);
      self.state.userInfo = data.data;
      console.log("data.toke", data.token);
      await getBalance(data.token);
      myPage.setState(self.state);
    }
  }

  function onClose() {
    removeItem('accessToken');
    removeItem('refreshToken');

    window.close();
  }

  async function login() {
    const { token } = await chrome.identity.getAuthToken({ interactive: true });

    if (token == null) {
      console.log('login fail');
      return;
    }

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
      removeItem('accessToken');
      removeItem('refreshToken');

      setItem('accessToken', data['access-token']);
      setItem('refreshToken', data['refresh-token']);

      // console.log(data);
      self.state.userInfo = data['message'];
      await getBalance(data['access-token']);
     
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
    initialState: this.state,
    moveMypage,
    focusOut,
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
}

export default App;