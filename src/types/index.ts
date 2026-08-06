export interface Bundle {
  id: string;
  provider: 'Safaricom' | 'Airtel';
  title: string;
  dataAmount: string; // e.g., "10 GB", "300 Mins", "KSh 500 Airtime", "1000 SMS"
  price: number;
  validity: string;
  category: 'Bulk' | 'Minutes' | 'Airtime' | 'SMS' | 'Hourly' | 'Daily' | 'Weekly' | 'Monthly';
  okoaFriendly: boolean;
  popular?: boolean;
}