import _ from 'lodash';

import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";


function component() {
    const element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCVuuc5YbrfXAZjWvsn4QdQhIZbZE4qCUk",
    authDomain: "messaging-app-ec447.firebaseapp.com",
    projectId: "messaging-app-ec447",
    storageBucket: "messaging-app-ec447.appspot.com",
    messagingSenderId: "224531710446",
    appId: "1:224531710446:web:b86ad3a7f85c2f7403ceff",
    measurementId: "G-FYLYLMMNHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
getRedirectResult(auth).then(function(result) {
    console.log(result)
    if (!result) {
        // User not logged in, start login.
        signInWithRedirect(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user)
                    // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    } else {
        // user logged in, go to home page.
        document.write("logged in!");
    }
}).catch(function(error) {
    // Handle Errors here.
    console.log(error)
        // ...
});