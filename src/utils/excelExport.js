import * as XLSX from 'xlsx';

// Generate unique order ID
export const generateOrderId = () => {
  const year = new Date().getFullYear();
  const timestamp = Date.now().toString().slice(-6);
  return `AUR-${year}-${timestamp}`;
};

// Format currency for display
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
};

// Calculate tax (GST 18% for India)
export const calculateTax = (subtotal) => {
  return Math.round(subtotal * 0.18 * 100) / 100;
};

// Calculate shipping fee (Free shipping for orders above ₹500)
export const calculateShipping = (subtotal) => {
  return subtotal >= 500 ? 0 : 150;
};

// Calculate delivery date (3 working days from order)
export const calculateDeliveryDate = () => {
  const today = new Date();
  let workingDays = 0;
  let currentDate = new Date(today);
  
  // Start from next day
  currentDate.setDate(currentDate.getDate() + 1);
  
  // Count 3 working days (Monday-Friday)
  while (workingDays < 3) {
    const dayOfWeek = currentDate.getDay();
    // 0 = Sunday, 6 = Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      workingDays++;
    }
    if (workingDays < 3) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
  
  return currentDate;
};

// Format delivery date
export const formatDeliveryDate = (date) => {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Format order data for Excel
export const formatOrderForExcel = (orderData) => {
  const {
    orderId,
    customerInfo,
    cartItems,
    paymentInfo,
    totals,
    timestamp
  } = orderData;

  const date = new Date(timestamp);
  const productDetails = cartItems.map(item => 
    `${item.name} (Qty: ${item.quantity}) - ${formatCurrency(item.price * item.quantity)}`
  ).join('; ');

  return {
    'Order ID': orderId,
    'Order Date': date.toLocaleDateString('en-IN'),
    'Order Time': date.toLocaleTimeString('en-IN'),
    'Customer Name': customerInfo.fullName,
    'Email': customerInfo.email,
    'Phone': customerInfo.phone,
    'Shipping Address': `${customerInfo.addressLine1}, ${customerInfo.addressLine2 || ''}, ${customerInfo.landmark || ''}`.replace(/,\s*,/g, ',').replace(/,\s*$/, ''),
    'City': customerInfo.city,
    'State': customerInfo.state,
    'PIN Code': customerInfo.pinCode,
    'Product Details': productDetails,
    'Subtotal (₹)': totals.subtotal,
    'Tax (GST 18%) (₹)': totals.tax,
    'Shipping Fee (₹)': totals.shipping,
    'Total Amount (₹)': totals.total,
    'Payment Method': paymentInfo.method,
    'Payment Status': paymentInfo.status,
    'Transaction ID': paymentInfo.transactionId || 'N/A',
    'Order Status': 'Confirmed',
    'Tracking Number': '',
    'Notes': ''
  };
};

// Create Excel workbook with multiple sheets
export const createOrdersWorkbook = (orders = []) => {
  const wb = XLSX.utils.book_new();

  // Sheet 1: Orders
  const ordersData = orders.map(formatOrderForExcel);
  const ordersWS = XLSX.utils.json_to_sheet(ordersData);
  
  // Set column widths
  const ordersColWidths = [
    { wch: 15 }, // Order ID
    { wch: 12 }, // Order Date
    { wch: 10 }, // Order Time
    { wch: 20 }, // Customer Name
    { wch: 25 }, // Email
    { wch: 15 }, // Phone
    { wch: 40 }, // Shipping Address
    { wch: 15 }, // City
    { wch: 15 }, // State
    { wch: 10 }, // PIN Code
    { wch: 50 }, // Product Details
    { wch: 12 }, // Subtotal
    { wch: 12 }, // Tax
    { wch: 12 }, // Shipping
    { wch: 12 }, // Total
    { wch: 15 }, // Payment Method
    { wch: 15 }, // Payment Status
    { wch: 20 }, // Transaction ID
    { wch: 15 }, // Order Status
    { wch: 20 }, // Tracking Number
    { wch: 30 }  // Notes
  ];
  ordersWS['!cols'] = ordersColWidths;

  XLSX.utils.book_append_sheet(wb, ordersWS, 'Orders');

  // Sheet 2: Customer Database
  const customersData = generateCustomerSummary(orders);
  const customersWS = XLSX.utils.json_to_sheet(customersData);
  const customersColWidths = [
    { wch: 15 }, // Customer ID
    { wch: 20 }, // Full Name
    { wch: 25 }, // Email
    { wch: 15 }, // Phone
    { wch: 12 }, // Total Orders
    { wch: 15 }, // Total Spent
    { wch: 12 }, // First Order Date
    { wch: 12 }, // Last Order Date
    { wch: 30 }  // Preferred Address
  ];
  customersWS['!cols'] = customersColWidths;
  XLSX.utils.book_append_sheet(wb, customersWS, 'Customer Database');

  // Sheet 3: Product Sales
  const productSalesData = generateProductSales(orders);
  const productSalesWS = XLSX.utils.json_to_sheet(productSalesData);
  const productSalesColWidths = [
    { wch: 10 }, // Product ID
    { wch: 25 }, // Product Name
    { wch: 15 }, // Quantity Sold
    { wch: 15 }, // Revenue Generated
    { wch: 15 }, // Last Ordered Date
    { wch: 15 }  // Stock Status
  ];
  productSalesWS['!cols'] = productSalesColWidths;
  XLSX.utils.book_append_sheet(wb, productSalesWS, 'Product Sales');

  return wb;
};

// Generate customer summary data
const generateCustomerSummary = (orders) => {
  const customerMap = new Map();

  orders.forEach(order => {
    const email = order.customerInfo.email;
    if (customerMap.has(email)) {
      const customer = customerMap.get(email);
      customer.totalOrders += 1;
      customer.totalSpent += order.totals.total;
      customer.lastOrderDate = new Date(Math.max(
        new Date(customer.lastOrderDate),
        new Date(order.timestamp)
      ));
    } else {
      customerMap.set(email, {
        'Customer ID': `CUST-${customerMap.size + 1}`,
        'Full Name': order.customerInfo.fullName,
        'Email': email,
        'Phone': order.customerInfo.phone,
        'Total Orders': 1,
        'Total Spent (₹)': order.totals.total,
        'First Order Date': new Date(order.timestamp).toLocaleDateString('en-IN'),
        'Last Order Date': new Date(order.timestamp).toLocaleDateString('en-IN'),
        'Preferred Address': `${order.customerInfo.city}, ${order.customerInfo.state}`
      });
    }
  });

  return Array.from(customerMap.values());
};

// Generate product sales summary
const generateProductSales = (orders) => {
  const productMap = new Map();

  orders.forEach(order => {
    order.cartItems.forEach(item => {
      if (productMap.has(item.id)) {
        const product = productMap.get(item.id);
        product.quantitySold += item.quantity;
        product.revenue += item.price * item.quantity;
        product.lastOrderedDate = new Date(Math.max(
          new Date(product.lastOrderedDate),
          new Date(order.timestamp)
        ));
      } else {
        productMap.set(item.id, {
          'Product ID': item.id,
          'Product Name': item.name,
          'Quantity Sold': item.quantity,
          'Revenue Generated (₹)': item.price * item.quantity,
          'Last Ordered Date': new Date(order.timestamp).toLocaleDateString('en-IN'),
          'Stock Status': 'In Stock'
        });
      }
    });
  });

  return Array.from(productMap.values());
};

// Export single order to Excel with packing sheet format
export const exportSingleOrder = (orderData) => {
  const wb = XLSX.utils.book_new();

  // Sheet 1: Order Packing Sheet (Main sheet for fulfillment)
  const packingData = createPackingSheet(orderData);
  const packingWS = XLSX.utils.json_to_sheet(packingData);
  
  // Set column widths for packing sheet
  const packingColWidths = [
    { wch: 20 }, // Field
    { wch: 50 }  // Details
  ];
  packingWS['!cols'] = packingColWidths;
  
  // Add title row
  XLSX.utils.sheet_add_aoa(packingWS, [['AUREIM CHOCOLATE - ORDER PACKING SHEET']], { origin: 'A1' });
  XLSX.utils.sheet_add_aoa(packingWS, [['Order ID:', orderData.orderId]], { origin: 'A2' });
  XLSX.utils.sheet_add_aoa(packingWS, [['Date:', new Date(orderData.timestamp).toLocaleDateString('en-IN')]], { origin: 'A3' });
  XLSX.utils.sheet_add_aoa(packingWS, [['Time:', new Date(orderData.timestamp).toLocaleTimeString('en-IN')]], { origin: 'A4' });
  XLSX.utils.sheet_add_aoa(packingWS, [[''], ['']], { origin: 'A5' }); // Empty rows
  
  XLSX.utils.book_append_sheet(wb, packingWS, 'Packing Sheet');

  // Sheet 2: Customer Details
  const customerData = createCustomerDetailsSheet(orderData);
  const customerWS = XLSX.utils.json_to_sheet(customerData);
  const customerColWidths = [
    { wch: 20 }, // Field
    { wch: 50 }  // Details
  ];
  customerWS['!cols'] = customerColWidths;
  XLSX.utils.book_append_sheet(wb, customerWS, 'Customer Details');

  // Sheet 3: Products to Pack
  const productsData = createProductsPackingSheet(orderData);
  const productsWS = XLSX.utils.json_to_sheet(productsData);
  const productsColWidths = [
    { wch: 15 }, // Product ID
    { wch: 30 }, // Product Name
    { wch: 10 }, // Quantity
    { wch: 15 }, // Unit Price
    { wch: 15 }, // Total Price
    { wch: 20 }, // Special Notes
    { wch: 15 }  // Packed (Checkbox)
  ];
  productsWS['!cols'] = productsColWidths;
  XLSX.utils.book_append_sheet(wb, productsWS, 'Products to Pack');

  const fileName = `AUREIM_PackingSheet_${orderData.orderId}.xlsx`;
  XLSX.writeFile(wb, fileName);
  return fileName;
};

// Create packing sheet data
const createPackingSheet = (orderData) => {
  const { customerInfo, cartItems, totals, paymentInfo } = orderData;
  
  return [
    { 'PACKING INFORMATION': '', 'DETAILS': '' },
    { 'PACKING INFORMATION': 'Customer Name', 'DETAILS': customerInfo.fullName },
    { 'PACKING INFORMATION': 'Phone Number', 'DETAILS': customerInfo.phone },
    { 'PACKING INFORMATION': 'Email', 'DETAILS': customerInfo.email },
    { 'PACKING INFORMATION': '', 'DETAILS': '' },
    { 'PACKING INFORMATION': 'SHIPPING ADDRESS', 'DETAILS': '' },
    { 'PACKING INFORMATION': 'Address Line 1', 'DETAILS': customerInfo.addressLine1 },
    { 'PACKING INFORMATION': 'Address Line 2', 'DETAILS': customerInfo.addressLine2 || 'N/A' },
    { 'PACKING INFORMATION': 'Landmark', 'DETAILS': customerInfo.landmark || 'N/A' },
    { 'PACKING INFORMATION': 'City', 'DETAILS': customerInfo.city },
    { 'PACKING INFORMATION': 'State', 'DETAILS': customerInfo.state },
    { 'PACKING INFORMATION': 'PIN Code', 'DETAILS': customerInfo.pinCode },
    { 'PACKING INFORMATION': '', 'DETAILS': '' },
    { 'PACKING INFORMATION': 'ORDER SUMMARY', 'DETAILS': '' },
    { 'PACKING INFORMATION': 'Total Items', 'DETAILS': cartItems.reduce((sum, item) => sum + item.quantity, 0) },
    { 'PACKING INFORMATION': 'Total Amount', 'DETAILS': formatCurrency(totals.total) },
    { 'PACKING INFORMATION': 'Payment Method', 'DETAILS': paymentInfo.method },
    { 'PACKING INFORMATION': 'Payment Status', 'DETAILS': paymentInfo.status },
    { 'PACKING INFORMATION': '', 'DETAILS': '' },
    { 'PACKING INFORMATION': 'PACKING CHECKLIST', 'DETAILS': '' },
    { 'PACKING INFORMATION': '☐ Products Packed', 'DETAILS': 'Check when all items are packed' },
    { 'PACKING INFORMATION': '☐ Invoice Included', 'DETAILS': 'Include printed invoice' },
    { 'PACKING INFORMATION': '☐ Thank You Note', 'DETAILS': 'Include AUREIM thank you card' },
    { 'PACKING INFORMATION': '☐ Fragile Packaging', 'DETAILS': 'Use bubble wrap for chocolates' },
    { 'PACKING INFORMATION': '☐ Address Label', 'DETAILS': 'Shipping label attached' },
    { 'PACKING INFORMATION': '☐ Quality Check', 'DETAILS': 'Final quality inspection done' },
    { 'PACKING INFORMATION': '', 'DETAILS': '' },
    { 'PACKING INFORMATION': 'SPECIAL INSTRUCTIONS', 'DETAILS': '' },
    { 'PACKING INFORMATION': 'Temperature Control', 'DETAILS': 'Keep chocolates cool during packing' },
    { 'PACKING INFORMATION': 'Handling', 'DETAILS': 'Handle with care - luxury products' },
    { 'PACKING INFORMATION': 'Branding', 'DETAILS': 'Ensure AUREIM branding is visible' }
  ];
};

// Create customer details sheet
const createCustomerDetailsSheet = (orderData) => {
  const { customerInfo } = orderData;
  
  return [
    { 'Field': 'Full Name', 'Value': customerInfo.fullName },
    { 'Field': 'Email Address', 'Value': customerInfo.email },
    { 'Field': 'Phone Number', 'Value': customerInfo.phone },
    { 'Field': 'Address Line 1', 'Value': customerInfo.addressLine1 },
    { 'Field': 'Address Line 2', 'Value': customerInfo.addressLine2 || '' },
    { 'Field': 'Landmark', 'Value': customerInfo.landmark || '' },
    { 'Field': 'City', 'Value': customerInfo.city },
    { 'Field': 'State', 'Value': customerInfo.state },
    { 'Field': 'PIN Code', 'Value': customerInfo.pinCode },
    { 'Field': 'Full Address', 'Value': `${customerInfo.addressLine1}, ${customerInfo.addressLine2 || ''}, ${customerInfo.landmark || ''}, ${customerInfo.city}, ${customerInfo.state} - ${customerInfo.pinCode}`.replace(/,\s*,/g, ',').replace(/,\s*$/, '') }
  ];
};

// Create products packing sheet
const createProductsPackingSheet = (orderData) => {
  const { cartItems } = orderData;
  
  return cartItems.map(item => ({
    'Product ID': item.id,
    'Product Name': item.name,
    'Description': item.description,
    'Quantity': item.quantity,
    'Unit Price': formatCurrency(item.price),
    'Total Price': formatCurrency(item.price * item.quantity),
    'Special Notes': getPackingNotes(item),
    'Packed ☐': '☐ Done'
  }));
};

// Get special packing notes for products
const getPackingNotes = (item) => {
  const notes = [];
  
  if (item.name.includes('Truffle')) {
    notes.push('Handle with extra care - delicate');
  }
  if (item.name.includes('Collection') || item.name.includes('Gift')) {
    notes.push('Use premium gift packaging');
  }
  if (item.percentage && item.percentage >= 85) {
    notes.push('High cocoa content - fragile');
  }
  if (item.quantity > 3) {
    notes.push('Bulk order - use larger box');
  }
  
  return notes.length > 0 ? notes.join('; ') : 'Standard packaging';
};

// Export all orders to Excel with enhanced packing management
export const exportAllOrders = (orders) => {
  const wb = createOrdersWorkbook(orders);
  
  // Add a packing status sheet
  const packingStatusData = orders.map(order => ({
    'Order ID': order.orderId,
    'Order Date': new Date(order.timestamp).toLocaleDateString('en-IN'),
    'Customer Name': order.customerInfo.fullName,
    'Phone': order.customerInfo.phone,
    'City': order.customerInfo.city,
    'Total Items': order.cartItems.reduce((sum, item) => sum + item.quantity, 0),
    'Total Amount': formatCurrency(order.totals.total),
    'Payment Status': order.paymentInfo.status,
    'Packing Status': '☐ Pending',
    'Shipped Status': '☐ Pending',
    'Tracking Number': '',
    'Delivery Date': '',
    'Notes': ''
  }));
  
  const packingStatusWS = XLSX.utils.json_to_sheet(packingStatusData);
  const packingStatusColWidths = [
    { wch: 15 }, // Order ID
    { wch: 12 }, // Order Date
    { wch: 20 }, // Customer Name
    { wch: 15 }, // Phone
    { wch: 15 }, // City
    { wch: 12 }, // Total Items
    { wch: 15 }, // Total Amount
    { wch: 15 }, // Payment Status
    { wch: 15 }, // Packing Status
    { wch: 15 }, // Shipped Status
    { wch: 20 }, // Tracking Number
    { wch: 12 }, // Delivery Date
    { wch: 30 }  // Notes
  ];
  packingStatusWS['!cols'] = packingStatusColWidths;
  XLSX.utils.book_append_sheet(wb, packingStatusWS, 'Packing Status');
  
  const year = new Date().getFullYear();
  const fileName = `AUREIM_OrderManagement_${year}.xlsx`;
  XLSX.writeFile(wb, fileName);
  return fileName;
};

// Export orders by date range
export const exportOrdersByDateRange = (orders, startDate, endDate) => {
  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.timestamp);
    return orderDate >= startDate && orderDate <= endDate;
  });
  
  const wb = createOrdersWorkbook(filteredOrders);
  const fileName = `AUREIM_Orders_${startDate.toISOString().split('T')[0]}_to_${endDate.toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
  return fileName;
};

// Save order to localStorage (for demo purposes)
export const saveOrderToStorage = (orderData) => {
  try {
    const existingOrders = JSON.parse(localStorage.getItem('aureim_orders') || '[]');
    existingOrders.push(orderData);
    localStorage.setItem('aureim_orders', JSON.stringify(existingOrders));
    return true;
  } catch (error) {
    console.error('Error saving order to storage:', error);
    return false;
  }
};

// Get all orders from localStorage
export const getOrdersFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('aureim_orders') || '[]');
  } catch (error) {
    console.error('Error retrieving orders from storage:', error);
    return [];
  }
};