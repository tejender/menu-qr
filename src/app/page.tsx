'use client'
import React, { useState, useRef } from 'react';
import { useQRCode } from 'next-qrcode';
import html2canvas from 'html2canvas';

export default function QrGenerator() {

  const [selectedColor, setSelectedColor] = useState('default'); // Add a state for color choice

  const defaultColors: any = {
    default: { dark: '#010599FF', light: '#FFFFFF' }, // Your original theme
    theme1: { dark: '#C1121F', light: '#FFFFFF' }, 
    theme2: { dark: '#364F6B', light: '#FFFFFF' },
  
    // New themes:
    theme3: { dark: '#374151', light: '#FFFFFF'}, // Monochrome sophistication
    theme4: { dark: '#A93F55', light: '#FFFFFF'}, // Warm and vintage
    theme5: { dark: '#23815D', light: '#FFFFFF'}, // Nature inspired
    theme6: { dark: '#132C49', light: '#FFFFFF'}, // Cool and modern
    theme7: { dark: '#6236FF', light: '#FFFFFF'}, // Vibrant purple shades
    theme8: { dark: '#DC2626', light: '#FFFFFF'}, // Bold red with softness
    theme9: { dark: '#D97706', light: '#FFFFFF'}, // Earthy orange + cream
    theme10: { dark: '#10B981', light: '#FFFFFF'} // Bright green and neutral
  };
  const [menuUrl, setMenuUrl] = useState('');
  const [qrCode, setQrCode] = useState<any>();
  const qrCodeRef = useRef(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State to control button state


  const handleInputChange = (event:any) => {
    setMenuUrl(event.target.value);
    setIsButtonDisabled(event.target.value.trim() === ''); // Update button state
  
  };

  const { Image } = useQRCode();
  const generateQRCode = async () => {
    try {
      const qr = (
        <Image 
          text={menuUrl}
          options={{
            type: 'image/jpeg',
            quality: 0.9,
            width:300,
            margin: 2,
            color:defaultColors[selectedColor],
          }}
        />
      );
      setQrCode(qr);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadQRCode = async () => {
    if (qrCodeRef.current) {
      const canvas = await html2canvas(qrCodeRef.current); 
      const imageData = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.download = 'menu-qrcode.png';
      link.href = imageData;
      link.click(); 
    }
  };

  return (
    <div className='bg-blue-300 w-[100%] m-auto h-[100vh] flex flex-col items-center justify-center'>
      <div className='bg-teal-400 h-fit w-fit lg:px-20 lg:py-10 py-10 px-5 rounded-lg flex flex-col gap-4 justify-center items-center'>
        <h2 className='font-bold text-4xl text-blue-950'>QR Code Generator</h2>
          <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-2 h-auto '>
            <label htmlFor="url" className='text-slate-600 font-bold'>Enter Website Address</label>
            <input className=' rounded-md text text-slate-600 h-10 border-2 p-2 w-full border-blue-400 '
              type="text"
              id='url'
              placeholder="Example : https://www.menu.vercel.app/"
              value={menuUrl}
              onChange={handleInputChange}
              required
          />
          </div >
          <div className='flex flex-col gap-2'> {/* Wrapper for color selectors */}
          <span className='text-slate-600 font-bold'>Choose Qr Theme</span> 
          <div className='flex gap-2'>
              {Object.keys(defaultColors).map((themeName) => (
                <button
                  key={themeName}
                  className={`w-6 h-6   ${selectedColor === themeName ? 'border-2 border-black' : ''}`} // Mark selected
                  style={{ backgroundColor: defaultColors[themeName].dark }}
                  onClick={() => setSelectedColor(themeName)} 
                ></button>
              ))}

          </div>
            </div>
            </div>

        
        
        <button disabled={isButtonDisabled} onClick={generateQRCode} className='bg-yellow-200 text-black p-3 rounded-lg'>Generate QR Code</button>
       
        {qrCode &&( <div ref={qrCodeRef} className='bg-red-300 p-2 w-fit h-fit rounded-md'> 
            {qrCode}
        </div>)}
        {qrCode && (
            <button onClick={downloadQRCode} className='bg-slate-600 p-3 rounded-lg shadow-white shadow-md shadow-stone-400'>Download</button>
        )}
        </div>
    </div>
  );
}
