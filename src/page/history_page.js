import Profile from "../components/ProfileComponent.js";
import BackButton from "../components/BackButton.js";
import SelectItem from "../components/SelectItem.js";

function HistoryPage({ $app, initialState, moveMypage }) {
  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    $app.innerHTML = "<div></div>";
    this.render();
  }

  this.render = () => {
    this.$target = document.createElement('div');
    this.$target.classList = 'historyPage subPage';

    let historyHeader = document.createElement('div');
    historyHeader.classList = 'historyHeader subPageHeader';
    historyHeader.innerHTML = `
        <span class="title">거래 기록</span> 
    `;

    const userName = this.state.userInfo.Firstname.String+this.state.userInfo.Lastname.String;

    new BackButton({ $target: historyHeader, onClick: () => { moveMypage() } });
    new Profile({ $target: historyHeader, name: userName});

    let contentArea = document.createElement('div');
    contentArea.classList = 'transferContent subPageContent';

    new SelectItem({ $target: contentArea, label: '보내기', list: [{name: '고승용 1,278 MCNT', subName: "test@tset.com $1.3USD" }, {name: '고승용 1,278 MCNT', subName: "test@tset.com" }] });
    new SelectItem({ $target: contentArea, label: '받기', list: [{name: '고승용', subName: "test@tset.com" }] });
    new SelectItem({ $target: contentArea, label: '보내기', list: [{name: 'MCNT', subName: "잔액: 8,478" }] });
    new SelectItem({ $target: contentArea, label: '받기', list: [{name: 'MCNT', subName: "잔액: 8,478" }] });

    this.$target.appendChild(historyHeader);
    this.$target.appendChild(contentArea);

    $app.appendChild(this.$target);

    $(".select").multilineSelectmenu();
    
  }
}

export default HistoryPage;