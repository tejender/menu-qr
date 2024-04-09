'use client'
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

const BookingReceipt = () => {
  const [formData, setFormData] = useState({
    cottageName: '',
    guestName: '',
    checkInDate: '',
    checkOutDate: '',
    totalAmount:'',
    depositedAmount:'',
    mealPlan:'',
    guestCount:'',
    remarks:''
  });
  const [previewGenerated, setPreviewGenerated] = useState(false); // State to track if preview is generated
  const previewRef = useRef<HTMLDivElement>(null); 

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const totalAmount = parseFloat(formData.totalAmount);
const depositedAmount = parseFloat(formData.depositedAmount);
const remainingAmount = totalAmount - depositedAmount;

  const handleGeneratePreview = () => {
    setPreviewGenerated(true); // Set previewGenerated to true when preview is generated
  };

  const handleDownloadPNG = () => {
    // Use html2canvas to convert the preview section to a canvas
    html2canvas(previewRef.current!,
      
    ).then((canvas) => {
      // Convert canvas to PNG blob
      canvas.toBlob((blob) => {
        if (blob) {
          // Create download link
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `${formData.checkInDate}_booking_receipt.png`;
          link.click();
        }
      });
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Booking Receipt Generator</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="cottageName" className="block text-gray-700 font-semibold mb-2">Cottage Name:</label>
          <input
            type="text"
            id="cottageName"
            name="cottageName"
            value={formData.cottageName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="guestName" className="block text-gray-700 font-semibold mb-2">Guest Name:</label>
          <input
            type="text"
            id="guestName"
            name="guestName"
            value={formData.guestName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className='flex justify-between'>
        <div className="mb-4">
          <label htmlFor="checkInDate" className="block text-gray-700 font-semibold mb-2">Check-in Date:</label>
          <input
            type="date"
            id="checkInDate"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="checkOutDate" className="block text-gray-700 font-semibold mb-2">Check-out Date:</label>
          <input
            type="date"
            id="checkOutDate"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        </div>

          <div className='flex justify-between'>
          <div className="mb-4">
          <label htmlFor="guestCount" className="block text-gray-700 font-semibold mb-2">No. of Guest</label>
          <input
            type="number"
            id="guestCount"
            name="guestCount"
            value={formData.guestCount}
            onChange={handleChange}
            className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mealPlan" className="block text-gray-700 font-semibold mb-2">Meal Plan</label>
          <select name="mealPlan" id="mealPlan" onChange={handleChange} className='border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500'>
            <option value="European Plan" selected>European Plan</option>
            <option value="">Continental Plan</option>
            <option value="Continental Plan">Modified American Plan</option>
            <option value="American Plan">American Plan</option>
          </select>
        </div>
          </div>



          <div className='flex justify-between'>
          <div className="mb-4">
          <label htmlFor="totalAmount" className="block text-gray-700 font-semibold mb-2">Total Amount :</label>
          <input
            type="number"
            id="totalAmount"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="depositedAmount" className="block text-gray-700 font-semibold mb-2">Amount Received :</label>
          <input
            type="number"
            id="depositedAmount"
            name="depositedAmount"
            value={formData.depositedAmount}
            onChange={handleChange}
            className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            required
          />
        </div>
          </div>

          <div className='mb-4'>
          <label htmlFor="remarks" className="block text-gray-700 font-semibold mb-2">Special Note : </label>
         
              <textarea name="remarks" id="remarks" value={formData.remarks} onChange={handleChange} cols={10} rows={4} className='border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500'>

              </textarea>
          </div>

        <button type="button" onClick={handleGeneratePreview} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          Generate
        </button>
        {previewGenerated && (
          <button type="button" onClick={handleDownloadPNG} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 ml-4 rounded">
            Download
          </button>
        )}
      </form>
      {/* Display the receipt HTML preview */}
      {previewGenerated && (
        <div className="mt-8 bg-white" ref={previewRef}>
          <div className="max-w-lg p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold  text-center">Booking Confirmation Receipt</h3>
            <p className='text-center capitalize'>{formData.cottageName}</p>

            <hr className='m-2'/>

            <p>Dear <span className='capitalize'>{formData.guestName} ,</span><br />We are delighted to confirm your booking for the {formData.cottageName}.
             Your stay is scheduled from <b>{formData.checkInDate}</b> to <>{formData.checkOutDate}</>.</p>
            <p>We have received your advance payment of <b>₹ {formData.depositedAmount}</b>. The remaining balance of <b>₹ {remainingAmount}</b> is due upon arrival.</p>
            <h3 className='font-bold text-lg ml-4'>Booking Summary:</h3>
            <ul className='ml-4'>
              <li>Cottage: {formData.cottageName}</li>
              <li>Booked By: {formData.guestName}</li>
              <li>Number of Guests: {formData.guestCount}</li>
              <li>Check In: {formData.checkInDate}</li>
              <li>Check Out: {formData.checkOutDate}</li>
              <li>Meal Plan: {formData.mealPlan} </li>
              <li>Total Amount: {formData.totalAmount} </li>
              <li>Advance Payment Received: {formData.depositedAmount} </li>
              <li>Balance Due: {remainingAmount}</li>
            </ul>
            
            {formData.remarks && (
              <p className='mt-4'>
              <b>Note : </b> {formData.remarks}
            </p>
            )}
            <hr className='bg-gray-300 h-[1px] mt-2'/>
            <span className='flex  items-center text-xs opacity-20 mt-2'>Powered by Jibhi.co</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingReceipt;
