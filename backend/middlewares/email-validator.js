const emailValidator = require("validator");

module.exports = (req, res, next) => {
    let email = req.body.user_email;
    try {
        if (emailValidator.isEmail(email)) {
            console.log(
                "The email " +
                email +
                " is correct, boolean value: " +
                emailValidator.isEmail(email)
            );
            next(); //Validé
        } else {
            console.log(
                "ERROR while attempting to sign up → email: " +
                email +
                " format is invalid!"
            );
            throw (
                "The email is incorrect, boolean value for the verification of the email: " +
                emailValidator.isEmail(email)
            ); //Email incorrect
        }
    } catch (emailValidationError) {
        console.log(emailValidationError);
        res.status(400).json({
            emailValidationError: "Email validation has failed, email format 'nickname@domain.extension' not respected",
        });
    }
};