
import WalletView from 'src/sections/wallet/wallet-view';
import { getData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';

type WalletResponse = {
  studentId: string;
  balance: number;
  isActive: boolean;
  totalCount: number;
  items: {
    transactionId: string;
    transactionType: 'Credit' | 'Debit';
    amount: number;
    description: string;
    createdAt: string;
  }[];
};

export default async function Page() {
  let data: WalletResponse | null = null;

  try {
    const response = await getData<WalletResponse>(endpoints.wallet.get);
    data = response.data as WalletResponse;
    } catch (error) {
    console.error(error);
  }

  return <WalletView data={data} />;
}