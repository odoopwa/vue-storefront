// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/6.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.1.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  messagingSenderId: "947618845905",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = 'Background Message Title';
  var notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
// [END background_handler]

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken().then((currentToken) => {
  if (currentToken) {
    console.log('currentToken: ' + currentToken);
    var http = new XMLHttpRequest();
    var url = "https://cloud.wisconsinjeans.com/api/notifications/suscribe";
    var token = currentToken;
    //http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.open("POST", url, true);

    http.onreadystatechange = function() {
        console.log(http);
        if(http.readyState == 4 && http.status == 200) { 
           console.log(http.responseText);
        }
    }
    var body = JSON.stringify({token: token});
    console.log(body);
    http.send(body);
  } else {
    // Show permission request.
    console.log('No Instance ID token available. Request permission to generate one.');
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
});
