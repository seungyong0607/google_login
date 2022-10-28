window.onload = function () {

  // document.querySelector('button').addEventListener('click', function() {
  //   chrome.identity.getAuthToken({interactive: true}, function(token) {
  //     console.log(token);
  //   });
  // });

  
    // chrome.identity.getAuthToken({interactive: true}, function(token) {
    //   console.log(token);
    //   let init = {
    //     method: 'GET',
    //     async: true,
    //     headers: {
    //       Authorization: 'Bearer ' + token,
    //       'Content-Type': 'application/json'
    //     },
    //     'contentType': 'json'
    //   };
    //   fetch(
    //       'https://oauth2.googleapis.com/tokeninfo',
    //       init)
    //       .then((response) => response.json())
    //       .then(function(data) {
    //         console.log("ddddddddddddddddddd" ,data)
    //       });
    // });


    

  document.querySelector('#login_button').addEventListener('click', function () {

    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      console.log(token);
      if (token == null) {
        elmText.value = "Login fail.";
        return;
      }

      elmText.value = "Login success.";
      let init = {
        method: 'GET',
        async: true,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        'contentType': 'json'
      };
      fetch(
        'https://www.googleapis.com/oauth2/v1/userinfo?', init)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data)
          elmText.value += "\n\nemail:" + data.email;
        });
    });
  });

   document.querySelector('#testBtn').onclick = function() {
    let url = document.getElementById('id_url').value;
  
    fetch(url, {
      method: 'GET',
      mode: 'cors',
    })
    .then(res => {
      if(res.ok) {
        return res.text();
      }
  
      throw new Error('ok');
    })
    .then(data => {
      document.getElementById('id_response').value = data;
    })
  }

  // document.querySelector('#testBtn').onclick(() => {
 
  // })
  
  
  // POST:: /api/v1/auth/signup
  // body: {
  // Firstname
  // Lastname
  // OauthId
  // OauthType
  // Email
  // Nickname
  // }

};

