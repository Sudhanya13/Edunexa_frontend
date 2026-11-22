export const pricingPlans = {
  starter: {
    name: "Starter Plan",
    price: "$0",
    billing: "/ month",
    badge: "Free Forever",
    description: "Perfect for students and tutors looking to test the platform.",
    features: [
      "Up to 2 tuition posts (Tutor)",
      "Up to 5 tuition bookmarks (Student)",
      "Direct tuition applications",
      "Basic profile & search filters",
    ],
  },
  pro: {
    name: "Edunexa PRO",
    studentPrice: "$10",
    tutorPrice: "$15",
    description:
      "Unlimited reach, verified credentials, and priority matching.",
    features: [
      "Unlimited tuition posts & bookmarks",
      "Golden PRO verification badge",
      "Priority listing in search & category filters",
      "Priority applicant notifications & reviews",
    ],
  },
};

export const pricingPlansByRole = {
  tutor: {
    starter: {
      name: "Free Tutor",
      price: "$0",
      billing: "/ month",
      badge: "Free Forever",
      description:
        "Essential tools to create your tutor profile and publish your first tuition posts.",
      features: [
        "Up to 2 tuition posts",
        "Standard tutor profile and bio",
        "Receive student application alerts",
        "Standard support",
      ],
    },
    pro: {
      name: "Pro Tutor",
      price: pricingPlans.pro.tutorPrice,
      billing: "/ month",
      badge: "PRO Badge",
      description:
        "Grow your reach with unlimited tuition posts, verified credentials, and priority visibility.",
      features: [
        "Unlimited tuition posts",
        "Golden PRO verification badge",
        "Priority listing in search and category filters",
        "Priority applicant notifications and reviews",
      ],
    },
  },
  student: {
    starter: {
      name: "Free Student",
      price: "$0",
      billing: "/ month",
      badge: "Free Forever",
      description:
        "Discover tutors and apply to tuition opportunities with the essentials.",
      features: [
        "Up to 5 tuition bookmarks",
        "Direct tuition applications",
        "Basic profile and search filters",
        "Standard support",
      ],
    },
    pro: {
      name: "Pro Student",
      price: pricingPlans.pro.studentPrice,
      billing: "/ month",
      badge: "PRO Badge",
      description:
        "Save more opportunities and get priority support for your learning goals.",
      features: [
        "Unlimited tuition bookmarks",
        "Golden PRO verification badge",
        "Priority listing in search and category filters",
        "Priority support",
      ],
    },
  },
};
