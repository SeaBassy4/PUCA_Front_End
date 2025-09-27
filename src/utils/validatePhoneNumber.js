export const validatePhoneNumber = (phoneNumber) => {
  if (phoneNumber === "") {
    return true;
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return false;
  }

  return true;
};
