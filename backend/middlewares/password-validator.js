const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(25) // Maximum length 25
    .has()
    .uppercase(1) // Must have 1 uppercase letter
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .symbols(1) //Must have at least a symbol (@%*$^!:;,?~&#"{|-\_=")
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password", "12345678", "azerty123"]); // Blacklist these values

module.exports = (req, res, next) => {
    let password = req.body.user_password;
    try {
        if (passwordSchema.validate(password)) {
            next(); //Validé
        } else {
            console.log(
                "ERROR while attempting to sign up → password: " +
                password +
                " format is invalid!"
            );

            throw (
                "The password isn't strong enough, list of criterias that weren't respected: " +
                passwordSchema.validate("password", { list: true })
            ); //Pas assez fort
        }
    } catch (passwordValidationError) {
        console.log(passwordValidationError);
        res.status(400).json({
            message: "Error while attempting to verify the password: " +
                passwordValidationError,
        });
    }
};