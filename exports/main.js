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




document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    body.style.opacity = 0;
    body.style.transition = "opacity 2s ease-in-out";
    body.style.opacity = 1;
    console.log('Loading...');
  });
  


const DEBUG = false;

let loadCount = 0;
let totalFileSize = 0; // To accumulate the file size of scripts
let pageStartTime = performance.now(); // Start tracking page load time
const loadedScripts = new Set();
const currentPath = window.location.pathname;



function logExecutionTime(scriptName, startTime, fileSize) {
    if (DEBUG) {
        const endTime = performance.now();
        const executionTime = endTime - startTime;
        console.log(
            `${scriptName} initialized. Execution Time: ${executionTime.toFixed(2)} ms. File Size: ${fileSize}. Load Count: ${loadCount++}`
        );
    }

    // Add the file size to the total
    if (fileSize !== "unknown" && fileSize !== "not available") {
        totalFileSize += parseFloat(fileSize);
    }

    // Log the total page size and time when all scripts are loaded
    if (loadCount === "end") {
        const pageEndTime = performance.now();
        const pageLoadTime = (pageEndTime - pageStartTime) / 1000; // in seconds
        console.log(`Total Page Load Time: ${pageLoadTime.toFixed(2)} seconds.`);
        console.log(`Total Page Size: ${totalFileSize.toFixed(2)} KB.`);
    }
}

async function loadScript(src, { async = false, defer = false, type = 'text/javascript' } = {}, callback) {
    if (loadedScripts.has(src)) {
        console.log(`Script already loaded: ${src}`);
        if (callback) callback();
        return;
    }

    const startTime = performance.now();

    let fileSize = "unknown";
    try {
        const response = await fetch(src, { method: 'HEAD' });
        if (response.ok) {
            fileSize = response.headers.get('Content-Length');
            if (fileSize) {
                fileSize = `${(fileSize / 1024).toFixed(2)} KB`; // Convert to KB
            } else {
                fileSize = "not available";
            }
        } else {
            console.warn(`Unable to fetch file size for: ${src}`);
        }
    } catch (error) {
        console.error(`Error fetching file size for ${src}:`, error);
    }

    const script = document.createElement('script');
    script.src = src;
    script.type = type; // Set type to 'module' for ES6 modules
    script.async = async;
    script.defer = defer;
    script.onload = () => {
        loadedScripts.add(src);
        logExecutionTime(src, startTime, fileSize);
        if (callback) callback();
    };
    script.onerror = () => {
        console.error(`Error loading script: ${src}`);
    };

    document.head.appendChild(script);
}

// Wait until a specific DOM element exists
function waitForElement(selector, callback) {
    if (document.querySelector(selector)) {
        callback();
    } else {
        const observer = new MutationObserver((mutations, obs) => {
            if (document.querySelector(selector)) {
                obs.disconnect();
                callback();
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }
}

// Function to load stylesheets
function loadStylesheet(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
}


// Load Main CSS
loadStylesheet("https://contenthub.guru/exports/default.css");

// Load Bootstrap CSS
loadStylesheet("https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css");

// Load FontAwesome CSS
loadStylesheet("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");



function loadPageScripts() {

/*

loadScript('https://reelcareer.co/obituaries/setup/interactions.js', { async: true, type: 'module' }, () => {
    logExecutionTime('interactions', performance.now());
});




loadScript('https://reelcareer.co/obituaries/setup/footer.js', { defer: true }, () => {
    logExecutionTime('footer', performance.now());
});



loadScript('https://reelcareer.co/obituaries/setup/analytics.js', { defer: true, type: 'module' }, () => {
    logExecutionTime('analytics', performance.now());
});
*/

}

// Initialize page scripts after DOMContentLoaded
document.addEventListener('DOMContentLoaded', loadPageScripts);












    const mainPhoto = document.getElementById('mainImage');
    const deviceShareButton = document.getElementById('deviceShareButton');
    const pageTitle = document.getElementById('pageTitle').textContent;
    const pageURL = document.getElementById('pageURL').textContent;
    const pageDescription = document.getElementById('pageDescription').textContent;
    
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
            text: pageDescription,
            url:  pageURL,
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

  const pageTitle = document.title; // Get page title
  const lastReferrer = document.referrer || "Direct"; // Get referral website
  const userDevice = navigator.userAgent; // Get user device info

  const timestamp =  new Date();

  let isUnique = false;
  if (!visitorSnap.exists()) {
    isUnique = true; // first time today
    await setDoc(visitorRef, {
      pageID,
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,

      currentPath,
      userDevice,
      totalPageViews: increment(1), // Increment page views
      lastPageViewed: timestamp, // Update last viewed date
      pageViewed: arrayUnion({ title: pageTitle, time: timestamp }), // Add new page to array
      [`pageViewCount.${pageTitle}`]: increment(1), // Increment specific page count
      lastReferral: lastReferrer, // Update referral website

      timestamp
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

