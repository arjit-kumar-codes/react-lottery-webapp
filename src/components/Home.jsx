import { Link as RouterLink } from 'react-router-dom';
const Home = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 tracking-tight">
          Restaurant Lottery
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
          Win exciting prizes and exclusive dining experiences!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <RouterLink
            to="/buy-ticket"
            className="w-full sm:w-auto px-8 py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-md shadow-md font-medium transition-colors duration-200"
          >
            Buy Ticket
          </RouterLink>
          <RouterLink
            to="/login"
            className="w-full sm:w-auto px-8 py-3 text-purple-600 border-2 border-purple-600 hover:bg-purple-50 rounded-md font-medium transition-colors duration-200"
          >
            Sign In
          </RouterLink>
        </div>
      </div>
    </div>
  );
};

export default Home;