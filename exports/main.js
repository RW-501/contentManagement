import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

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

const pageID = document.getElementById("pageID")?.textContent || "unknown";
const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

// 🔹 Update page views (total + daily)
async function updatePageViews(unique = false) {
  if (!pageID) return;

  const pageRef = doc(db, "pages", pageID);
  const pageSnap = await getDoc(pageRef);

  if (pageSnap.exists()) {
    const updates = {
      views: increment(1),
      lastVisited: new Date(),
      [`dailyViews.${today}`]: increment(1)
    };
    if (unique) updates.uniqueViews = increment(1); // increment unique views if needed
    await updateDoc(pageRef, updates);
  } else {
    await setDoc(pageRef, {
      views: 1,
      uniqueViews: unique ? 1 : 0,
      createdAt: new Date(),
      lastVisited: new Date(),
      dailyViews: { [today]: 1 }
    });
  }
}

// 🔹 Log visitor info (unique per day)
async function logVisitor(data) {
  const visitorRef = doc(db, "page_visitors", `${pageID}_${data.ip}_${today}`);
  const visitorSnap = await getDoc(visitorRef);

  let isUnique = false;
  if (!visitorSnap.exists()) {
    isUnique = true; // first time today
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

  // Always increment total views, only increment uniqueViews if first time
  await updatePageViews(isUnique);
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
  await getVisitorLocation();
});




    const mainPhoto = document.getElementById('mainImage');
    const deviceShareButton = document.getElementById('deviceShareButton');
    
    if (navigator.share) {
      deviceShareButton.addEventListener('click', async () => {
        try {
          // Fetch the image as a Blob and create a File object
          const imageUrl = mainPhoto.src;
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
    
          // Use the File object in the share method
          await navigator.share({
            title: pageTitle,
            text: `Celebrate the life of ${pageName}!`,
            url: pageURL,
            files: [file], // Share the image file
          });
    
          console.log("Shared successfully!");
        } catch (error) {
          console.error('Error sharing:', error);
        }
      });
    } else {
      deviceShareButton.style.display = 'none'; // Hide the button if the Web Share API is not supported
    }