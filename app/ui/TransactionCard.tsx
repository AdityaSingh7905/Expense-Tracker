interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
}

interface TransactionCardProps {
  transaction: Transaction;
  setTransaction: (transaction: Transaction | null) => void;
  onConfirm: (id: string) => void;
}
const TransactionCard = ({
  transaction,
  setTransaction,
  onConfirm,
}: TransactionCardProps) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-xl font-bold mb-4">Are you sure?</h3>
          <p className="text-gray-700 mb-6">
            Do you really want to delete the transaction "
            <b>{transaction.description}</b>"?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setTransaction(null)}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(transaction.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionCard;
