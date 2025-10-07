// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue, set, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// 🔥 Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const countRef = ref(db, "hateISRT/count");
const button = document.getElementById("hateButton");
const countDisplay = document.getElementById("count");

// Listen for real-time count updates
onValue(countRef, (snapshot) => {
  const value = snapshot.val() || 0;
  countDisplay.textContent = value;
});

// Increase count on click
button.addEventListener("click", async () => {
  const snapshot = await get(countRef);
  const current = snapshot.val() || 0;
  set(countRef, current + 1);
});
