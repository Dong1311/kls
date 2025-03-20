// src/firebaseConfig.js
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDpcB4Kq1u3JHJ1x9A83pRDAlK3O0cKQ5o',
  authDomain: 'soakls.firebaseapp.com',
  projectId: 'soakls',
  storageBucket: 'soakls.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
}

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig)

// Khởi tạo Firebase Storage
const storage = getStorage(app)

export { storage }
