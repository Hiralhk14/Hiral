import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location?.state?.bookingData;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-slate-600 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>

              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">R</span>
                </div>
                <h1 className="ml-3 text-2xl font-bold text-slate-900">RedBus</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Success Card */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold text-success-700 mb-4">Payment Successful!</h2>
          <p className="mb-4 text-slate-700">Your booking is confirmed.</p>

          <div className="text-left mb-4 space-y-2 text-slate-800">
            <p><strong>Operator:</strong> {bookingData?.operatorName}</p>
            <p><strong>Route:</strong> {bookingData?.route}</p>
            <p><strong>Time:</strong> {bookingData?.time}</p>
            <p><strong>Seats:</strong> {bookingData?.selectedSeats?.join(', ')}</p>
            <p><strong>Total Paid:</strong> ₹{bookingData?.totalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
