function MyPage({ $app, initialState, onClose, transferClick, historyClick, moveMypage }) {
  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    $app.innerHTML = "<div></div>";
    this.render();
  }

  this.render = () => {
    this.$target = document.createElement('div');
    this.$target.className = 'myPage';

    let myPageHeader = `
      <div class="myPageHeader">
        <span class="arrow"> 
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>
        </span>
        <div>
          <span class="profile_circle"></span>
          <span class="profile_name">name</span>
        </div>
      </div>
    `;

    let myPageContent = `
      <div class="myPageContent">
        <p class="desc">Total Balance</p>
        <div>
          <span class="balance">8,478</span>
          <span class="mcnt">MCNT</span>
        </div>
        <p class="dollar">
          $1.30 USD
        </p>
      </div>
    `;

    let buttonArea = document.createElement('div');
    buttonArea.className = 'buttonArea';
    let transferButton = document.createElement('button');
    transferButton.classList = 'transferButton myBtn';
    transferButton.innerHTML = '토큰 전송';
    transferButton.addEventListener('click', e => transferClick(moveMypage));
    let historyButton = document.createElement('button');
    historyButton.classList = 'historyButton myBtn';
    historyButton.innerHTML = `거래 기록`;
    historyButton.addEventListener('click', e => historyClick(moveMypage));

    this.$target.innerHTML = `
      ${myPageHeader}
      ${myPageContent}
    `;
    
    buttonArea.appendChild(transferButton);
    buttonArea.appendChild(historyButton);
    this.$target.appendChild(buttonArea);

    $app.appendChild(this.$target);
  }

  // document.querySelector('.btn-close').addEventListener('click', e=> {
  //   console.log('ee');
  //   window.close();
  // })
  // this.render();
}

export default MyPage;



// let closeBtn = `
// <div class="closeArea" style="margin-right: 10px; cursor:pointer">
//   <button type="button" class="btn-close" disabled aria-label="Close" onclick="${onClose}"></button>
// </div>
// `;

// this.$target.innerHTML = `
// <div class="myPage">
// <div class="mypageHaeder">
//   <div class="dropdown border-top">
//     <a href="#" class="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" >
//     </a>
//     <ul class="dropdown-menu text-small shadow show" style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate(0px, -58px);" data-popper-placement="top-start">
//       <li><a class="dropdown-item" href="#">New project...</a></li>
//       <li><a class="dropdown-item" href="#">Settings</a></li>
//       <li><a class="dropdown-item" href="#">Profile</a></li>
//       <li><hr class="dropdown-divider"></li>
//       <li><a class="dropdown-item" href="#">Sign out</a></li>
//     </ul>
//   </div>
//   <div style="margin-left:-100px">
  
//   </div>
//   ${closeBtn}
// </div>

// <div class="mypageBody">
//   <div style="margin-top:-60px;">
//     <span class="coin">보유 COIN</span>
//   </div>
//   <div style="margin-top:30px;">
//     <span class="money">10,000,000</span>
//     <span class="pay">MCNT</span>
//   </div>
// </div>

// <div class="mypageFooter">
//   <button type="button" class="btn btn-primary">전송</button>
//   <button type="button" class="btn btn-info">환전</button>
// </div>
// </div>
// `;