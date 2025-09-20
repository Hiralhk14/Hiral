import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, MapPin, Clock, Star, Wifi, Zap, Coffee, Eye, ChevronDown, ChevronUp } from 'lucide-react';

import BusSearchService from '../services/busSearch';
import { searchBuses, setSearchParams } from '../actions/bus';

const BusList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchResults, searchParams, totalBuses, isLoading } = useSelector(
    (state) => state.bus
  );

  const [filteredResults, setFilteredResults] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: 'price',
    departureTime: '',
    busType: '',
    priceRange: ''
  });

  useEffect(() => {
    const storedResults = localStorage.getItem('searchResults');
    const storedParams = localStorage.getItem('searchParams');
    
    if (storedResults && storedParams) {
      const results = JSON.parse(storedResults);
      const params = JSON.parse(storedParams);
      
      dispatch(searchBuses(results));
      dispatch(setSearchParams(params));
    } else {
      navigate('/dashboard');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setFilteredResults(searchResults);
    }
  }, [searchResults]);

  const applyFilters = () => {
    const filtered = BusSearchService?.filterBuses(searchResults, filters);
    setFilteredResults(filtered);
  };

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      applyFilters();
    }
  }, [filters, searchResults]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleNewSearch = () => {
    localStorage.removeItem('searchResults');
    localStorage.removeItem('searchParams');
        navigate('/dashboard');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      'Live Tracking': <MapPin className="h-4 w-4" />,
      'A/C': <Zap className="h-4 w-4" />,
      'Sleeper': <Clock className="h-4 w-4" />,
      'Wi-Fi': <Wifi className="h-4 w-4" />,
      'Entertainment': <Coffee className="h-4 w-4" />,
      'Charging Point': <Zap className="h-4 w-4" />,
      'Water Bottle': <Coffee className="h-4 w-4" />,
      'Blanket': <Coffee className="h-4 w-4" />,
      'Reading Light': <Zap className="h-4 w-4" />,
      'Meal': <Coffee className="h-4 w-4" />
    };
    return icons[amenity] || <Coffee className="h-4 w-4" />;
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.0) return 'bg-green-500';
    if (rating >= 3.5) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

const handleViewSeats = (bus) => {
  const params = new URLSearchParams({
    operator: bus?.operatorName,
    route: `${bus.route?.from} - ${bus?.route?.to}`,
    time: `${bus?.departureTime} - ${bus?.arrivalTime}`,
    price: bus?.price?.toString(),
    seats: bus?.seatsAvailable?.toString()
  });
  
  navigate(`/seat-selection/${bus?.id}?${params?.toString()}`);
};

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Searching for buses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleNewSearch}
                className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>

              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">R</span>
                </div>
                <h1 className="ml-3 text-2xl font-bold text-gray-900">RedBus</h1>
              </div>
            </div>

            <div className="text-sm">
              {searchParams?.from} → {searchParams?.to}
              {searchParams?.date && <span className="ml-2">• {formatDate(searchParams.date)}</span>}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-1"
                >
                  <Filter className="h-4 w-4" />
                  {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>

              <div className={`space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <h3 className="text-lg font-semibold hidden lg:block">Filters</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e?.target?.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="price">Price (Low to High)</option>
                    <option value="duration">Duration</option>
                    <option value="rating">Rating</option>
                    <option value="departure">Departure Time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Departure Time</label>
                  <div className="space-y-2">
                    {[
                      { value: '', label: 'Any Time' },
                      { value: 'early', label: '6 AM - 12 PM' },
                      { value: 'mid', label: '12 PM - 6 PM' },
                      { value: 'late', label: '6 PM - 6 AM' }
                    ]?.map(option => (
                      <label key={option?.value} className="flex items-center">
                        <input
                          type="radio"
                          name="departureTime"
                          value={option?.value}
                          checked={filters?.departureTime === option?.value}
                          onChange={(e) => handleFilterChange('departureTime', e?.target?.value)}
                          className="mr-2"
                        />
                        <span className="text-sm">{option?.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bus Type</label>
                  <div className="space-y-2">
                    {[
                      { value: '', label: 'All Types' },
                      { value: 'sleeper', label: 'Sleeper' },
                      { value: 'semi sleeper', label: 'Semi Sleeper' },
                      { value: 'volvo', label: 'Volvo' }
                    ]?.map(option => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="busType"
                          value={option?.value}
                          checked={filters?.busType === option.value}
                          onChange={(e) => handleFilterChange('busType', e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="space-y-2">
                    {[
                      { value: '', label: 'Any Price' },
                      { value: '0-500', label: 'Under ₹500' },
                      { value: '500-1000', label: '₹500 - ₹1000' },
                      { value: '1000-1500', label: '₹1000 - ₹1500' },
                      { value: '1500-2000', label: 'Above ₹1500' }
                    ].map(option => (
                      <label key={option?.value} className="flex items-center">
                        <input
                          type="radio"
                          name="priceRange"
                          value={option?.value}
                          checked={filters?.priceRange === option?.value}
                          onChange={(e) => handleFilterChange('priceRange', e?.target?.value)}
                          className="mr-2"
                        />
                        <span className="text-sm">{option?.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {filteredResults?.length || 0} buses found
                </h2>
                <div className="text-sm text-gray-600">
                  {searchParams?.from} to {searchParams?.to}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {(!filteredResults || filteredResults?.length === 0) ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="text-gray-500 mb-4">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold mb-2">No buses found</h3>
                    <p>Try adjusting your filters or search for a different route.</p>
                  </div>
                  <button
                    onClick={handleNewSearch}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors"
                  >
                    Search Again
                  </button>
                </div>
              ) : (
                filteredResults?.map((bus) => (
                  <div key={bus?.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                        <div className="lg:col-span-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">
                                {bus?.operatorName?.split(' ')[0]?.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{bus?.operatorName}</div>
                              <div className="text-sm text-gray-600">{bus?.busType}</div>
                            </div>
                          </div>
                        </div>

                        <div className="lg:col-span-2 text-center lg:text-left">
                          <div className="text-xl font-bold">{bus?.departureTime}</div>
                          <div className="text-sm text-gray-600">{bus?.route?.from}</div>
                        </div>

                        <div className="lg:col-span-2 text-center">
                          <div className="text-sm text-gray-600">{bus.duration}</div>
                          <div className="flex items-center justify-center my-2">
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                          </div>
                        </div>

                        <div className="lg:col-span-2 text-center lg:text-right">
                          <div className="text-xl font-bold">{bus?.arrivalTime}</div>
                          <div className="text-sm text-gray-600">{bus?.route?.to}</div>
                        </div>

                        <div className="lg:col-span-1 text-center">
                          <div className={`inline-flex items-center px-2 py-1 rounded text-white text-sm ${getRatingColor(bus?.rating)}`}>
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            {bus?.rating}
                          </div>
                        </div>

                        <div className="lg:col-span-2 text-center lg:text-right">
                          <div className="text-sm text-gray-600">Starts from</div>
                          <div className="text-2xl font-bold">₹{bus?.price}</div>
                          <div className="text-sm text-green-600 mb-2">{bus?.seatsAvailable} Seats available</div>
                          <button
                            onClick={() => handleViewSeats(bus)}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>View Seats</span>
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex flex-wrap gap-3">
                          {bus?.amenities?.map((amenity, index) => (
                            <div key={index} className="flex items-center space-x-1 text-sm text-gray-600">
                              {getAmenityIcon(amenity)}
                              <span>{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusList;