export const ROUTES = {
  // Client/User Routes
  LANDING: "/",
  USER_ONBOARDING: "/onboarding",
  HAIR_PREFS: "/hair-preferences",
  SCHEDULING: "/scheduling",
  RECOMMENDED_PROS: "/recommended",
  CONFIRM_BOOKING: "/booking/confirm",
  SUCCESS: "/booking/success",
  EXPLORE: "/explore",
  DASHBOARD: "/dashboard",
  TRANSFORMATION: "/explore/transformation",

  // Professional Routes
  PRO_SIGNUP: "/pro/signup",
  PRO_SOCIALS: "/pro/socials",
  PRO_SERVICES: "/pro/services",
  PRO_AVAILABILITY: "/pro/availability",
  PRO_PORTFOLIO: "/pro/portfolio",
  PRO_PREVIEW: "/pro/preview",
  PRO_PROFILE: "/pro/profile",
  PRO_DASHBOARD: "/pro/dashboard",

  // Additional Professional Routes
  PRO_ANALYTICS: "/pro/analytics",
  PRO_MESSAGES: "/pro/messages",
  PRO_BOOKINGS: "/pro/bookings",
  PRO_SETTINGS: "/pro/settings",
} as const;

// Type for route keys
export type RouteKey = keyof typeof ROUTES;

// Type for route values
export type RoutePath = typeof ROUTES[RouteKey];