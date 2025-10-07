// script.js

// 1. Import the necessary functions for a web module
// Ensure you are importing the specific functions from the database SDK,
// NOT the generic 'firebase/app' or 'firebase/analytics' paths.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue, set, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// 2. Your web app's Firebase configuration (pasted from your console)
const firebaseConfig = {
  // NOTE: I've included the full databaseURL you provided, which specifies a region:
  databaseURL: "https://isrt-hate-counter-default-rtdb.asia-southeast1.firebasedatabase.app",
  
  // The rest of your configuration:
  apiKey: "AIzaSyBrRp80dv5fGF24-ZuDr6Xqhw7oSvX4bn8",
  authDomain: "isrt-hate-counter.firebaseapp.com",
  projectId: "isrt-hate-counter",
  storageBucket: "isrt-hate-counter.firebasestorage.app",
  messagingSenderId: "907099929959",
  appId: "1:907099929959:web:bdc867d7bbfed6936cc3c2",
  // measurementId is optional and can be omitted if you are not using Analytics
  measurementId: "G-VB5B5YG1JH" 
};

// 3. Initialize Firebase and Database Service
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 4. Define References and HTML Elements
const countRef = ref(db, "hateISRT/count"); // The path you want to update
const button = document.getElementById("hateButton");
const countDisplay = document.getElementById("count");

// 5. Real-time Listener (READ operation)
// This keeps the counter updated instantly for all users.
onValue(countRef, (snapshot) => {
  // If the path exists, use its value; otherwise, start at 0.
  const value = snapshot.val() || 0;
  countDisplay.textContent = value;
});

// 6. Button Click Handler (WRITE operation)
// This handles the increment logic using async/await for reliable updates.
button.addEventListener("click", async () => {
  try {
    // A. Get the current value from the database
    const snapshot = await get(countRef);
    const current = snapshot.val() || 0;

    // B. Increment the value and write it back to the database
    // Note: A database TRANSACTION is technically safer for counters
    // in high-traffic scenarios, but this simple GET/SET works fine for low traffic.
    await set(countRef, current + 1);
    
    // Optional: Add a visual feedback/cooldown if needed

  } catch (error) {
    console.error("Error updating counter. Check Firebase Rules:", error);
