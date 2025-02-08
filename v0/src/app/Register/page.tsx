"use client";
import { useState } from "react";

const sanitizeInput = (input: any): string => {
  //function for  returing string, receive any type of data
  const inputFilterdTrim = input.trim(); //removing leading and ending whitespace
  const inputFilterd = inputFilterdTrim
    .replace(/&/g, "&amp;") //removing &
    .replace(/</g, "&lt;") //removing <
    .replace(/>/g, "&gt;") //removing >
    .replace(/"/g, "&quot;") //removing "
    .replace(/'/g, "&#039;") //removing '
    .replace(/\\/g, ""); // Removing backslashes
  return inputFilterd;
};

const regEmailTest = (data: any): number => {
  // function for Email keyword validation testing
  let resultTest = 0;

  if (typeof data !== "string") {
    return resultTest; // Invalid, because input is not a string
  }

  // Check if the input is a valid email format
  if (data.includes("@")) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex pattern

    if (emailPattern.test(data)) {
      resultTest = 1; // Valid email
    }
  }

  return resultTest; // 1 if valid, 0 if not valid
};

const regPasswordTest = (data: any): number => {
  // function for Password keyword testing in JavaScript
  let resultTest = 0;

  if (typeof data !== "string") {
    return resultTest; // Invalid, because input is not a string
  }

  // Check if the password is at least 6 characters long
  if (/^.{6,}$/.test(data)) {
    resultTest = 1; // Valid password
  }
  return resultTest; // 1 if valid, 0 if not valid
};

function nameValidator(data: any): number {
  // Ensure the input is a string before performing validation
  let resultTest = 0;

  if (typeof data !== "string") {
    return resultTest; // Invalid, because input is not a string
  }

  // Name validation regex for letters, hyphens, apostrophes, and spaces
  const namePattern = /^[a-zA-Z-' ]*$/;

  if (namePattern.test(data)) {
    resultTest = 1; // Valid name
  }

  return resultTest;
}

const characterLengthValidator = (
  data: any,
  lengthRequired: number
): number => {
  //function for detection of valid number of characters
  let resultTest = 0;

  if (typeof data !== "string") {
    return resultTest; // Invalid, because input is not a string
  }

  // Get the length of the input data
  const lengthName = data.length;

  // Check if the length is less than the required length
  if (lengthName < lengthRequired) {
    resultTest = 1; // Valid
  }

  return resultTest; // 1 if valid, 0 if invalid
};

export default function Register() {
  // State variables for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState(""); // Optional Contact Field

  // Declaring state variables for error messages
  const [generalError, setGeneralError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [contactError, setContactError] = useState(""); // Error for optional contact field

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear all previous error messages
    setGeneralError("");
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setContactError("");

    let allValid = true; // initially, all validation is false

    // Validating email
    const reg_email = sanitizeInput(email); //removing fake/virus input
    if (reg_email === "") {
      //identify null values
      setGeneralError(
        "Please enter all required information in correct format"
      );
      setEmailError("Please enter an email");
      allValid = false;
    } else {
      const reg_email_value = reg_email;
    }
    if (reg_email !== "") {
      // identify validity
      const valid_email_check = regEmailTest(reg_email);
      if (valid_email_check === 0) {
        setGeneralError(
          "Please enter all required information in correct format"
        );
        setEmailError("Please enter valid email address");
        allValid = false;
      }
      const character_allow = characterLengthValidator(reg_email, 45);
      if (character_allow === 0) {
        setGeneralError(
          "Please enter all required information in correct format"
        );
        setEmailError("Too much characters in email address");
        allValid = false;
      }
    }

    // Validating password
    const regPassword = sanitizeInput(password); //removing fake/virus input
    if (regPassword === "") {
      //identify null values
      setGeneralError(
        "Please enter all required information in correct format"
      );
      setPasswordError("Please enter an password");
      allValid = false;
    } else {
      const regPasswordValue = regPassword;
    }
    if (regPassword !== "") {
      // identify validity
      const validPasswordCheck = regPasswordTest(regPassword);
      if (validPasswordCheck === 0) {
        setGeneralError(
          "Please enter all required information in correct format"
        );
        setPasswordError("Please enter valid password address");
        allValid = false;
      }
      const characterAllow = characterLengthValidator(regPassword, 45);
      if (characterAllow === 0) {
        setGeneralError(
          "Please enter all required information in correct format"
        );
        setEmailError("Too much characters in password");
        allValid = false;
      }
    }

    // Validating confirmpassword
    const retypePassword = sanitizeInput(confirmPassword); //removing fake/virus input
    if (retypePassword !== regPassword) {
      // matching both
      setGeneralError(
        "Please enter all required information in correct format"
      );
      setConfirmPasswordError("Boths passwords are not same");
      allValid = false;
    }

    // Validating firstName
    const first_name = sanitizeInput(firstName); //removing fake/virus input
    if (first_name === "") {
      //identify null values
      setGeneralError(
        "Please enter all required information in correct format"
      );
      setFirstNameError("Please enter an First Name");
      allValid = false;
    } else {
      const firstNameValue = first_name;
    }
    if (first_name !== "") {
      // identify validity
      const valid_first_name = nameValidator(first_name);
      if (valid_first_name === 0) {
        setGeneralError(
          "Please enter all required information in correct format"
        );
        setFirstNameError("Please enter valid First Name");
        allValid = false;
      }
      const characterAllow = characterLengthValidator(first_name, 20);
      if (characterAllow === 0) {
        setGeneralError(
          "Please enter all required information in correct format"
        );
        setFirstNameError("Too much characters in First Name");
        allValid = false;
      }
    }

    // Validating lastName
    const last_name = sanitizeInput(lastName); //removing fake/virus input
    if (last_name === "") {
      //identify null values
      setGeneralError(
        "Please enter all required information in correct format"
      );
      setLastNameError("Please enter an Last Name");
      allValid = false;
    } else {
      const lastNameValue = last_name;
    }
    if (last_name !== "") {
      // identify validity
      const valid_last_name = nameValidator(last_name);
      if (valid_last_name === 0) {
        setGeneralError(
          "Please enter all required information in correct format"
        );
        setLastNameError("Please enter valid Last Name");
        allValid = false;
      }
      const characterAllow = characterLengthValidator(last_name, 20);
      if (characterAllow === 0) {
        setGeneralError(
          "Please enter all required information in correct format"
        );
        setLastNameError("Too much characters in Last Name");
        allValid = false;
      }
    }

    // Validating contact
    const contact_number = sanitizeInput(contact); //removing fake/virus input
    if (contact_number !== "") {
      // identify validity
      const characterAllow = characterLengthValidator(contact_number, 20);
      if (characterAllow === 0) {
        setGeneralError(
          "Please enter all required information in correct format"
        );
        setContactError("Too much characters in Contact Number");
        allValid = false;
      }
    }

    if (allValid === true) {
      //bypassing below steps, if any invalidity in above
      alert("Validation passed! Now you can proceed with registration.");
    }
  };

  return (
    <div className="screenMiddleDiv">
      <div className="formDiv">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-center text-2xl font-bold">Create Account</h2>

          {generalError && (
            <p className="text-red-500 text-xs text-center">{generalError}</p>
          )}

          {/* First Name Input */}
          <div>
            <label htmlFor="firstName" className="formLabel">
              First Name
            </label>
            {firstNameError && (
              <p className="text-red-500 text-xs text-center">
                {firstNameError}
              </p>
            )}
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* Last Name Input */}
          <div>
            <label htmlFor="lastName" className="formLabel">
              Last Name
            </label>
            {lastNameError && (
              <p className="text-red-500 text-xs text-center">
                {lastNameError}
              </p>
            )}
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="my-6">
            <label htmlFor="email" className="formLabel">
              Email Address
            </label>
            {emailError && (
              <p className="text-red-500 text-xs text-center">{emailError}</p>
            )}
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="my-6">
            <label htmlFor="password" className="formLabel">
              Password
            </label>
            {passwordError && (
              <p className="text-red-500 text-xs text-center">
                {passwordError}
              </p>
            )}
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="my-6">
            <label htmlFor="confirmPassword" className="formLabel">
              Confirm Password
            </label>
            {confirmPasswordError && (
              <p className="text-red-500 text-xs text-center">
                {confirmPasswordError}
              </p>
            )}
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Optional Contact Input */}
          <div className="my-6">
            <label htmlFor="contact" className="formLabel">
              Contact (Optional)
            </label>
            {contactError && (
              <p className="text-red-500 text-xs text-center">{contactError}</p>
            )}
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <button type="submit" className="formButton">
            Register
          </button>

          <div className="text-center mt-4">
            Already have an account?
            <a href="#">
              <button className="buttonTiny">Login</button>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
