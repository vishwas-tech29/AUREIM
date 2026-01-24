// Validation utility functions

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation (Indian format)
export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

// PIN code validation (All Hyderabad area PIN codes)
export const validatePinCode = (pinCode) => {
  const pinRegex = /^\d{6}$/;
  if (!pinRegex.test(pinCode)) {
    return false;
  }
  
  // Complete Hyderabad PIN codes range
  const pinNumber = parseInt(pinCode);
  
  // Main Hyderabad PIN codes: 500001-500099
  // Extended Hyderabad and surrounding areas: 501101-501511, 502001-502329, 503001-503307, 504001-504309, 505001-505417
  return (
    (pinNumber >= 500001 && pinNumber <= 500099) ||  // Central Hyderabad
    (pinNumber >= 501101 && pinNumber <= 501511) ||  // Rangareddy district
    (pinNumber >= 502001 && pinNumber <= 502329) ||  // Medak district  
    (pinNumber >= 503001 && pinNumber <= 503307) ||  // Nizamabad district
    (pinNumber >= 504001 && pinNumber <= 504309) ||  // Adilabad district
    (pinNumber >= 505001 && pinNumber <= 505417)     // Karimnagar district
  );
};

// Card number validation (Luhn algorithm)
export const validateCardNumber = (cardNumber) => {
  const cleanNumber = cardNumber.replace(/\s+/g, '');
  
  if (!/^\d{13,19}$/.test(cleanNumber)) {
    return false;
  }
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

// CVV validation
export const validateCVV = (cvv) => {
  const cvvRegex = /^\d{3,4}$/;
  return cvvRegex.test(cvv);
};

// Expiry date validation
export const validateExpiryDate = (month, year) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  
  const expMonth = parseInt(month);
  const expYear = parseInt(year);
  
  if (expMonth < 1 || expMonth > 12) {
    return false;
  }
  
  if (expYear < currentYear) {
    return false;
  }
  
  if (expYear === currentYear && expMonth < currentMonth) {
    return false;
  }
  
  return true;
};

// UPI ID validation
export const validateUPI = (upiId) => {
  const upiRegex = /^[a-zA-Z0-9._]+@[a-zA-Z]+$/;
  return upiRegex.test(upiId);
};

// Name validation (letters and spaces only)
export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name) && name.trim().length >= 2;
};

// Required field validation
export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

// Form validation for shipping information
export const validateShippingForm = (formData) => {
  const errors = {};
  
  if (!validateRequired(formData.fullName)) {
    errors.fullName = 'Full name is required';
  } else if (!validateName(formData.fullName)) {
    errors.fullName = 'Please enter a valid name';
  }
  
  if (!validateRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!validateRequired(formData.phone)) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }
  
  if (!validateRequired(formData.addressLine1)) {
    errors.addressLine1 = 'Address is required';
  }
  
  if (!validateRequired(formData.city)) {
    errors.city = 'City is required';
  }
  
  if (!validateRequired(formData.state)) {
    errors.state = 'State is required';
  }
  
  if (!validateRequired(formData.pinCode)) {
    errors.pinCode = 'PIN code is required';
  } else if (!validatePinCode(formData.pinCode)) {
    errors.pinCode = 'We currently deliver in Greater Hyderabad area only (PIN codes: 500001-500099, 501101-501511, 502001-502329, 503001-503307, 504001-504309, 505001-505417)';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Form validation for card payment
export const validateCardForm = (formData) => {
  const errors = {};
  
  if (!validateRequired(formData.cardNumber)) {
    errors.cardNumber = 'Card number is required';
  } else if (!validateCardNumber(formData.cardNumber)) {
    errors.cardNumber = 'Please enter a valid card number';
  }
  
  if (!validateRequired(formData.cardholderName)) {
    errors.cardholderName = 'Cardholder name is required';
  } else if (!validateName(formData.cardholderName)) {
    errors.cardholderName = 'Please enter a valid name';
  }
  
  if (!validateRequired(formData.expiryMonth) || !validateRequired(formData.expiryYear)) {
    errors.expiry = 'Expiry date is required';
  } else if (!validateExpiryDate(formData.expiryMonth, formData.expiryYear)) {
    errors.expiry = 'Please enter a valid future date';
  }
  
  if (!validateRequired(formData.cvv)) {
    errors.cvv = 'CVV is required';
  } else if (!validateCVV(formData.cvv)) {
    errors.cvv = 'Please enter a valid CVV';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Form validation for UPI payment
export const validateUPIForm = (formData) => {
  const errors = {};
  
  if (!validateRequired(formData.upiId)) {
    errors.upiId = 'UPI ID is required';
  } else if (!validateUPI(formData.upiId)) {
    errors.upiId = 'Please enter a valid UPI ID (e.g., username@upi)';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Format card number with spaces
export const formatCardNumber = (value) => {
  const cleanValue = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = cleanValue.match(/\d{4,16}/g);
  const match = matches && matches[0] || '';
  const parts = [];
  
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  
  if (parts.length) {
    return parts.join(' ');
  } else {
    return cleanValue;
  }
};

// Detect card type
export const detectCardType = (cardNumber) => {
  const cleanNumber = cardNumber.replace(/\s+/g, '');
  
  if (/^4/.test(cleanNumber)) {
    return 'visa';
  } else if (/^5[1-5]/.test(cleanNumber) || /^2[2-7]/.test(cleanNumber)) {
    return 'mastercard';
  } else if (/^6/.test(cleanNumber)) {
    return 'rupay';
  } else if (/^3[47]/.test(cleanNumber)) {
    return 'amex';
  }
  
  return 'unknown';
};

// Indian states list
export const indianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];