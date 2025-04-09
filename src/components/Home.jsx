import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-[320px] mx-auto text-center space-y-8">
        <h1 className="text-xl md:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 tracking-tight">
          Restaurant Sunday Lottery
        </h1>
        <p className="text-[14px] md:text-[16px] text-gray-600 max-w-2xl mx-auto px-2">
          Buy a lottery ticket for just <span className="font-semibold">₹100</span> and stand a chance to win an
          <span className="font-semibold"> unlimited food experience</span> for you and 2 guests at our restaurant —
          every Sunday!
          <br />
          Out of 100 tickets, <span className="font-semibold">5 lucky winners</span> are announced every Sunday.
          <br />
          Winning numbers are revealed in our official <span className="font-semibold">WhatsApp group</span>.
          <br />
          Hurry! Only <span className="font-semibold">100 tickets</span> available each week.
          Purchase your ticket via QR code now!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <RouterLink
            to="/buy-ticket"
            className="w-full sm:w-auto px-4 py-1 text-white bg-purple-600 hover:bg-purple-700 rounded-md shadow-md font-medium transition-colors duration-200"
          >
            Buy Ticket (₹100)
          </RouterLink>
          <RouterLink
            to="/login"
            className="w-full sm:w-auto px-4 py-1 text-purple-600 border-2 border-purple-600 hover:bg-purple-50 rounded-md font-medium transition-colors duration-200"
          >
            Sign In
          </RouterLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
