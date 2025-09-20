import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../../shared/ui/input';
import Header from '../../shared/component';

const Payment = () => {
  const navigate = useNavigate();
  const bookingData = JSON.parse(localStorage.getItem('bookingData') || '{}');

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePaymentSuccess = () => {
    navigate('/payment-success', { state: { bookingData } });
  };

  const handlePaymentFail = () => {
    navigate('/payment-fail', { state: { bookingData } });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header pageTitle="Payment" />

      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 text-center">Payment Details</h2>
          <div className="text-sm space-y-1">
            <p><strong>Operator:</strong> {bookingData?.operatorName}</p>
            <p><strong>Route:</strong> {bookingData?.route}</p>
            <p><strong>Time:</strong> {bookingData?.time}</p>
            <p><strong>Seat No:</strong> {bookingData?.selectedSeats?.join(', ')}</p>
            <p><strong>Total:</strong> ₹{bookingData?.totalAmount}</p>
          </div>

          <InputBox
            id="cardno"
            name="cardno"
            type="text"
            label="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e?.target?.value)}
            placeholder="Card Number"
          />

          <InputBox
            id="cardname"
            name="cardname"
            type="text"
            label="Cardholder Name"
            placeholder="Name on Card"
            value={cardName}
            onChange={(e) => setCardName(e?.target?.value)}
            className="w-full p-2 border rounded-md"
          />
          <div className="flex gap-2">
            <InputBox
              id="expiry"
              name="expiry"
              type="text"
              label="Expiry Date"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e?.target?.value)}
              className="w-1/2 p-2 border rounded-md"
            />
            <InputBox
              id="cvv"
              name="cvv"
              label="CVV"
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e?.target?.value)}
              className="w-1/2 p-2 border rounded-md"
            />
          </div>

          <div className="space-y-3 mt-4">
            <button
              onClick={handlePaymentFail}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-md font-medium transition-colors"
            >
              Fail Payment
            </button>
            <button
              onClick={handlePaymentSuccess}
              className="w-full bg-success-500 hover:bg-success-600 text-white py-3 px-4 rounded-md font-medium transition-colors"
            >
              Success Payment
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Payment;
