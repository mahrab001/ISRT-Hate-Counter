// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

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
