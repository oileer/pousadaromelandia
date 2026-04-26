import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  projectId:         "studio-991593794-3e1d5",
  appId:             "1:618041523398:web:2e4e4a0a23f2dd815debc7",
  apiKey:            "AIzaSyCXFi29BNXbzlngeYbODP2-NYB2omZTz7I",
  authDomain:        "studio-991593794-3e1d5.firebaseapp.com",
  messagingSenderId: "618041523398",
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
export const db = getFirestore(app)
