import Profile from "../components/ProfileComponent.js";
import BackButton from "../components/BackButton.js";
import SelectItem from "../components/SelectItem.js";

function TransferPage({ $app, initialState, moveMypage }) {
  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    $app.innerHTML = "<div></div>";
    this.render();
  }

  this.render = () => {
    this.$target = document.createElement('div');
    this.$target.classList = 'transferPage subPage';

    let transferHeader = document.createElement('div');
    transferHeader.classList = 'transferHeader subPageHeader';
    transferHeader.innerHTML = `
        <span class="title">토큰 전송</span> 
    `;

    const userName = this.state.userInfo.Firstname.String+this.state.userInfo.Lastname.String;

    new BackButton({ $target: transferHeader, onClick: () => { moveMypage() } });
    new Profile({ $target: transferHeader, name: userName });

    let contentArea = document.createElement('div');
    contentArea.classList = 'transferContent subPageContent';

    new SelectItem({ $target: contentArea, label: '보내는 사람', list: [{name: '고승용', subName: "test@tset.com" }, {name: '고승용', subName: "test@tset.com" }] });
    new SelectItem({ $target: contentArea, label: '받는 사람', list: [{name: '고승용', subName: "test@tset.com" }] });
    new SelectItem({ $target: contentArea, label: '토큰', list: [{name: 'MCNT', subName: "잔액: 8,478" }] });
    new SelectItem({ $target: contentArea, label: '수량' });

    this.$target.appendChild(transferHeader);
    this.$target.appendChild(contentArea);

    $app.appendChild(this.$target);

    $(".select").multilineSelectmenu();
    
  }
}

export default TransferPage;