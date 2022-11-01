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
    amount: 0,
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
        console.log("useRefreshTokenuseRefreshToken : ", data); // 419
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
        // console.log("data data data", data);
        obj = {
          ...obj,
          data: data.data,
        }
      }

      // console.log("objjjjj", obj);

      return obj;
    } catch(e) {
      console.log('error');
      console.log(e);
    }
  }

  async function getAmount (accessToken) {
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
      amount: balance.amount,
    }
  }

  async function init() {
    // removeItem('accessToken');
    // removeItem('refreshToken');
    const token = getItem('accessToken');
    console.log("accessToken", token);

    if(self.state.userInfo == null && token == undefined) {
      loginPage.render();
    } else {
      let data = await useAssessToken(token);
      // console.log(data);
      self.state.userInfo = data.data;
      // console.log('tokentoken', token);
      self.state.amount = await getAmount(data.token);
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
      await getAmount(data['access-token']);
     
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