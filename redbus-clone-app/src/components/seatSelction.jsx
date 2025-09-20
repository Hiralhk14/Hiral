import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../shared/component';

const SeatSelection = () => {
  const navigate = useNavigate();
  const { busId } = useParams();
  const [searchParams] = useSearchParams();

  const operatorName = searchParams.get('operator') || 'Bus Operator';
  const route = searchParams.get('route') || 'City - City';
  const time = searchParams.get('time') || '00:00 - 00:00';
  const price = parseInt(searchParams.get('price')) || 1000;
  const totalSeats = parseInt(searchParams.get('seats')) || 40;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatLayout, setSeatLayout] = useState([]);

  useEffect(() => {
    const generateSeatLayout = () => {
      const layout = [];
      const totalSeatsInBus = 24;
      const availableSeatsCount = Math?.min(totalSeats, totalSeatsInBus);

      // Randomly mark which seats are booked
      const bookedSeatsCount = totalSeatsInBus - availableSeatsCount;
      const bookedSeats = [];
      while (bookedSeats?.length < bookedSeatsCount) {
        const seatNum = Math?.floor(Math?.random() * totalSeatsInBus) + 1;
        if (!bookedSeats?.includes(seatNum)) bookedSeats?.push(seatNum);
      }

      for (let i = 1; i <= totalSeatsInBus; i++) {
        layout.push({
          seatNumber: i,
          isAvailable: !bookedSeats?.includes(i),
          isSelected: false,
          isBooked: bookedSeats?.includes(i),
          position: getSeatPosition(i)
        });
      }

      return layout;
    };

    setSeatLayout(generateSeatLayout());
  }, [totalSeats]);

  const getSeatPosition = (seatNumber) => {
    const row = Math?.ceil(seatNumber / 4);
    const position = ((seatNumber - 1) % 4) + 1;
    return { row, position };
  };

  const handleSeatSelect = (seatNumber) => {
    setSeatLayout(prev => prev?.map(seat => {
      if (seat?.seatNumber === seatNumber && seat?.isAvailable) {
        const newSelected = !seat?.isSelected;

        if (newSelected) {
          if (selectedSeats?.length < 6) {
            setSelectedSeats(prev => [...prev, seatNumber]);
            return { ...seat, isSelected: true };
          }
        } else {
          setSelectedSeats(prev => prev?.filter(s => s !== seatNumber));
          return { ...seat, isSelected: false };
        }
      }
      return seat;
    }));
  };

  const clearSelection = () => {
    setSelectedSeats([]);
    setSeatLayout(prev => prev?.map(seat => ({ ...seat, isSelected: false })));
  };

  const handleProceedToPayment = () => {
    if (selectedSeats?.length > 0) {
      const bookingData = {
        busId,
        operatorName,
        route,
        time,
        selectedSeats,
        totalAmount: selectedSeats?.length * price,
        seats: selectedSeats?.length
      };
      localStorage?.setItem('bookingData', JSON?.stringify(bookingData));
      navigate('/payment');
    }
  };

  const renderSeatRow = (rowSeats) => {
    return (
      <div className="flex items-center justify-center space-x-2 mb-2">
        <div className="flex space-x-1">
          {rowSeats?.slice(0, 2)?.map(seat => (
            <button
              key={seat?.seatNumber}
              onClick={() => handleSeatSelect(seat?.seatNumber)}
              disabled={seat?.isBooked}
              className={`
                w-8 h-8 text-xs font-bold rounded transition-all duration-200 border-2
                ${seat?.isBooked
                  ? 'bg-slate-400 text-white border-slate-400 cursor-not-allowed'
                  : seat?.isSelected
                    ? 'bg-red-500 text-white border-red-500 shadow-md'
                    : 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500 hover:border-blue-600'
                }
              `}
            >
              {seat?.seatNumber}
            </button>
          ))}
        </div>

        <div className="w-6 h-8 flex items-center justify-center">
          <div className="w-px h-4 bg-slate-300"></div>
        </div>

        <div className="flex space-x-1">
          {rowSeats?.slice(2, 4).map(seat => (
            <button
              key={seat?.seatNumber}
              onClick={() => handleSeatSelect(seat?.seatNumber)}
              disabled={seat?.isBooked}
              className={`
                w-8 h-8 text-xs font-bold rounded transition-all duration-200 border-2
                ${seat?.isBooked
                  ? 'bg-slate-400 text-white border-slate-400 cursor-not-allowed'
                  : seat?.isSelected
                    ? 'bg-red-500 text-white border-red-500 shadow-md'
                    : 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500 hover:border-blue-600'
                }
              `}
            >
              {seat?.seatNumber}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const seatcByRow = () => {
    const seat = [];
    for (let i = 0; i < seatLayout?.length; i += 4) {
      seat.push(seatLayout?.slice(i, i + 4));
    }
    return seat;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header pageTitle="Seat Selection" />

      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{operatorName}</h2>
              <p className="text-slate-600">{route} | {time}</p>
              <p className="text-red-600 font-bold">₹{price} per seat</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Select Your Seats</h3>

                <div className="flex flex-wrap justify-center items-center gap-4 text-sm mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 border-2 border-blue-500 rounded"></div>
                    <span className="text-slate-600">Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 border-2 border-red-500 rounded"></div>
                    <span className="text-slate-600">Selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-slate-400 border-2 border-slate-400 rounded"></div>
                    <span className="text-slate-600">Booked</span>
                  </div>
                </div>

                <div className="bg-slate-600 w-full text-white text-sm py-2 px-4 rounded-full inline-block mb-6 font-medium">
                  FRONT
                </div>
              </div>

              <div className="max-w-xs mx-auto">
                {seatcByRow()?.map((rowSeats, rowIndex) => (
                  <div key={rowIndex}>
                    {renderSeatRow(rowSeats)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Booking Summary</h3>

              {selectedSeats?.length === 0 ? (
                <p className="text-slate-500 italic text-center py-8">No seats selected</p>
              ) : (
                <div className="space-y-3 mb-6">
                  {selectedSeats?.map(seatNumber => (
                    <div key={seatNumber} className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-700">Seat {seatNumber}</span>
                      <span className="font-medium text-slate-900">₹{price}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total ({selectedSeats?.length} seats)</span>
                  <span className="text-2xl text-slate-900">₹{selectedSeats?.length * price}</span>
                </div>
              </div>

              {selectedSeats?.length > 0 ? (
                <div className="space-y-3">
                  <button
                    onClick={handleProceedToPayment}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
                  >
                    Proceed to Payment
                  </button>
                  <button
                    onClick={clearSelection}
                    className="w-full bg-slate-500 hover:bg-slate-600 text-white py-3 px-4 rounded-md font-medium transition-colors"
                  >
                    Clear Selection
                  </button>
                </div>
              ) : (
                <button
                  disabled
                  className="w-full bg-slate-300 text-slate-500 py-3 px-4 rounded-md font-medium cursor-not-allowed"
                >
                  Proceed to Payment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;