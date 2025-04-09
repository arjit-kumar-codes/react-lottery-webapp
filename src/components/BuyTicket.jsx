import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { createPaymentOrder, purchaseTicket } from '../services/api';
import { showToast } from '../services/toast';

const BuyTicket = () => {
  const [ticketNumber, setTicketNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId] = useState(() => localStorage.getItem('userId') || Math.random().toString(36).substring(7));


  useEffect(() => {
    localStorage.setItem('userId', userId);
  }, [userId]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const order = await createPaymentOrder();

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Restaurant Lottery",
        description: "Lottery Ticket Purchase",
        order_id: order.id,
        handler: async (response) => {
          try {
            const ticket = await purchaseTicket(userId, response.razorpay_payment_id);
            setTicketNumber(ticket.number);
            showToast('Your ticket has been generated successfully.', 'success');
          } catch (error) {
            showToast(error.message, 'error');
          }
        },
        prefill: {
          name: "Restaurant Lottery Player",
        },
        theme: {
          color: "#805AD5",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-600">
          Buy Lottery Ticket
        </h1>
        <div className="w-full max-w-md bg-purple-50 p-6 rounded-lg shadow-md">
          <div className="flex flex-col space-y-4">
            <p className="text-lg font-medium">Ticket Price: ₹100</p>
            <p className="text-sm text-gray-600">
              Remaining Tickets: {Math.floor(Math.random() * 50) + 1}/100
            </p>
            {ticketNumber ? (
              <div className="flex flex-col space-y-4 p-4 bg-white rounded-md shadow-sm">
                <h2 className="text-xl font-semibold text-center">Your Ticket Number:</h2>
                <div className="px-4 py-2 bg-purple-100 text-purple-700 text-2xl font-bold rounded-lg text-center">
                  #{ticketNumber}
                </div>
                <div className="p-4 bg-white flex justify-center">
                  <QRCode
                    value={`Restaurant Lottery Ticket #${ticketNumber}`}
                    size={200}
                  />
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Save this QR code. Winners will be announced every Sunday on our WhatsApp group.
                </p>
              </div>
            ) : (
              <button
                onClick={handlePayment}
                disabled={loading}
                className={`w-full py-3 px-4 text-white bg-purple-600 hover:bg-purple-700 rounded-md shadow-sm font-medium transition-colors duration-200 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Processing Payment...' : 'Purchase Ticket (₹100)'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyTicket;