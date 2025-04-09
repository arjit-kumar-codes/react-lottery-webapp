import { useState, useEffect } from 'react';
import { getUserTickets } from '../services/api';
import { logOut } from '../services/auth';
import { showToast } from '../services/toast';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchUserTickets();
  }, []);

  const fetchUserTickets = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const userTickets = await getUserTickets(userId);
        setTickets(userTickets);
      }
    } catch (error) {
      showToast('Failed to fetch tickets', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem('userId');
      window.location.href = '/';
    } catch (error) {
      showToast('Failed to log out', 'error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col space-y-8 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-purple-600">My Dashboard</h1>
            <p className="text-gray-600">Welcome back!</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium">U</div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 px-4 py-3 text-center font-medium ${activeTab === 0 ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
              onClick={() => setActiveTab(0)}
            >
              My Tickets
            </button>
            <button
              className={`flex-1 px-4 py-3 text-center font-medium ${activeTab === 1 ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
              onClick={() => setActiveTab(1)}
            >
              Winning History
            </button>
            <button
              className={`flex-1 px-4 py-3 text-center font-medium ${activeTab === 2 ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
              onClick={() => setActiveTab(2)}
            >
              Account
            </button>
          </div>

          <div className="p-6">
            {activeTab === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map((ticket) => (
                  <div
                    key={ticket._id}
                    className="p-6 bg-white rounded-lg border border-gray-200 hover:transform hover:-translate-y-1 transition-all duration-200 shadow-sm"
                  >
                    <div className="flex flex-col space-y-4">
                      <span className="inline-flex px-3 py-1 text-purple-700 bg-purple-100 rounded-full text-sm font-medium">
                        #{ticket.number}
                      </span>
                      <p className="text-sm text-gray-600">
                        Purchased: {new Date(ticket.purchaseDate).toLocaleDateString()}
                      </p>
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${ticket.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                      >
                        {ticket.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 1 && (
              <div className="text-gray-600">No winning history yet.</div>
            )}

            {activeTab === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Account Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-md">
                    <p className="font-medium">User ID</p>
                    <p className="text-gray-600 mt-1">{localStorage.getItem('userId')}</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-md">
                    <p className="font-medium">Total Tickets</p>
                    <p className="text-gray-600 mt-1">{tickets.length}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;