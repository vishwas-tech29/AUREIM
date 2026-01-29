# 🔧 Admin Dashboard Guide - AUREIM

## 🚪 **How to Access Admin Dashboard**

### Method 1: Logo Click (Recommended)
1. Go to your AUREIM website homepage
2. **Click the "AUREIM" logo 5 times quickly**
3. Admin dashboard opens automatically
4. You'll see a toast message: "Admin dashboard accessed"

### Method 2: URL Parameter
- Add `?admin=true` to your website URL
- Example: `https://yoursite.com?admin=true`

---

## 📊 **Dashboard Overview**

The admin dashboard shows:
- **Total Orders** count
- **Total Revenue** in ₹
- **Total Customers** (unique)
- **Average Order Value**

---

## 🛠️ **Available Actions**

### 🔔 **Order Notifications** (Gold Button)
- **Purpose**: Real-time order monitoring
- **Features**:
  - Shows all recent orders
  - Auto-refreshes every 15 seconds
  - New order alerts
  - Order details popup
- **Best for**: Monitoring incoming orders

### 📱 **Test WhatsApp** (Green Button)
- **Purpose**: Test the automated WhatsApp system
- **What it does**:
  - Takes your latest order
  - Sends it to WhatsApp automatically
  - Opens WhatsApp Web with formatted message
- **Requirements**: Must have at least one order
- **Best for**: Testing WhatsApp automation

### 🛒 **Orders Dashboard** (Gray Button)
- **Purpose**: Complete order management
- **Features**:
  - View all orders in detail
  - Customer information
  - Order status tracking
  - Individual order actions
- **Best for**: Managing existing orders

### 📥 **Export Excel** (Gray Button)
- **Purpose**: Download order data
- **What you get**:
  - Complete Excel file with all orders
  - Customer details, items, totals
  - Formatted for easy reading
- **Best for**: Record keeping, accounting

### 📤 **Share Orders** (Gray Button)
- **Purpose**: Access orders on other devices
- **How it works**:
  - Creates a shareable URL
  - URL contains encrypted order data
  - Copy and open on any device
- **Best for**: Multi-device access

### 📤 **Export JSON** (Gray Button)
- **Purpose**: Technical data export
- **What you get**:
  - Raw JSON data file
  - All order information
  - For developers/integrations
- **Best for**: Data backup, integrations

---

## 🧪 **Testing Features**

### If No Orders Exist:
- **"Add Test Orders"** button appears
- Click to add sample orders for testing
- Useful for development and testing

### If Orders Exist:
- **"Clear All Data"** button appears (red)
- ⚠️ **WARNING**: This permanently deletes all orders
- Use only for testing/development

---

## 📱 **WhatsApp Testing Process**

1. **Access admin dashboard** (click logo 5 times)
2. **Click "Test WhatsApp"** (green button)
3. **System checks** for available orders
4. **If orders exist**:
   - Takes the latest order
   - Formats it for WhatsApp
   - Opens WhatsApp Web automatically
   - Message is pre-filled and ready to send
5. **If no orders**:
   - Shows error message
   - Click "Add Test Orders" first
   - Then try "Test WhatsApp" again

---

## 🔍 **Order Details**

Each order shows:
- **Order ID**: Unique identifier
- **Customer**: Name, phone, email
- **Address**: Complete delivery address
- **Items**: Products ordered with quantities
- **Total**: Final amount paid
- **Timestamp**: When order was placed

---

## 🚨 **Troubleshooting**

### Can't Access Dashboard:
- Make sure you're clicking the logo 5 times quickly
- Try refreshing the page first
- Check browser console for errors

### WhatsApp Test Not Working:
- Ensure you have orders (add test orders if needed)
- Check if popup blockers are enabled
- Look at browser console for error messages
- Try different browser (Chrome/Edge work best)

### No Orders Showing:
- Orders are stored in browser localStorage
- Clear browser data will remove orders
- Use "Add Test Orders" to create sample data
- Real orders appear after customers complete checkout

---

## 📊 **Order Statistics**

The dashboard calculates:
- **Total Orders**: Count of all completed orders
- **Total Revenue**: Sum of all order totals
- **Total Customers**: Unique customers (by email)
- **Average Order Value**: Revenue ÷ Orders

---

## 🔐 **Security Notes**

- Admin access is browser-based (localStorage)
- No server-side authentication required
- Orders are stored locally in browser
- Clear browser data = lose order history
- Export data regularly for backup

---

## 📱 **Mobile Access**

The admin dashboard works on mobile:
- Responsive design
- Touch-friendly buttons
- WhatsApp integration works on mobile
- All features available

---

## 🎯 **Best Practices**

1. **Regular Monitoring**: Check dashboard daily for new orders
2. **Test WhatsApp**: Test monthly to ensure automation works
3. **Export Data**: Weekly Excel exports for backup
4. **Clear Test Data**: Remove test orders before going live
5. **Browser Bookmarks**: Bookmark the admin access method

---

## 🆘 **Emergency Access**

If dashboard is not accessible:
- Check browser console (F12) for errors
- Try incognito/private browsing mode
- Clear browser cache and cookies
- Use different browser
- Check if JavaScript is enabled

---

*Last updated: January 2026*
*AUREIM Premium Chocolates - Admin Dashboard Guide* 🍫