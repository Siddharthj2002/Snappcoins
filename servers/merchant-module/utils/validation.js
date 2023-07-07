const { check } =  require('express-validator');

const firstname = check("firstName","First Name is required").not().isEmpty();
const lastname = check("lastName","Last Name is required").not().isEmpty();
const password = check("password","Password minimum len 4 and max 15 is required").isLength({
  min:4,
  max:15
})
const email = check("email","Enter a valid email..").isEmail()
const phone = check("phoneNumber","give valid phone number").isMobilePhone()
const address = check("address","Give address...").not().isEmpty()

const RegisterValidations = [firstname,lastname,password,email,phone,address]
const AuthenticateValidations =[email,password]

module.exports = {
  RegisterValidations,
  AuthenticateValidations
}