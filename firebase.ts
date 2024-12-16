import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEUfFto49OyAiJMTnQQcY7vrzssZ-Nbbs",
  authDomain: "wasabi-couryer.firebaseapp.com",
  projectId: "wasabi-couryer",
  storageBucket: "wasabi-couryer.firebasestorage.app",
  messagingSenderId: "396364991763",
  appId: "1:396364991763:web:cd14f33eb23850ce7f5ee6",
  measurementId: "G-CBRVC7C9G7"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
