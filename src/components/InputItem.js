function InputItem({ $target, label, value, focusOut }) {
  this.render = () => {
    let $subItemWrap = document.createElement('div');
    $subItemWrap.classList = `sub_item_wrap`;

    let $input = document.createElement('input');
    $input.classList = 'sub_item_input';
    $input.value = 'seungyong@sandboxnetwork.net';

    $input.addEventListener('focusout', (event) => { focusOut(event) });
    // <input type="text" value="${value}" class="sub_item_input" />

    $subItemWrap.innerHTML = `
      <span class="text">${label}</span>
    `;

    $subItemWrap.appendChild($input);


    $target.appendChild($subItemWrap);
  }

  this.render();

}

export default InputItem;