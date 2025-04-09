import { useState } from 'react';
import { generateWinningNumbers } from '../services/api';
import { showToast } from '../services/toast';

const AdminPanel = () => {
  const [winningNumbers, setWinningNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const handleGenerateNumbers = async () => {
    try {
      setLoading(true);
      const result = await generateWinningNumbers();
      setWinningNumbers(result.numbers);
      showToast('The winning numbers have been sent to the WhatsApp group.', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col space-y-8">
        <h1 className="text-3xl font-bold text-purple-600">
          Admin Panel
        </h1>

        <div className="bg-purple-50 p-6 rounded-lg shadow-sm">
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold">Generate Winning Numbers</h2>
            <p className="text-gray-600">Click the button below to generate 5 winning numbers for this Sunday's lottery.</p>
            <button
              className={`px-6 py-3 text-white bg-purple-600 rounded-md shadow-sm font-medium transition-colors duration-200 ${(winningNumbers.length > 0 || loading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
              onClick={handleGenerateNumbers}
              disabled={winningNumbers.length > 0 || loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Numbers
                </span>
              ) : 'Generate Numbers'}
            </button>

            {winningNumbers.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-4">This Week's Winning Numbers:</h3>
                <div className="flex flex-wrap gap-4">
                  {winningNumbers.map((number) => (
                    <span
                      key={number}
                      className="px-4 py-2 bg-green-100 text-green-800 text-xl font-semibold rounded-md"
                    >
                      #{number.toString().padStart(3, '0')}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold">Recent Ticket Sales</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tickets.map((ticket) => (
                    <tr key={ticket.number} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{ticket.number}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(ticket.purchaseDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {ticket.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;