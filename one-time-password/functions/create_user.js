const admin = require('firebase-admin');

module.exports = function(req, res) {
    // Verify there is a phone number
    if (!req.body.phone) {
        return res.status(422).send({ error: 'Bad Input'});
    }

    // Format phone number to remove digits
    const phone = String(req.body.phone).replace(/[^\d]/g, "");

    // Create a new user from the phone number entered
    admin.auth().createUser({ uid: phone })
        .then(user => res.send(user))
        .catch(err => res.status(422).send({ error: err }));

    // Respond back that user was created
    
};