import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const bookingData = location?.state?.bookingData;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header pageTitle="Payment Successful" />

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
