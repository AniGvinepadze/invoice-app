interface BillType {
  name: string;
  billingCycle: string;
  billingDay: number;
  amount: number;
  icon: any;
  category?: string;
  isPaid: boolean;
}

const bills: BillType[] = [
  {
    name: 'Spark Electric Solutions',
    billingCycle: 'Monthly',
    billingDay: 2,
    amount: 100.0,
    icon: '⚡️',
    category: 'Utilities',
    isPaid: false,
  },
  {
    name: 'Serenity Spa & Wellness',
    billingCycle: 'Monthly',
    billingDay: 3,
    amount: 30.0,
    icon: '🧖‍♀️',
    category: 'Health & Wellness',
    isPaid: true,
  },
  {
    name: 'Elevate Education',
    billingCycle: 'Monthly',
    billingDay: 4,
    amount: 50.0,
    icon: '📚',
    category: 'Education',
    isPaid: false,
  },
  {
    name: 'Pixel Playground',
    billingCycle: 'Monthly',
    billingDay: 11,
    amount: 10.0,
    icon: '🎮',
    category: 'Entertainment',
    isPaid: true,
  },
  {
    name: 'Nimbus Data Storage',
    billingCycle: 'Monthly',
    billingDay: 21,
    amount: 9.99,
    icon: '☁️',
    category: 'Technology',
    isPaid: false,
  },
  {
    name: 'ByteWise',
    billingCycle: 'Monthly',
    billingDay: 23,
    amount: 49.99,
    icon: '💻',
    category: 'Technology',
    isPaid: true,
  },
  {
    name: 'EcoFuel Energy',
    billingCycle: 'Monthly',
    billingDay: 29,
    amount: 35.0,
    icon: '🌱',
    category: 'Utilities',
    isPaid: false,
  },
  {
    name: 'Aqua Flow Utilities',
    billingCycle: 'Monthly',
    billingDay: 30,
    amount: 100.0,
    icon: '💧',
    category: 'Utilities',
    isPaid: true,
  },
];

export default bills;
export type { BillType };
