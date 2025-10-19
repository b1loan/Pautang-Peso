// Shared script for login/localStorage handling and currency background generation
(function(){
  // create falling currency elements (peso ₱ and dollar $)
  const symbols = ['₱','$'];
  const colors = ['#f57c00','#8d6e63','#ffb74d'];
  for(let i=0;i<20;i++){
    const el = document.createElement('div');
    el.className='currency';
    el.style.left = (Math.random()*100) + '%';
    el.style.fontSize = (12 + Math.random()*28) + 'px';
    el.style.color = colors[i % colors.length];
    el.style.opacity = 0.7 + Math.random()*0.3;
    el.style.animationDuration = (6 + Math.random()*10) + 's';
    el.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    document.body.appendChild(el);
  }

  // login form handling (on index.html)
  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    const first = document.getElementById('firstName');
    const last = document.getElementById('lastName');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const remember = document.getElementById('remember');
    const logoutBtn = document.getElementById('logout');
    // fill if saved
    const saved = JSON.parse(localStorage.getItem('pautang_user')||'null');
    if(saved){
      first.value = saved.firstName || '';
      last.value = saved.lastName || '';
      phone.value = saved.phone || '';
      email.value = saved.email || '';
      remember.checked = true;
    }
    loginForm.addEventListener('submit',function(e){
      e.preventDefault();
      const ph = phone.value.replace(/\D/g,'');
      if(ph.length !== 11){ alert('GCash/Maya number must be 11 digits'); return; }
      const user = {
        firstName: first.value.trim(),
        lastName: last.value.trim(),
        phone: ph,
        email: email.value.trim(),
        remembered: remember.checked
      };
      if(remember.checked) localStorage.setItem('pautang_user', JSON.stringify(user));
      else localStorage.setItem('pautang_user', JSON.stringify(user));
      // redirect to slideshow
      window.location.href = 'slideshow.html';
    });
    logoutBtn.addEventListener('click',function(){ localStorage.removeItem('pautang_user'); location.reload(); });
  }
})();
