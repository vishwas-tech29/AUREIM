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

// Calculate shipping fee
export const calculateShipping = (subtotal) => {
  return subtotal >= 2000 ? 0 : 150;
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

// Export single order to Excel
export const exportSingleOrder = (orderData) => {
  const wb = createOrdersWorkbook([orderData]);
  const fileName = `AUREIM_Order_${orderData.orderId}.xlsx`;
  XLSX.writeFile(wb, fileName);
  return fileName;
};

// Export all orders to Excel
export const exportAllOrders = (orders) => {
  const wb = createOrdersWorkbook(orders);
  const year = new Date().getFullYear();
  const fileName = `AUREIM_Orders_${year}.xlsx`;
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