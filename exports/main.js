// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// 🔹 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBXZcSYdspfi2jBipwUFeNmKZgU02ksg8c",
  authDomain: "contentmanagement-8af61.firebaseapp.com",
  projectId: "contentmanagement-8af61",
  storageBucket: "contentmanagement-8af61.appspot.com",
  messagingSenderId: "579537581112",
  appId: "1:579537581112:web:736c7faafaf1391ce1e2cd",
  measurementId: "G-ZPWGF7YMPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Get page ID from DOM
const pageID = document.getElementById("pageID")?.textContent || "unknown";
const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

// 🔹 Update page views (daily breakdown + total)
async function updatePageViews() {
  if (!pageID) return;

  const pageRef = doc(db, "pages", pageID);
  const pageSnap = await getDoc(pageRef);

  if (pageSnap.exists()) {
    await updateDoc(pageRef, {
      views: increment(1),
      lastVisited: new Date(),
      [`dailyViews.${today}`]: increment(1)
    });
  } else {
    await setDoc(pageRef, {
      views: 1,
      createdAt: new Date(),
      lastVisited: new Date(),
      dailyViews: {
        [today]: 1
      }
    });
  }
}

// 🔹 Log visitor info (unique per day)
async function logVisitor(data) {
  const visitorRef = doc(db, "page_visitors", `${pageID}_${data.ip}_${today}`);
  const visitorSnap = await getDoc(visitorRef);

  if (!visitorSnap.exists()) {
    await setDoc(visitorRef, {
      pageID,
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      timestamp: new Date()
    });

    // Update analytics per location
    const locationRef = doc(db, "page_locations", pageID);
    const locationSnap = await getDoc(locationRef);
    if (locationSnap.exists()) {
      await updateDoc(locationRef, {
        [`countries.${data.country_name}`]: increment(1),
        [`regions.${data.region}`]: increment(1),
        [`cities.${data.city}`]: increment(1)
      });
    } else {
      await setDoc(locationRef, {
        countries: { [data.country_name]: 1 },
        regions: { [data.region]: 1 },
        cities: { [data.city]: 1 }
      });
    }
  }
}

// 🔹 Get visitor IP & location
async function getVisitorLocation() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    console.log("Visitor info:", data);
    await logVisitor(data);
  } catch (err) {
    console.error("Error fetching visitor info:", err);
  }
}

// 🔹 Run on page load
document.addEventListener("DOMContentLoaded", async () => {
  await updatePageViews();
  await getVisitorLocation();
});
