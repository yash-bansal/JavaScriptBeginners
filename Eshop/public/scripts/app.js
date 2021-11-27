
document.addEventListener('DOMContentLoaded', function () {
    const firebaseConfig = {
        apiKey: "AIzaSyBIyKCc9AFLqwFToRnWyKDsJCnFQpemo40",
        authDomain: "fir-demo-8866d.firebaseapp.com",
        databaseURL: "https://fir-demo-8866d-default-rtdb.firebaseio.com",
        projectId: "fir-demo-8866d",
        storageBucket: "fir-demo-8866d.appspot.com",
        messagingSenderId: "753746298043",
        appId: "1:753746298043:web:2651162230621b2ebf159e",
        measurementId: "G-VNHB6SP1BS"
    };
    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
});
function loginWithGoogle() {
    const userNameElement = document.querySelector('#userName');

    const provider = new firebase.auth.GoogleAuthProvider();  //A

    firebase.auth().signInWithPopup(provider) //B
        .then(function (result) {
            const user = result.user;
            console.log(user);
            userNameElement.innerHTML = user.displayName;
        })
        .catch(function (error) {
            console.error(error);
        });
}
