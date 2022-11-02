function DisplayItem({ $target, label, value }) {
  this.render = () => {
    let $subItemWrap = document.createElement('div');
    $subItemWrap.classList = `sub_item_wrap`;

    // let $display = document.createElement('div');
    // $display.classList = 'sub_display_item';
    // $display.innerHTML = 'sdsd';

    const { name, subName } = value; 
    
    $subItemWrap.innerHTML = `
      <span class="text">${label}</span>
      <div class="sub_display_item">
        <p>${name}</p>
        <p>${subName}</p>
      </div>
    `;

    $target.appendChild($subItemWrap);
  }

  this.render();

}

export default DisplayItem;