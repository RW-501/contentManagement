// footer.js
export function loadFooter(targetId = "main-footer") {
  const footerContainer = document.getElementById(targetId);
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer class="site-footer" style="text-align:center; padding:20px; border-top:1px;">
      <p>
        Copyright &copy; <span id="currentYear"></span> 
        <a href="https://contenthub.guru" target="_blank">ContentHub.guru</a>  | All rights reserved
      </p>
      <nav>
        <a href="https://contenthub.guru">Home</a> |
        <a href="https://contenthub.guru/admin" id="mainAdminBtn">Dashboard</a> |
        <a href="https://contenthub.guru/about">About</a> |
        <a href="https://contenthub.guru/contact-us">Contact Us</a>
        <a href="https://contenthub.guru/privacy-policy">Privacy Policy</a>
      </nav>
    </footer>
  `;

  // Set current year
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Admin button click handler
  const adminBtn = document.getElementById("mainAdminBtn");
  if (adminBtn) {
    adminBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "https://contenthub.guru/admin/index.html";
    });
  }
}



  import {  } from 'https://contenthub.guru/exports/privacyBanner.js';
