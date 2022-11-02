import BackButton from "../components/BackButton.js";
import Profile from "../components/ProfileComponent.js";

function MyPage({ $app, initialState, onClose, transferClick, historyClick, moveMypage }) {
  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    $app.innerHTML = "";
    // console.log('setState 실행', this.state, $app);
    this.render();
  }

  this.render = () => {
    this.$target = document.createElement('div');
    this.$target.className = 'myPage';

    const userName = this.state.userInfo.Lastname.String+this.state.userInfo.Firstname.String;

    const $myPageHeader = document.createElement('div');
    $myPageHeader.className = 'myPageHeader';
    new BackButton({ $target: $myPageHeader, onClick: () => { onClose(); } });
    new Profile({ $target: $myPageHeader, name: userName });

    const $myPageContent = document.createElement('div');
    $myPageContent.classList = 'myPageContent';

    let { amount, USD } = this.state.balance;
    $myPageContent.innerHTML = `
        <p class="desc">Total Balance</p>
        <div>
          <span class="balance">${amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span>
          <span class="mcnt">MCNT</span>
        </div>
        <p class="dollar">
        $ ${USD} 
        </p>
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

    this.$target.appendChild($myPageHeader);
    this.$target.appendChild($myPageContent);

    buttonArea.appendChild(transferButton);
    buttonArea.appendChild(historyButton);
    this.$target.appendChild(buttonArea);

    $app.appendChild(this.$target);
  }

  if(this.state.userInfo !== undefined) {
    this.render();
  }
}

export default MyPage;