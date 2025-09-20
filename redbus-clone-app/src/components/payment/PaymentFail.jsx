import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../../shared/component';

const PaymentFail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location?.state?.bookingData;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header pageTitle="Payment Failed" />

      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Failed!</h2>
          <p className="mb-4">Your booking was not completed.</p>

          <div className="text-left mb-4 space-y-2">
            <p><strong>Operator:</strong> {bookingData?.operatorName}</p>
            <p><strong>Route:</strong> {bookingData?.route}</p>
            <p><strong>Time:</strong> {bookingData?.time}</p>
            <p><strong>Seats:</strong> {bookingData?.selectedSeats?.join(', ')}</p>
            <p><strong>Total Amount:</strong> ₹{bookingData?.totalAmount}</p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-md font-semibold transition-colors text-lg"
          >
            Retry Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;
