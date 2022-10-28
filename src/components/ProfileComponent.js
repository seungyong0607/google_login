function Profile({ $target, name, onClick }) {
  this.render = () => {
    let profile= document.createElement('div');
    profile.innerHTML = `
        <span class="profile_circle"></span>
        <span class="profile_name">${name}</span>
    `;
  
    $target.appendChild(profile); 
  }

  this.render();
}

export default Profile;