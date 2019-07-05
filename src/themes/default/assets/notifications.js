// app's Firebase project configuration
var firebaseConfig = {
  messagingSenderId: "947618845905",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// [START get_messaging_object]
// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();
// [END get_messaging_object]
// [START set_public_vapid_key]
// Add the public key generated from the console here.
messaging.usePublicVapidKey('BKJ2MQNFiIcajzG-Dykez802LBmkjIpg5Sy1d9sNhPEz7-FnLSVIFx_6_KwlGq4PUwNEk06_RvdmCvqiIIBwrIo');

navigator.serviceWorker.register('/assets/firebase-messaging-sw.js')
  .then((registration) => {
    messaging.useServiceWorker(registration);

    // Request permission and get token.....


    requestPermission();

  });

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
  // ...
});



function requestPermission() {
  console.log('Requesting permission...');
  // [START request_permission]
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // [START_EXCLUDE]
      // In many cases once an app has been granted notification permission,
      // it should update its UI reflecting this.
      // [END_EXCLUDE]
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
  // [END request_permission]
}
