import { useState, useEffect } from 'react';
import { getUserTickets } from '../services/api';
import { logOut } from '../services/auth';
import { showToast } from '../services/toast';
import { Popover } from '@headlessui/react';
import { UserCircle } from 'lucide-react';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

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
      console.error("Error:", error);
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
      console.error("Error:", error);
      showToast('Failed to log out', 'error');
    }
  };
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Header */}
        <div className="flex justify-between gap-4 text-center sm:text-left">
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-purple-600">My Dashboard</h1>
            <p className="text-gray-600">Welcome back!</p>
            </div>

          <Popover className="relative">
            <Popover.Button className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
              <UserCircle className="w-6 h-6" />
            </Popover.Button>

            <Popover.Panel className="absolute z-10 right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="flex flex-col text-sm text-gray-700">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 hover:bg-gray-100 text-left"
              >
                Logout
              </button>
              </div>
            </Popover.Panel>
          </Popover>
        </div>

        {/* Tabs */}
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 flex items-center justify-center">
          <ul className="flex flex-nowrap sm:flex-wrap -mb-px justify-start sm:justify-start space-x-4 sm:space-x-0">
            {['My Tickets', 'Winning', 'Account'].map((label, index) => (
              <li key={label}>
                <button
                  onClick={() => setActiveTab(index)}
                  className={`inline-block whitespace-nowrap px-4 py-2 border-b-2 rounded-t-lg transition-all duration-200 ${activeTab === index
                      ? 'text-purple-600 border-purple-600'
                      : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'
                    }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 w-full">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {activeTab === 0 && (
                <div>
                  {tickets.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">No tickets found.</div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                              className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${ticket.status === 'active'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-700'
                                }`}
                            >
                              {ticket.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 1 && (
                <div className="text-gray-500 text-center py-6">No winning history yet.</div>
              )}

              {activeTab === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">Account Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-4 border border-gray-200 rounded-md">
                      <p className="font-medium">User ID</p>
                      <p className="text-gray-600 mt-1 break-all">{localStorage.getItem('userId')}</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-md">
                      <p className="font-medium">Total Tickets</p>
                      <p className="text-gray-600 mt-1">{tickets.length}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
