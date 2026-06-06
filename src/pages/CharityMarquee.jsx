import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getImageUrl } from '../utils/imageUrl';
import { useCart } from '../context/CartContext';
import { useUserAuth } from '../context/UserAuthContext';

const CharityCard = ({ image, title, description, targetAmount, currentAmount, donationId, onDonateClick }) => {
  // Convert to numbers if they're strings
  const target = parseFloat(targetAmount) || 0;
  const current = parseFloat(currentAmount) || 0;
  const progress = target > 0 ? (current / target) * 100 : 0;
  
  return (
    // Har card ki width fixed rakhi hai (350px) taaki animation calculate karna asan ho
    <div className="flex-shrink-0 w-[350px] bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 ">
      {/* Image Area */}
      <div className="relative h-44 overflow-hidden bg-gray-200">
        <img 
          src={getImageUrl(image)} 
          alt={title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22350%22 height=%22200%22%3E%3Crect fill=%22%23e5e7eb%22 width=%22350%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%220.3em%22 fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2214%22%3EDonation Campaign%3C/text%3E%3C/svg%3E';
          }}
        />
        <div className="absolute top-0 left-0 bg-[#006837] text-white px-3 py-1 m-2 rounded text-xs font-bold uppercase tracking-wider">
          Donation Required
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">{title}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {description || 'Your contribution can bring a smile and change a life forever. Join our mission today.'}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
            <span>${current.toFixed(2)} raised</span>
            <span>${target.toFixed(2)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#006837] h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{progress.toFixed(0)}% funded</p>
        </div>

        {/* Donate Button */}
        <button 
  onClick={() => onDonateClick(donationId, title)}
  className="w-full bg-[#0E4B33] hover:bg-[#0a3525] 
             text-white font-black py-3 rounded-lg 
             shadow-md hover:shadow-xl 
             transition-all active:scale-95 
             uppercase text-sm tracking-widest"
>
  Donate Now
</button>
      </div>
    </div>
  );
};

const CharityMarquee = ({ onShowLoginModal, onShowSignUpModal }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { isAuthenticated } = useUserAuth();

  const handleDonateClick = (donationId, title) => {
    if (!isAuthenticated) {
      onShowLoginModal?.();
      return;
    }

    // Add donation to cart
    const donationItem = {
      id: `donation_${donationId}_${Date.now()}`,
      donationId: donationId,
      title: title,
      type: 'donation',
      timestamp: new Date().toISOString()
    };
    addToCart(donationItem);
    alert(`✓ Added to cart! Go to cart to view your donations.`);
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend';
        
        // Fetch only active donations for home page display
        const response = await fetch(`${BACKEND_URL}/api/get_donations.php?status=active&limit=50`);
        const data = await response.json();
        
        if (data.success && data.data?.donations) {
          setDonations(data.data.donations);
        } else {
          setDonations([]);
        }
      } catch (error) {
        console.error('Error fetching donations:', error);
        setDonations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Loop ko seamless banane ke liye hum list ko double kar dete hain
  const displayDonations = donations.length > 0 ? donations : [
    { id: 1, title_en: "Pure Water Initiative", description_en: "Access to clean water", image: "http://images.unsplash.com/photo-1541976590-71394168159b?w=400", target_amount: 5000, current_amount: 2500 },
    { id: 2, title_en: "Emergency Food Relief", description_en: "Food for families in need", image: "http://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400", target_amount: 3000, current_amount: 1500 },
  ];

  const duplicatedCards = [...displayDonations, ...displayDonations];

  return (
    <div className="w-full bg-white overflow-hidden relative">
      {/* Decorative Title */}
      <div className=" px-10">
        <h2 className="text-2xl text-center font-black text-[#006837] italic uppercase">Join The Movement</h2>
        <div className="w-16 h-2 mx-auto mb-2 bg-[#fdb913]"></div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-600">Loading campaigns...</div>
      ) : (
        <>
          {/* Marquee Container */}
          <div className="flex w-max">
            <motion.div
              className="flex"
              animate={{
                // x: [0, -(total width of one set of cards)]
                // Har card 350px + margin 32px (mx-4) = 382px approx
                x: ["0%", "-50%"], 
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20, // Speed control (jitna kam, utna fast)
                  ease: "linear",
                },
              }}
            >
              {duplicatedCards.map((card, index) => (
                <CharityCard 
                  key={index} 
                  title={card.title_en || card.title_ar || card.title} 
                  description={card.description_en || card.description_ar}
                  image={card.image} 
                  targetAmount={card.target_amount}
                  currentAmount={card.current_amount}
                  donationId={card.id}
                  onDonateClick={handleDonateClick}
                />
              ))}
            </motion.div>
          </div>

          {/* Side Fades (Professional Touch) */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </>
      )}
    </div>
  );
}

export default CharityMarquee;