import Profile from "../components/ProfileComponent.js";
import BackButton from "../components/BackButton.js";
import SelectItem from "../components/SelectItem.js";
import InputItem from "../components/InputItem.js";
import DisplayItem from "../components/DisplayItem.js";

function TransferPage({ $app, initialState, moveMypage, focusOut }) {
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

    const userName = this.state.userInfo.Lastname.String+this.state.userInfo.Firstname.String;

    new BackButton({ $target: transferHeader, onClick: () => { moveMypage() } });
    new Profile({ $target: transferHeader, name: userName });

    let contentArea = document.createElement('div');
    contentArea.classList = 'transferContent subPageContent';

    const { Lastname, Firstname, Email } = this.state.userInfo;
    const name = Lastname.String + Firstname.String;

    new DisplayItem({ $target: contentArea, label: '보내는 사람', value: {name: name, subName: Email.String }});
    new InputItem({ $target: contentArea, label: '받는 사람', value: "", focusOut, });
    new SelectItem({ $target: contentArea, label: '토큰', list: [{name: 'MCNT', subName: "잔액: 8,478" }] });
    new SelectItem({ $target: contentArea, label: '수량' });

    let buttonWrap = document.createElement('div');
    buttonWrap.classList = `transfer_wrap transfer_button_wrap`;

    let transferButton = document.createElement('button');
    transferButton.classList = `transferButton myBtn`;
    transferButton.innerText = "전송";
    transferButton.addEventListener('click', e => alert('전송'));

    buttonWrap.appendChild(transferButton);

    contentArea.appendChild(buttonWrap);

    this.$target.appendChild(transferHeader);
    this.$target.appendChild(contentArea);

    $app.appendChild(this.$target);

    $(".select").multilineSelectmenu();
    
  }
}

export default TransferPage;