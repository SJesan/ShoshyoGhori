
import React, { useState, useEffect, useMemo } from 'react';
import Nav from './Nav.jsx'

// --- SVG Icons ---
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
const CloudIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

// --- Helper Functions ---
const normalizeSeason = (value) => {
    if (!value) return '';
    const s = value.toString().toLowerCase().replace(/\s+/g, ' ').trim();
    const kharif1 = ['খরিফ ১', 'খরিফ-১', 'খরিফ-1', 'kharif 1', 'kharif-1', 'kharif-i', 'kharif i'];
    const kharif2 = ['খরিফ ২', 'খরিফ-২', 'খরিফ-2', 'kharif 2', 'kharif-2', 'kharif-ii', 'kharif ii'];
    const rabi = ['রবি', 'rabi'];
    if (kharif1.includes(s)) return 'খরিফ ১';
    if (kharif2.includes(s)) return 'খরিফ ২';
    if (rabi.includes(s)) return 'রবি';
    return s;
};
const getCurrentSeason = () => {
    const month = new Date().getMonth(); // 0 = January, 11 = December
    if (month >= 2 && month <= 5) return "খরিফ ১";
    if (month >= 6 && month <= 9) return "খরিফ ২";
    return "রবি";
};

const monthMap = { "jan": 0, "feb": 1, "mar": 2, "apr": 3, "may": 4, "jun": 5, "jul": 6, "aug": 7, "sep": 8, "oct": 9, "nov": 10, "dec": 11 };

// Weather icon helper function
const getWeatherIcon = (iconName) => {
  const iconMap = {
    sun: <SunIcon />,
    cloud: <CloudIcon />,
    'sun-cloud': <SunIcon />,
    'cloud-rain': <CloudIcon />,
    'cloud-drizzle': <CloudIcon />,
    'cloud-rain-heavy': <CloudIcon />,
  };
  return iconMap[iconName] || <SunIcon />;
};

const calculateProgress = (userCrop, allCropsData) => {
    const cropDetails = allCropsData.find(c => c["Products name"] === userCrop.crop_name);
    if (!cropDetails) return 0;

    const plantingDate = new Date(userCrop.created_at);
    const harvestMonthString = cropDetails.Harvest.toLowerCase();
    
    const harvestMonths = harvestMonthString.split(' to ');
    const endHarvestMonthName = harvestMonths[harvestMonths.length - 1].trim().substring(0, 3);
    
    const harvestMonthIndex = monthMap[endHarvestMonthName];
    if (harvestMonthIndex === undefined) return 0;

    const plantingYear = plantingDate.getFullYear();
    const plantingMonth = plantingDate.getMonth();
    
    let harvestYear = plantingYear;
    // If harvest month is earlier in the year than planting month, it must be next year
    if (harvestMonthIndex < plantingMonth) {
        harvestYear += 1;
    }

    // Set harvest date to the last day of the harvest month
    const harvestDate = new Date(harvestYear, harvestMonthIndex + 1, 0);
    const today = new Date();

    if (today < plantingDate) return 0;
    if (today > harvestDate) return 100;

    const totalDuration = harvestDate.getTime() - plantingDate.getTime();
    const elapsedDuration = today.getTime() - plantingDate.getTime();

    if (totalDuration <= 0) return 100;

    const progress = (elapsedDuration / totalDuration) * 100;
    return Math.round(Math.min(100, progress));
};

// Helper to find crops suitable for a given temperature
const findCropsForTemperature = (tempC, allCropsData) => {
  if (tempC == null || !allCropsData || allCropsData.length === 0) return [];
  const t = parseFloat(tempC);
  if (Number.isNaN(t)) return [];

  return allCropsData.filter(crop => {
    // API fields are strings like "Max Temp" and "Min Temp"
    const minStr = crop['Min Temp'] || crop['MinTemp'] || crop.MinTemp || crop.min_temp || crop.minTemp;
    const maxStr = crop['Max Temp'] || crop['MaxTemp'] || crop.MaxTemp || crop.max_temp || crop.maxTemp;
    const minT = parseFloat((minStr || '').toString().replace(/[^0-9.\-]/g, ''));
    const maxT = parseFloat((maxStr || '').toString().replace(/[^0-9.\-]/g, ''));
    if (Number.isNaN(minT) || Number.isNaN(maxT)) return false;
    return t >= minT && t <= maxT;
  });
};

// --- Main Dashboard Component ---
function MainPage1() {
  const [seasonalCrops, setSeasonalCrops] = useState([]);
  const [allCropsData, setAllCropsData] = useState([]);
  const [userCrops, setUserCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentSeason, setCurrentSeason] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [cropToRemove, setCropToRemove] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const season = getCurrentSeason();
    setCurrentSeason(season);

    const fetchData = async () => {
      try {
        // Fetch all crops for data reference
        const cropApiResponse = await fetch('https://api.allorigins.win/raw?url=https://cropclock-api.onrender.com/crops');
        if (!cropApiResponse.ok) throw new Error('ফসল তথ্য আনতে সমস্যা হয়েছে');
        const allCrops = await cropApiResponse.json();
        setAllCropsData(allCrops);
        console.log(allCrops);
        // Filter for current season (handle EN/BN formats) and set dropdown options
        const filteredSeasonalCrops = allCrops.filter(crop => normalizeSeason(crop.Season) === normalizeSeason(season));
        setSeasonalCrops(filteredSeasonalCrops);
        if (filteredSeasonalCrops.length > 0) {
            setSelectedCrop(filteredSeasonalCrops[0]["Products name"]);
        } else {
            setSelectedCrop('');
        }


        // Fetch user's planted crops from localStorage
        const savedUserCrops = JSON.parse(localStorage.getItem('userCrops') || '[]');
        setUserCrops(savedUserCrops);

      } catch (error) {
        console.error("ফসলের ডাটা আনতে ব্যর্থ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Separate useEffect for weather data
  useEffect(() => {
    // Load weather data from localStorage
    const loadWeatherData = () => {
      const storedWeatherData = localStorage.getItem('weatherData');
      if (storedWeatherData) {
        try {
          setWeatherData(JSON.parse(storedWeatherData));
        } catch (error) {
          console.error('Error parsing weather data:', error);
        }
      }
    };

    loadWeatherData();

    // Listen for storage changes to update weather data when it changes
    const handleStorageChange = (e) => {
      if (e.key === 'weatherData') {
        loadWeatherData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Compute which seasonal crops are suitable for the current temperature.
  const availableCrops = useMemo(() => {
    if (!seasonalCrops || seasonalCrops.length === 0) return [];
    const temp = weatherData ? weatherData.temperature : null;
    // If no temperature data available, show seasonal crops as fallback
    if (temp == null) return seasonalCrops;

    // Filter seasonal crops by temperature suitability
    return seasonalCrops.filter(crop => {
      const matches = findCropsForTemperature(temp, [crop]);
      return matches && matches.length > 0;
    });
  }, [seasonalCrops, weatherData]);

  // Keep selectedCrop in sync with the available options
  useEffect(() => {
    if (availableCrops.length > 0) {
      setSelectedCrop(prev => {
        if (prev && availableCrops.some(c => c["Products name"] === prev)) return prev;
        return availableCrops[0]["Products name"];
      });
    } else {
      setSelectedCrop('');
    }
  }, [availableCrops]);

  const handleAddCrop = () => {
    if (!selectedCrop) {
        alert("অনুগ্রহ করে একটি ফসল নির্বাচন করুন।");
        return;
    };
    if (userCrops.some(crop => crop.crop_name === selectedCrop)) {
        alert(`${selectedCrop} ইতোমধ্যে যুক্ত করা হয়েছে।`);
        return;
    }

    const newCrop = {
        id: Date.now(),
        crop_name: selectedCrop,
        created_at: new Date().toISOString() // Use ISO string for consistency
    };

    const updatedUserCrops = [...userCrops, newCrop];
    setUserCrops(updatedUserCrops);
    localStorage.setItem('userCrops', JSON.stringify(updatedUserCrops));
  };
  
  const handleRemoveClick = (crop) => {
    setCropToRemove(crop);
    setShowConfirmModal(true);
  };

  const confirmRemoveCrop = () => {
    if (cropToRemove) {
      const updatedUserCrops = userCrops.filter(crop => crop.id !== cropToRemove.id);
      setUserCrops(updatedUserCrops);
      localStorage.setItem('userCrops', JSON.stringify(updatedUserCrops));
    }
    setShowConfirmModal(false);
    setCropToRemove(null);
  };

  const cancelRemoveCrop = () => {
    setShowConfirmModal(false);
    setCropToRemove(null);
  };


  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 min-h-screen font-sans text-white p-4 sm:p-6 lg:p-8">
      <div className=''>
      <Nav />
      </div>
      {showConfirmModal && cropToRemove && (
        <ConfirmationModal
            message={`আপনি কি নিশ্চিত যে \"${cropToRemove.crop_name}\" মুছে ফেলতে চান?`}
            onConfirm={confirmRemoveCrop}
            onCancel={cancelRemoveCrop}
        />
      )}
      <div className="max-w-screen-xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-4">
            শস্যঘড়ি
          </h1>
          <p className="text-xl text-gray-300">আপনার কৃষি সহায়ক ডিজিটাল প্ল্যাটফর্ম</p>
        </div>

        {/* Main Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative bg-gradient-to-r from-green-600 to-green-800 p-8 rounded-2xl shadow-2xl h-64 bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=300&fit=crop')"}}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 rounded-2xl"></div>
                <div className="relative z-10 flex items-center justify-between h-full">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <h2 className="text-lg font-medium">{weatherData ? `${weatherData.city}, ${weatherData.country}` : 'চট্টগ্রাম, বাংলাদেশ'}</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-6xl font-bold text-white">{weatherData ? `${weatherData.temperature}°C` : '২৫°C'}</p>
                        {weatherData && (
                          <p className="text-sm text-gray-200 mt-1">{weatherData.weatherInfo?.description || 'Clear Sky'}</p>
                        )}
                      </div>
                      <div className="text-6xl">
                        {weatherData?.weatherInfo?.icon === 'sun' ? '☀️' : weatherData?.weatherInfo?.icon === 'cloud' ? '☁️' : '🌤️'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-2xl text-green-300">শস্যঘড়ি</p>
                    <p className="text-sm text-gray-200">আমাদের বিশেষজ্ঞ দ্বারা প্রদত্ত কৃষি তথ্য</p>
                  </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['আজ', 'আগামীকাল', 'পরশু', 'এরপর'].map((day, index) => {
                // Get forecast data for the day
                const forecastDay = weatherData?.dailyForecast?.[index];
                const displayTemp = forecastDay ? `${forecastDay.temp_max}°C` : (weatherData ? `${weatherData.temperature}°C` : '২৫°C');
                const weatherIcon = forecastDay ? getWeatherIcon(forecastDay.weatherInfo?.icon) : (index % 2 === 0 ? <SunIcon /> : <CloudIcon />);
                
                return (
                  <div key={index} className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center border border-gray-600 hover:border-green-500">
                    <p className="text-lg font-bold text-green-400 mb-3">{day}</p>
                    <div className="text-4xl mb-3">
                      {forecastDay?.weatherInfo?.icon === 'sun' ? '☀️' : forecastDay?.weatherInfo?.icon === 'cloud' ? '☁️' : index % 2 === 0 ? '☀️' : '☁️'}
                    </div>
                    <p className="text-3xl font-bold text-white mb-2">{displayTemp}</p>
                    {forecastDay && (
                      <>
                        <p className="text-xs text-gray-300 mb-1">
                          {forecastDay.temp_min}°C - {forecastDay.temp_max}°C
                        </p>
                        <p className="text-xs text-gray-400 text-center">
                          {forecastDay.weatherInfo?.description || 'Clear Sky'}
                        </p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

      {/* Suitable crops by today's temperature */}
      <div className="bg-gradient-to-br from-green-800 to-green-900 p-8 rounded-2xl shadow-2xl border border-green-700">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-300">আজকের তাপমাত্রা অনুযায়ী যেসব ফসল বপন করা যায়</h3>
            <p className="text-green-200">বর্তমান তাপমাত্রা: <span className="font-bold text-white">{weatherData ? `${weatherData.temperature}°C` : 'লোড করা হয় নি'}</span></p>
          </div>
        </div>
        {allCropsData && allCropsData.length > 0 ? (
          (() => {
            const temp = weatherData ? weatherData.temperature : null;
            const suitable = findCropsForTemperature(temp, allCropsData);
            if (!suitable || suitable.length === 0) {
              return <p className="text-gray-400">এই তাপমাত্রায় মিলতি কোন ফসল পাওয়া যায়নি।</p>;
            }
            return (
              <ul className="space-y-2">
                {suitable.map((c, idx) => (
                  <li key={`${c["Products name"]}-${idx}`} className="p-3 bg-gray-600 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{c["Products name"]}</div>
                        <div className="text-xs text-gray-300">সিজন: {c.Season} • রোপণ: {c.Transplant} • হারভেস্ট: {c.Harvest}</div>
                      </div>
                      <div className="text-sm text-gray-200">
                        {c['Min Temp']}° - {c['Max Temp']}°C
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            );
          })()
        ) : (
          <p className="text-gray-400">ফসলের ডাটা লোড হচ্ছে...</p>
        )}
      </div>

            <div className="bg-gradient-to-br from-blue-800 to-blue-900 p-8 rounded-2xl shadow-2xl border border-blue-700">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-300">ঋতুভিত্তিক ফসল নির্বাচন করুন</h3>
                    <p className="text-blue-200">বর্তমান ঋতু: <span className="font-bold text-white">{currentSeason}</span></p>
                  </div>
                </div>
                {loading ? (
                  <p className="text-gray-400">ফসল লোড হচ্ছে...</p>
                ) : (
                  <div className="flex items-center gap-4">
                    <select
                      value={selectedCrop}
                      onChange={(e) => setSelectedCrop(e.target.value)}
                      className="w-full bg-gray-600 border border-gray-500 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="" disabled>একটি ফসল নির্বাচন করুন</option>
                      {availableCrops.length > 0 ? (
                          availableCrops.map((crop, index) => (
                              <option key={`${crop["Products name"]}-${index}`} value={crop["Products name"]}>
                                  {crop["Products name"]}
                              </option>
                          ))
                      ) : (
                          <option value="" disabled>এই তাপমাত্রায় বপনযোগ্য ফসল পাওয়া যায়নি</option>
                      )}
                    </select>
                    <button onClick={handleAddCrop} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg whitespace-nowrap">ফসল যোগ করুন</button>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-4">আপনি যে ফসলের তথ্য জানতে চান, সেটি নির্বাচন করুন</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <InfoCard title="ফসল রোপনের জন্য গুরুত্বপূর্ণ বিষয়" details="আপনার ফসলের জন্য সঠিক জমি নির্বাচন, সার প্রয়োগ এবং অন্যান্য গুরুত্বপূর্ণ বিষয় সম্পর্কে জানুন।" onClick={() => window.location.href = '/crop-planting'} />
                 <InfoCard title="ফসল রোগ থেকে বাঁচাতে করণীয়" details="ফসলের রোগবালাই দমন এবং প্রতিরোধের জন্য প্রয়োজনীয় পদক্ষেপ ও পরামর্শ সম্পর্কে জানুন।" onClick={() => window.location.href = '/disease-prevention'} />
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageInfoCard 
                    title="রোগবালাই ও পোকামাকড়ের দমন"
                    details="কীভাবে আপনার ফসলকে বিভিন্ন রোগ এবং পোকামাকড়ের হাত থেকে রক্ষা করবেন তার বিস্তারিত তথ্য।"
                    imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
                    onClick={() => window.location.href = '/pest-control'}
                />
                 <ImageInfoCard 
                    title="সার ও সেচ প্রয়োগ"
                    details="ফসলের সঠিক বৃদ্ধির জন্য কখন এবং কীভাবে সার ও সেচ প্রয়োগ করতে হবে তা জানুন।"
                    imageUrl="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=200&fit=crop"
                    onClick={() => window.location.href = '/fertilizer-irrigation'}
                />
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            {/* Crop Progress Section */}
            <div className="bg-gradient-to-br from-purple-800 to-purple-900 p-8 rounded-2xl shadow-2xl border border-purple-700">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-purple-300">আপনার ফসলের অগ্রগতি</h3>
                    <p className="text-purple-200">নির্বাচিত ফসলের বৃদ্ধি পর্যবেক্ষণ করুন</p>
                  </div>
                </div>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
                    <p className="text-purple-300">আপনার ফসলগুলো লোড হচ্ছে...</p>
                  </div>
                ) : 
                    userCrops.length > 0 ? (
                        <div className="space-y-6">
                            {userCrops.map(crop => {
                                const progress = calculateProgress(crop, allCropsData);
                                return <EnhancedProgressBar key={crop.id} title={crop.crop_name} percentage={progress} onRemove={() => handleRemoveClick(crop)} />;
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                          <div className="w-20 h-20 mx-auto mb-4 bg-purple-600 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="text-purple-300 text-lg">আপনার এখন কোনো ফসল লাগানো নেই</p>
                          <p className="text-purple-400 text-sm mt-2">নিচের ফর্ম থেকে ফসল নির্বাচন করুন</p>
                        </div>
                    )
                }
            </div>

            {/* Farming Tips Section */}
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 p-6 rounded-2xl shadow-2xl border border-blue-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-300">কৃষি টিপস</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-blue-700/50 rounded-lg p-3">
                  <p className="text-blue-200 text-sm font-medium">🌱 বীজ বপন</p>
                  <p className="text-white text-xs">ভাল মানের বীজ নির্বাচন করুন</p>
                </div>
                <div className="bg-blue-700/50 rounded-lg p-3">
                  <p className="text-blue-200 text-sm font-medium">💧 সেচ ব্যবস্থা</p>
                  <p className="text-white text-xs">মাটির আর্দ্রতা বজায় রাখুন</p>
                </div>
                <div className="bg-blue-700/50 rounded-lg p-3">
                  <p className="text-blue-200 text-sm font-medium">🌿 সার প্রয়োগ</p>
                  <p className="text-white text-xs">সঠিক সময়ে সঠিক পরিমাণে</p>
                </div>
              </div>
            </div>

            {/* Disease Prevention Section */}
            <div className="bg-gradient-to-br from-orange-800 to-orange-900 p-6 rounded-2xl shadow-2xl border border-orange-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-orange-300">রোগ প্রতিরোধ</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-orange-700/50 rounded-lg p-3">
                  <p className="text-orange-200 text-sm font-medium">🔍 নিয়মিত পরিদর্শন</p>
                  <p className="text-white text-xs">ফসলের পাতা ও কাণ্ড পরীক্ষা করুন</p>
                </div>
                <div className="bg-orange-700/50 rounded-lg p-3">
                  <p className="text-orange-200 text-sm font-medium">🧴 জৈব কীটনাশক</p>
                  <p className="text-white text-xs">রাসায়নিকের পরিবর্তে জৈব পদ্ধতি</p>
                </div>
                <div className="bg-orange-700/50 rounded-lg p-3">
                  <p className="text-orange-200 text-sm font-medium">🌱 ফসল আবর্তন</p>
                  <p className="text-white text-xs">বিভিন্ন ফসলের চাষ করুন</p>
                </div>
              </div>
            </div>

            {/* Soil Health Section */}
            <div className="bg-gradient-to-br from-green-800 to-green-900 p-6 rounded-2xl shadow-2xl border border-green-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-300">মাটি স্বাস্থ্য</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-green-700/50 rounded-lg p-3">
                  <p className="text-green-200 text-sm font-medium">🌱 জৈব পদার্থ</p>
                  <p className="text-white text-xs">কম্পোস্ট ও জৈব সার ব্যবহার</p>
                </div>
                <div className="bg-green-700/50 rounded-lg p-3">
                  <p className="text-green-200 text-sm font-medium">💧 জল নিকাশ</p>
                  <p className="text-white text-xs">সঠিক জল নিকাশ ব্যবস্থা</p>
                </div>
                <div className="bg-green-700/50 rounded-lg p-3">
                  <p className="text-green-200 text-sm font-medium">🔬 মাটি পরীক্ষা</p>
                  <p className="text-white text-xs">নিয়মিত মাটি পরীক্ষা করুন</p>
                </div>
              </div>
            </div>
          </div>
           
           <div className="lg:col-span-3">
             <div className="relative bg-gradient-to-r from-green-600 to-green-800 p-12 rounded-2xl shadow-2xl h-56 bg-cover bg-center flex flex-col justify-center overflow-hidden" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=300&fit=crop')"}}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 rounded-2xl"></div>
                <div className="relative z-10 text-center">
                    <div className="flex items-center justify-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h2 className="font-bold text-4xl text-green-300">শস্যঘড়ি</h2>
                    </div>
                    <p className="text-xl text-gray-200 mb-4">আমাদের বিশেষজ্ঞ দ্বারা প্রদত্ত কৃষি তথ্য</p>
                    <p className="text-lg text-green-200">ডিজিটাল কৃষি সহায়ক প্ল্যাটফর্ম</p>
                </div>
             </div>
           </div>
        </main>
      </div>
    </div>
  );
}

// --- Helper Components ---
const InfoCard = ({ title, details, onClick }) => (
    <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-2xl shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-300 border border-gray-600 hover:border-green-500 hover:scale-105" onClick={onClick}>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h4 className="font-bold text-xl text-green-400">{title}</h4>
        </div>
        <p className="text-gray-300 text-sm mb-6 leading-relaxed">{details}</p>
        <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-xl w-full transition-all duration-300 transform hover:scale-105">
          বিস্তারিত দেখুন
        </button>
    </div>
);
const ImageInfoCard = ({ title, details, imageUrl, onClick }) => (
    <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 border border-gray-600 hover:border-green-500 hover:scale-105" onClick={onClick}>
        <div className="relative">
          <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <h4 className="font-bold text-xl text-white mb-2">{title}</h4>
          </div>
        </div>
        <div className="p-6">
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">{details}</p>
            <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-xl w-full transition-all duration-300 transform hover:scale-105">
              বিস্তারিত দেখুন
            </button>
        </div>
    </div>
);
const EnhancedProgressBar = ({ title, percentage, onRemove }) => {
  const getCropImage = (cropName) => {
    const cropImages = {
      'Rice': 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=100&h=100&fit=crop',
      'Wheat': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=100&h=100&fit=crop',
      'Potato': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop',
      'Tomato': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop',
      'Spinach': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=100&h=100&fit=crop',
      'Onion': 'https://images.unsplash.com/photo-1586771107445-d3ca888129ce?w=100&h=100&fit=crop'
    };
    return cropImages[cropName] || 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=100&h=100&fit=crop';
  };

  const getProgressColor = (percentage) => {
    if (percentage < 25) return 'from-red-500 to-red-600';
    if (percentage < 50) return 'from-yellow-500 to-yellow-600';
    if (percentage < 75) return 'from-blue-500 to-blue-600';
    return 'from-green-500 to-green-600';
  };

  const getProgressText = (percentage) => {
    if (percentage < 25) return 'শুরু হয়েছে';
    if (percentage < 50) return 'বৃদ্ধি হচ্ছে';
    if (percentage < 75) return 'প্রায় প্রস্তুত';
    return 'হারভেস্টের জন্য প্রস্তুত';
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 to-purple-800 p-6 rounded-2xl shadow-xl border border-purple-600">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-400">
          <img 
            src={getCropImage(title)} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
          <p className="text-purple-200 text-sm">{getProgressText(percentage)}</p>
        </div>
        <button 
          onClick={onRemove} 
          className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-500/20 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-purple-200">অগ্রগতি</span>
          <span className="text-lg font-bold text-white">{percentage}%</span>
        </div>
        <div className="w-full bg-purple-900 rounded-full h-3 overflow-hidden">
          <div 
            className={`bg-gradient-to-r ${getProgressColor(percentage)} h-3 rounded-full transition-all duration-1000 ease-out`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-purple-300">
        <span>রোপন</span>
        <span>হারভেস্ট</span>
      </div>
    </div>
  );
};

const ProgressBar = ({ title, percentage, color, onRemove }) => (
    <div>
        <div className="flex justify-between items-center mb-1">
            <span className="text-base font-medium">{title}</span>
            <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{percentage}%</span>
                <button onClick={onRemove} className="text-red-500 hover:text-red-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
        <div className="w-full bg-gray-600 rounded-full h-4">
            <div className={`${color} h-4 rounded-full transition-width duration-500`} style={{ width: `${percentage}%` }}></div>
        </div>
    </div>
);

const ConfirmationModal = ({ message, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-2xl max-w-sm mx-4">
            <p className="text-white text-lg mb-6 text-center">{message}</p>
            <div className="flex justify-center space-x-4">
                <button onClick={onCancel} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition-colors">না</button>
                <button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">হ্যাঁ, মুছে দিন</button>
            </div>
        </div>
    </div>
);

export default MainPage1;

