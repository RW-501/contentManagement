// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// 🔹 Firebase config
const firebaseConfig = { apiKey:"AIzaSyBXZcSYdspfi2jBipwUFeNmKZgU02ksg8c", authDomain:"contentmanagement-8af61.firebaseapp.com", projectId:"contentmanagement-8af61", storageBucket:"contentmanagement-8af61.appspot.com", messagingSenderId:"579537581112", appId:"1:579537581112:web:736c7faafaf1391ce1e2cd", measurementId:"G-ZPWGF7YMPE" };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Get page ID from DOM
const pageID = document.getElementById("pageID")?.textContent || "unknown";

// 🔹 Update page views in Firestore
async function updatePageViews() {
  if (!pageID) return;

  const pageRef = doc(db, "pages", pageID);
  const pageSnap = await getDoc(pageRef);

  if (pageSnap.exists()) {
    await updateDoc(pageRef, {
      views: increment(1),
      lastVisited: new Date()
    });
  } else {
    // Create new page record if it doesn't exist
    await setDoc(pageRef, {
      views: 1,
      createdAt: new Date(),
      lastVisited: new Date()
    });
  }
}

// 🔹 Get visitor IP and location
async function getVisitorLocation() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    // Example: {ip, city, region, country_name, latitude, longitude}
    console.log("Visitor info:", data);

    // Optionally store visitor info in Firebase
    const visitorRef = doc(db, "page_visitors", `${pageID}_${data.ip}`);
    await setDoc(visitorRef, {
      pageID,
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      timestamp: new Date()
    });
  } catch (err) {
    console.error("Error fetching visitor info:", err);
  }
}

// 🔹 Run on page load
document.addEventListener("DOMContentLoaded", async () => {
  await updatePageViews();
  await getVisitorLocation();
});
