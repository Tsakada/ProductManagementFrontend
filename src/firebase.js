import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage , uploadString} from "firebase/storage";

// For deployment
// const firebaseConfig = {
//   apiKey: "AIzaSyADf8fL6vnq8wrQD_OyWcQjDs3u_ilKqXM",
//   authDomain: "school-employee-record.firebaseapp.com",
//   projectId: "school-employee-record",
//   storageBucket: "school-employee-record.appspot.com",
//   messagingSenderId: "976392423004",
//   appId: "1:976392423004:web:59c44ac3f917abb97c0899"
// };

// For Development
const firebaseConfig = {
  apiKey: "AIzaSyAXe8U1HmLWxUes9iwkVe_faAUKAfIIaPY",
  authDomain: "employee-record-fordev.firebaseapp.com",
  projectId: "employee-record-fordev",
  storageBucket: "employee-record-fordev.appspot.com",
  messagingSenderId: "382394051202",
  appId: "1:382394051202:web:629a461f6a25236e8ca29b",
  measurementId: "G-BVGH0H1MRG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage();
// Initialize Firebase Authentication and get a reference to the service
export default app;
