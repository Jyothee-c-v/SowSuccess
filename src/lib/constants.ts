
export const PROGRAMS = [
  { id: "self-development", name: "Self-Development & Success Blueprint", price: 3999 },
  { id: "organic-farming", name: "Organic Farming & Sustainability", price: 3999 },
  { id: "supermind-kids", name: "SuperMind for Kids: Focus | Memory | Inner Strength", price: 3999 },
] as const;

export const STANDARD_PAYMENT_AMOUNT = 1800;

export const STEPS = [
  { id: "referral", title: "Referral Code" },
  { id: "program", title: "Select Program" },
  { id: "info", title: "Your Information" },
  { id: "payment", title: "Confirm Payment" },
  { id: "complete", title: "Registration Complete" },
] as const;
