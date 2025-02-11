const ValidateForm = (formData, setErrors) => {
  let tempErrors = {};
  let isValid = true;

  // Username validation

  if (formData.username.length < 3) {
    tempErrors.username = "Username must be at least 3 characters";
    isValid = false;
  }

  // Email validation
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(formData.email)) {
    tempErrors.email = "Please enter a valid email address";
    isValid = false;
  }

  // Password validation
  if (formData.password.length < 6) {
    tempErrors.password = "Password must be at least 6 characters";
    isValid = false;
  }

  if (formData.password !== formData.confirmPassword) {
    tempErrors.confirmPassword = "Passwords do not match";
    isValid = false;
  }

  if (formData.title) {
    tempErrors.title = "Please enter a title";
    isValid = false;
  }
  if (formData.description) {
    tempErrors.description = "Please enter description";
    isValid = false;
  }

  setErrors(tempErrors);
  return isValid;
};
export default ValidateForm;
