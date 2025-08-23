// adminHeader.js
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
  logoutBtn.style.display = "none"; // initially hidden
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
