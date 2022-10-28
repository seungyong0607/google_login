function SelectItem({ $target, label, list = [] }) {
  this.render = () => {
    let selectitems = document.createElement('div');
    selectitems.classList = `transfer_wrap`;

    let transferWrapContent = list.map(item => `<option>${item.name}|${item.subName}</option>`).join('');

    selectitems.innerHTML = `
      <span class="text">${label}</span>
      ${list.length > 0 ? 
        `
          <select class="select">
            ${transferWrapContent}
          </select>
        `
      :
        `
          <input type="number" class="token_number" />
        `
      }
    `;
   
    $target.appendChild(selectitems);
  }

  this.render();

}

export default SelectItem;