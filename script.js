// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue, get, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// (Optional)
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrRp80dv5fGF24-ZuDr6Xqhw7oSvX4bn8",
  authDomain: "isrt-hate-counter.firebaseapp.com",
  databaseURL: "https://isrt-hate-counter-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "isrt-hate-counter",
  storageBucket: "isrt-hate-counter.firebasestorage.app",
  messagingSenderId: "907099929959",
  appId: "1:907099929959:web:bdc867d7bbfed6936cc3c2",
  measurementId: "G-VB5B5YG1JH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// const analytics = getAnalytics(app); // optional

// HTML elements
const button = document.getElementById("hateButton");
const countDisplay = document.getElementById("count");

// Database reference
const countRef = ref(db, "hateISRT/count");

// Realtime listener — update display when value changes
onValue(countRef, (snapshot) => {
  const value = snapshot.val() || 0;
  countDisplay.textContent = value;
});

// Increment counter on button click
button.addEventListener("click", async () => {
  try {
    const snapshot = await get(countRef);
    const current = snapshot.val() || 0;
    await set(countRef, current + 1);
  } catch (error) {
    console.error("Error updating counter:", error);
  }
});
