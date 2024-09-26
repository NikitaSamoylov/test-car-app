import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdcR0wzzAjvMmcLfectsaNmOX7A7Y5wZ8",
  authDomain: "car-app-de812.firebaseapp.com",
  projectId: "car-app-de812",
  storageBucket: "car-app-de812.appspot.com",
  messagingSenderId: "488118300516",
  appId: "1:488118300516:web:a0d95b4aeac1d637ac9471",
};

//оставлено для теста

const app = initializeApp(firebaseConfig);
export const ImgStorage = getStorage(app);
