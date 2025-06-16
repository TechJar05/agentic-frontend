import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-blue-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome to Agentic</h1>
        <Link to="/login">
          <button className="bg-teal-700 text-white px-6 py-3 rounded-lg mr-4">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-teal-700 text-white px-6 py-3 rounded-lg ml-4">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
