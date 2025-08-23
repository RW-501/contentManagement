// adminHeader.js

// authSection.js
(function () {
  // Inject CSS
  const style = document.createElement("style");
  style.textContent = `

  main {
    min-height: 100%;
}

.hidden {
display = "none";
}
    #auth-section {
      place-items: center;
      width: 50%;
      margin: 2rem auto;
      padding: 2rem;
      background: #fff;
      border-radius: 1rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      transition: all 0.3s ease-in-out;
      font-family: Arial, sans-serif;
    }

    @media (max-width: 768px) {
      #auth-section {
        width: 80%;
        padding: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      #auth-section {
        width: 95%;
        padding: 1rem;
      }
    }

    #auth-section h2 {
      margin-bottom: 1rem;
      color: #1f2937;
    }

    #auth-section input {
      width: 100%;
      padding: 10px;
      margin: 0.5rem 0;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      font-size: 14px;
    }

    #auth-section button {
      width: 100%;
      padding: 10px;
      margin-top: 1rem;
      background: #4f46e5;
      color: #fff;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.3s;
    }

    #auth-section button:hover {
      background: #4338ca;
    }
  `;
  document.head.appendChild(style);

})();


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, getDoc,  setDoc, doc, updateDoc, arrayUnion, addDoc, serverTimestamp, deleteDoc  } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { showToast } from "https://contenthub.guru/exports/showToast.js";


// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBXZcSYdspfi2jBipwUFeNmKZgU02ksg8c",
  authDomain: "contentmanagement-8af61.firebaseapp.com",
  projectId: "contentmanagement-8af61",
  storageBucket: "contentmanagement-8af61.firebasestorage.app",
  messagingSenderId: "579537581112",
  appId: "1:579537581112:web:736c7faafaf1391ce1e2cd",
  measurementId: "G-ZPWGF7YMPE"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export function loadAdminHeader(targetId = "admin-header") {
  const container = document.getElementById(targetId);
  if (!container) return;

  // Clear existing content
  container.innerHTML = "";

  // Header wrapper
  const header = document.createElement("header");
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";
  header.style.padding = "15px 20px";
  header.style.background = "#1f2937";
  header.style.color = "#fff";
  header.style.fontFamily = "Arial, sans-serif";
  header.style.flexWrap = "wrap";
  header.style.gap = "10px";

  // Left section: Title
  const title = document.createElement("h2");
  title.textContent = "Admin Dashboard";
  title.style.margin = "0";
  header.appendChild(title);

  // Right section: Buttons
  const btnContainer = document.createElement("div");
  btnContainer.style.display = "flex";
  btnContainer.style.alignItems = "center";
  btnContainer.style.gap = "10px";

  // Home button
  const homeBtn = document.createElement("button");
  homeBtn.textContent = "Home";
  homeBtn.className = "btn-dashboard";
  homeBtn.style.background = "#4f46e5";
  homeBtn.style.color = "#fff";
  homeBtn.style.border = "none";
  homeBtn.style.padding = "6px 12px";
  homeBtn.style.borderRadius = "5px";
  homeBtn.style.cursor = "pointer";
  homeBtn.addEventListener("click", () => {
    window.location.href = "https://contenthub.guru";
  });
  btnContainer.appendChild(homeBtn);

  // Show Analytics button
  const analyticsBtn = document.createElement("button");
  analyticsBtn.textContent = "Show Analytics";
  analyticsBtn.id = "showAnalytics";
  analyticsBtn.className = "btn-dashboard";
  analyticsBtn.style.background = "#10b981";
  analyticsBtn.style.color = "#fff";
  analyticsBtn.style.border = "none";
  analyticsBtn.style.padding = "6px 12px";
  analyticsBtn.style.borderRadius = "5px";
  analyticsBtn.style.cursor = "pointer";
  btnContainer.appendChild(analyticsBtn);

  // Logout button
  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Logout";
  logoutBtn.id = "logoutBtn";
  logoutBtn.style.background = "#ef4444";
  logoutBtn.style.color = "#fff";
  logoutBtn.style.border = "none";
  logoutBtn.style.padding = "6px 12px";
  logoutBtn.style.borderRadius = "5px";
  logoutBtn.style.cursor = "pointer";
  logoutBtn.addEventListener("click", async () => {
    if (window.firebase && firebase.auth) {
      await firebase.auth().signOut();
      window.location.reload();
    }
  });
  btnContainer.appendChild(logoutBtn);

  header.appendChild(btnContainer);
  container.appendChild(header);
}
