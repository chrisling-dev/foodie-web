import { UserRole } from "../__generated__/globalTypes";

export const orderStatusMap = {
  Canceled: {
    displayName: "Order Canceled",
    userDescription: "You canceled the order.",
    restaurantAction: null,
    restaurantDescription: "Customer canceled the order.",
    role: UserRole.RegularUser,
    userAction: null,
  },
  Delivered: {
    displayName: "Order Delivered",
    userDescription: "Seller marked the order as delivered.",
    restaurantAction: null,
    restaurantDescription: "You marked the order as delivered.",
    role: UserRole.RegularUser,
    userAction: {
      text: "Received Order",
      intent: "primary",
    },
  },
  In_Route: {
    displayName: "Order is OTW!",
    userDescription: "Your order is OTW to your delivery address!",
    restaurantAction: {
      text: "Mark as Delivered",
      intent: "primary",
    },
    restaurantDescription: "The order is out for delivery.",
    role: UserRole.RestaurantOwner,
    userAction: null,
  },
  Placed: {
    displayName: "Order Placed",
    userDescription: "You placed this order.",
    restaurantAction: {
      text: "Process Order",
      intent: "primary",
    },
    restaurantDescription: "Customer placed a new order!",
    role: UserRole.RestaurantOwner,
    userAction: {
      text: "Cancel Order",
      intent: "danger",
    },
  },
  Processing: {
    displayName: "Processing Order",
    userDescription: "The restaurant started preparing your order.",
    restaurantAction: {
      text: "Send for Delivery",
      intent: "primary",
    },
    restaurantDescription: "Processing customer's order.",
    role: UserRole.RestaurantOwner,
    userAction: null,
  },
  Received: {
    displayName: "Order Received!",
    userDescription: "You marked the order as received!",
    restaurantAction: null,
    restaurantDescription: "Good job! Customer has received the order!",
    role: UserRole.RegularUser,
    userAction: null,
  },
};
