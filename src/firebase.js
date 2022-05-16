import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCr810AGsHHPS5hUwIx_EEi3cYPo7DQh1c",
  authDomain: "form-with-img-test.firebaseapp.com",
  databaseURL: "https://form-with-img-test-default-rtdb.firebaseio.com",
  projectId: "form-with-img-test",
  storageBucket: "form-with-img-test.appspot.com",
  messagingSenderId: "397094863242",
  appId: "1:397094863242:web:15c8a83575bc2010d6c873"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app);
// const firestore = app.firestore();

// const database = {
//   users: firestore.collection('users')
// };
// export const auth = app.auth();
// export{ database }