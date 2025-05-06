import { isDev } from "./helpers";

export const PricingPlans = [
  {
    name: "Basic",
    price: 9,
    description: "Perfect for occasional use",
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    id: "basic",
    paymentLink: isDev ? 'https://buy.stripe.com/test_5kA4gIbSu9mw1P2bII' : '',
    priceId: isDev ? "price_1RIWq1RVPAtkYCuiGzIau99W" : '',
  },
  {
    name: "Pro",
    price: 19,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    id: "pro",
    paymentLink: isDev ? 'https://buy.stripe.com/test_9AQ6oQaOqeGQ51ecMN' : '',
    priceId: isDev ? "price_1RIWq1RVPAtkYCuiwaudBxzm" : '',
  },
];

export const containerVariants = {
  hidden: { opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,   
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 15,
      duration: 0.8,
      delay: 0.2,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
}
