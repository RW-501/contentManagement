// header.js
(function() {
  const headerContainer = document.getElementById('main-header');
  if (!headerContainer) return;

  const currentHost = window.location.hostname;
  const currentPath = window.location.pathname;

  // Create header
  const header = document.createElement('header');
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.alignItems = 'center';
  header.style.padding = '10px 20px';
  header.style.background = '#1f2937';
  header.style.color = '#fff';
  header.style.fontFamily = 'Arial, sans-serif';

  // Title
  const h1 = document.createElement('h1');
  h1.textContent = 'Content Hub';
  h1.style.margin = '0';
  header.appendChild(h1);

  // Nav links
  const nav = document.createElement('nav');
  nav.style.display = 'flex';
  nav.style.gap = '10px';
  nav.style.alignItems = 'center';

  const links = [
    { text: 'Home', href: '/' },
    { text: 'Dashboard', href: 'https://contenthub.guru/admin', show: currentHost === 'contenthub.guru' || currentPath === '/' },
    { text: 'About', href: '/about' },
    { text: 'Contact Us', href: '/contact-us' }
  ];

  links.forEach(link => {
    if (link.show === false) return; // hide if show is false
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.text;
    a.style.color = '#fff';
    a.style.textDecoration = 'underline';
    nav.appendChild(a);
    // Separator
    if (link !== links[links.length-1]) {
      const sep = document.createTextNode(' | ');
      nav.appendChild(sep);
    }
  });

  header.appendChild(nav);

  // Buttons container
  const btnContainer = document.createElement('div');

  const loginBtn = document.createElement('button');
  loginBtn.textContent = 'Login';
  loginBtn.style.background = '#4f46e5';
  loginBtn.style.color = '#fff';
  loginBtn.style.border = 'none';
  loginBtn.style.padding = '6px 12px';
  loginBtn.style.borderRadius = '5px';
  loginBtn.style.cursor = 'pointer';
  loginBtn.addEventListener('click', () => {
    window.location.href = '/login';
  });
  btnContainer.appendChild(loginBtn);

  // Admin button only visible on contenthub.guru
  if (currentHost === 'contenthub.guru' || currentPath === '/') {
    const adminBtn = document.createElement('button');
    adminBtn.textContent = 'Go to Admin Page';
    adminBtn.style.background = '#10b981';
    adminBtn.style.color = '#fff';
    adminBtn.style.border = 'none';
    adminBtn.style.padding = '6px 12px';
    adminBtn.style.borderRadius = '5px';
    adminBtn.style.cursor = 'pointer';
    adminBtn.style.marginLeft = '10px';
    adminBtn.addEventListener('click', () => {
      window.location.href = 'https://contenthub.guru/admin';
    });
    btnContainer.appendChild(adminBtn);
  }

  header.appendChild(btnContainer);

  // Attach header to container
  headerContainer.appendChild(header);
})();
