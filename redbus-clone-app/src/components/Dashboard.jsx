import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Search, Star, Clock } from 'lucide-react';

import bgImage from '../assets/images/bg.webp';

import BusSearchService from '../services/busSearch';
import { useAuth } from '../contexts/AuthContext';
import { setLoading, setSearchParams, searchBuses } from '../actions/bus';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector(state => state.bus);

  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [travelDate, setTravelDate] = useState('');

  const handleLogout = () => {
    localStorage?.removeItem('searchResults');
    localStorage?.removeItem('searchParams');
    logout();
  };

  const handleSearch = async () => {
    if (!fromCity || !toCity) {
      alert('Please select both departure and destination cities');
      return;
    }

    const searchData = {
      from: fromCity,
      to: toCity,
      date: travelDate
    };

    console.log('searchData :>> ', searchData);
    dispatch(setLoading(true));
    dispatch(setSearchParams(searchData));

    try {
      const results = await BusSearchService?.searchBuses(searchData);
      dispatch(searchBuses(results));
      
      localStorage?.setItem('searchResults', JSON?.stringify(results));
      localStorage?.setItem('searchParams', JSON?.stringify(searchData));
      
      navigate('/buslist');
    } catch (error) {
      console.error('Search error:', error);
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">R</span>
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">RedBus</h1>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-red-600 font-medium">My Bookings</a>
              </nav>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-700">
                  Welcome, <span className="font-medium">{user?.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className="relative bg-cover bg-center h-[500px] flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="From"
                    value={fromCity}
                    onChange={(e) => setFromCity(e?.target?.value)}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="To"
                    value={toCity}
                    onChange={(e) => setToCity(e?.target?.value)}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e?.target?.value)}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      <span>Search Buses</span>
                    </>
                  )}
                </button>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Save up to Rs.250 on Delhi & North India</h3>
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg inline-block font-bold text-lg">
                RB250
              </div>
              <p className="text-gray-600 text-sm mt-2">Valid on select routes</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Save up to Rs.300 on first bookings</h3>
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg inline-block font-bold text-lg">
                FIRST
              </div>
              <p className="text-gray-600 text-sm mt-2">For new users only</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Save up to Rs.750 on bus tickets</h3>
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg inline-block font-bold text-lg">
                GROUPDEAL
              </div>
              <p className="text-gray-600 text-sm mt-2">Group bookings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;