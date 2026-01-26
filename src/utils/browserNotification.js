// Browser notification utility for order alerts

export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications")
    return false
  }

  if (Notification.permission === "granted") {
    return true
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission()
    return permission === "granted"
  }

  return false
}

export const sendBrowserNotification = (orderData) => {
  if (!("Notification" in window)) {
    return { success: false, message: "Browser notifications not supported" }
  }

  if (Notification.permission !== "granted") {
    return { success: false, message: "Notification permission not granted" }
  }

  try {
    const notification = new Notification("🍫 AUREIM - New Order!", {
      body: `Order ${orderData.orderId} from ${orderData.customerInfo.fullName} - ₹${orderData.totals.total}`,
      icon: "/favicon.svg",
      badge: "/favicon.svg",
      tag: `order-${orderData.orderId}`,
      requireInteraction: true,
      actions: [
        {
          action: "view",
          title: "View Order"
        }
      ]
    })

    notification.onclick = () => {
      window.focus()
      notification.close()
    }

    // Auto close after 10 seconds
    setTimeout(() => {
      notification.close()
    }, 10000)

    return { success: true, message: "Browser notification sent" }
  } catch (error) {
    console.error("Failed to send browser notification:", error)
    return { success: false, message: "Failed to send browser notification" }
  }
}

export const initializeNotifications = () => {
  // Request permission when the app loads
  if ("Notification" in window && Notification.permission === "default") {
    requestNotificationPermission()
  }
}

export default {
  requestNotificationPermission,
  sendBrowserNotification,
  initializeNotifications
}