// Coupon management system for AUREIM

export const coupons = {
  'AUREIM10': {
    code: 'AUREIM10',
    description: 'Register with AUREIM - 10% Discount',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 0,
    maxUses: null,
    expiryDate: null,
    active: true
  }
};

// Validate coupon code
export const validateCoupon = (code, subtotal) => {
  const coupon = coupons[code.toUpperCase()];
  
  if (!coupon) {
    return {
      valid: false,
      message: 'Invalid coupon code',
      discount: 0
    };
  }
  
  if (!coupon.active) {
    return {
      valid: false,
      message: 'This coupon is no longer active',
      discount: 0
    };
  }
  
  if (coupon.expiryDate && new Date() > new Date(coupon.expiryDate)) {
    return {
      valid: false,
      message: 'This coupon has expired',
      discount: 0
    };
  }
  
  if (subtotal < coupon.minOrderAmount) {
    return {
      valid: false,
      message: `Minimum order amount of ₹${coupon.minOrderAmount} required`,
      discount: 0
    };
  }
  
  return {
    valid: true,
    message: `Coupon applied successfully! ${coupon.description}`,
    discount: calculateDiscount(subtotal, coupon),
    coupon: coupon
  };
};

// Calculate discount amount
export const calculateDiscount = (subtotal, coupon) => {
  if (coupon.discountType === 'percentage') {
    return Math.round((subtotal * coupon.discountValue) / 100 * 100) / 100;
  } else if (coupon.discountType === 'fixed') {
    return Math.min(coupon.discountValue, subtotal);
  }
  return 0;
};

// Get coupon details
export const getCouponDetails = (code) => {
  return coupons[code.toUpperCase()] || null;
};

// List all active coupons
export const getActiveCoupons = () => {
  return Object.values(coupons).filter(coupon => coupon.active);
};

// Format coupon display
export const formatCouponDisplay = (coupon) => {
  if (coupon.discountType === 'percentage') {
    return `${coupon.discountValue}% OFF`;
  } else if (coupon.discountType === 'fixed') {
    return `₹${coupon.discountValue} OFF`;
  }
  return 'Special Offer';
};
