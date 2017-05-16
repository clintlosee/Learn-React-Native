const admin = require('firebase-admin');
var functions = require('firebase-functions');
var createUser = require('./create_user');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-81201.firebaseio.com"
});

exports.createuser = functions.https.onRequest(createUser);
