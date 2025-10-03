import { useState, useEffect } from 'react';
import supabase from './supabaseClient.js';
import Nav from './Nav.jsx';



const UserIcon = () => '👤';
const PhoneIcon = () => '📞';
const LocationIcon = () => '📍';
const GlobeIcon = () => '🌍';
const ClockIcon = () => '🕒';

const Dashboard = () => {
    const [fetchError, setFetchError] = useState(null);
    const [user, setUser] = useState(null);
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);

    useEffect(() => {
        const getUserLocationData = async () => {
            try {
                const response = await fetch('http://ip-api.com/json');
                if (!response.ok) throw new Error('Failed to fetch location');
                return await response.json();
            } catch (error) {
                console.error("Could not fetch location data:", error);
                return { error: "Could not fetch location" };
            }
        };

        const fetchAllData = async () => {
            setIsLoading(true);

            // Read currently logged-in user from localStorage (set in Login.jsx)
            const storedUserJson = localStorage.getItem('user');
            let storedUser = null;
            try {
                storedUser = storedUserJson ? JSON.parse(storedUserJson) : null;
            } catch (_) {
                storedUser = null;
            }

            if (!storedUser) {
                setFetchError('No logged-in user. Please log in.');
                setIsLoading(false);
                return;
            }

            // Fetch both in parallel for better performance
            const [locationData, userQueryResult] = await Promise.all([
                getUserLocationData(),
                // Prefer querying by id if present; otherwise fall back to Phone
                storedUser?.id
                    ? supabase.from('Users').select('Name, Phone').eq('id', storedUser.id).single()
                    : supabase.from('Users').select('Name, Phone').eq('Phone', storedUser?.Phone ?? '').single()
            ]);

            const userData = userQueryResult?.data ?? null;
            const userError = userQueryResult?.error ?? null;

            if (userError) {
                setFetchError('Could not fetch the user data');
                setUser(null);
            } else {
                setUser(userData);
            }
            
            if (locationData.error) {
                setFetchError(prev => prev ? `${prev}, and location data` : 'Could not fetch location data');
                setLocation(null);
                setLat(null);
                setLon(null);
            } else {
                setLocation(locationData);
                setLat(locationData?.lat ?? null);
                setLon(locationData?.lon ?? null);
            }

            if (!userError) setFetchError(null);
            setIsLoading(false);
        };

        fetchAllData();
    }, []);

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900'>
            <Nav />
            <div className='flex items-center justify-center p-4'>
                <div className='w-full max-w-4xl mx-auto'>
                    {isLoading && (
                        <div className='text-center py-12'>
                            <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4'></div>
                            <p className='text-xl text-green-300'>প্রোফাইল লোড হচ্ছে…</p>
                        </div>
                    )}
                    {fetchError && (
                        <div className='bg-red-900/50 border border-red-700 rounded-2xl p-6 text-center max-w-md mx-auto'>
                            <div className='w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                    <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                                </svg>
                            </div>
                            <p className='text-red-300 text-lg font-semibold'>{fetchError}</p>
                        </div>
                    )}
                    
                    {user && location && !isLoading && (
                        <div className='bg-white rounded-2xl shadow-xl p-8'>
                            
                            {/* --- Profile Header --- */}
                            <div className='flex flex-col items-center mb-6'>
                               
                                <h2 className='text-3xl font-bold text-gray-800'>{user.Name}</h2>
                                <p className='text-gray-500'>ব্যবহারকারীর প্রোফাইল</p>
                            </div>

                            {/* --- User Details Section --- */}
                            <div className='mb-6'>
                                <h3 className='text-lg font-semibold text-gray-700 border-b pb-2 mb-4'>ব্যবহারকারীর তথ্য</h3>
                                <div className='space-y-3'>
                                    <div className='flex items-center'>
                                        <UserIcon />
                                        <span className='ml-3 text-gray-600'>{user.Name}</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <PhoneIcon />
                                        <span className='ml-3 text-gray-600'>{user.Phone}</span>
                                    </div>
                                </div>
                            </div>

                            {/* --- Geolocation Info Section --- */}
                            <div>
                                <h3 className='text-lg font-semibold text-gray-700 border-b pb-2 mb-4'>অবস্থান সম্পর্কিত তথ্য</h3>
                                <div className='space-y-3'>
                                    <div className='flex items-center'>
                                        <LocationIcon />
                                        <span className='ml-3 text-gray-600'>{location.city}, {location.country}</span>
                                    </div>
                                    {/* <div className='flex items-center'>
                                        <GlobeIcon />
                                        <span className='ml-3 text-gray-600'>আইপি: {location.query}</span>
                                    </div> */}
                                    <div className='flex items-center'>
                                        <GlobeIcon />
                                        <span className='ml-3 text-gray-600'> Latitude: {lat}</span>
                                        <span className='ml-3 text-gray-600'> Longitude: {lon}</span>
                                    </div>
                                     <div className='flex items-center'>
                                        <ClockIcon />
                                        <span className='ml-3 text-gray-600'>সময় অঞ্চল: {location.timezone}</span>
                                    </div>
                                </div>
                            </div>

                            {/* --- Weather Section --- */}
                            <div>
                                <h3 className='text-lg font-semibold text-gray-700 border-b pb-2 mb-4'>আবহাওয়ার পূর্বাভাস</h3>
                                {lat && lon ? (
                                    <WeatherForecast 
                                        latitude={lat} 
                                        longitude={lon} 
                                        city={location.city} 
                                        country={location.country} 
                                    />
                                ) : (
                                    <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
                                        <p className='text-yellow-800 text-center'>অবস্থানের তথ্য পাওয়া যায়নি। আবহাওয়ার পূর্বাভাস দেখতে সক্ষম নয়।</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;



// A simple component to render different weather icons
const WeatherIcon = ({ iconName, className }) => {
    const iconMap = {
        sun: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        ),
        cloud: (
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>
        ),
        'sun-cloud': (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m17.66 17.66 1.41 1.41"/><path d="M12 20v2"/><path d="m5.64 17.66 1.41-1.41"/><path d="M4 12H2"/><path d="M16 20a4 4 0 0 0-8 0"/><path d="M12 12a8 8 0 0 1 8 8h-12a4 4 0 0 0 0-8h12z"/></svg>
        ),
        'cloud-rain': (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><path d="M8 19v1"/><path d="M8 14v1"/><path d="M12 21v1"/><path d="M12 16v1"/><path d="M16 19v1"/><path d="M16 14v1"/></svg>
        ),
        'cloud-drizzle': (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M8 15h0"/><path d="M8 17h0"/><path d="M12 15h0"/><path d="M12 17h0"/><path d="M16 15h0"/><path d="M16 17h0"/></svg>
        ),
        'cloud-rain-heavy': (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M8 15h0"/><path d="M8 17h0"/><path d="M12 15h0"/><path d="M12 17h0"/><path d="M16 15h0"/><path d="M16 17h0"/></svg>
        ),
    };
    return iconMap[iconName] || iconMap['sun'];
};

// Helper to map WMO weather codes to our icons and descriptions
const getWeatherInfo = (code) => {
    const weatherMap = {
        0: { description: 'Clear Sky', icon: 'sun' },
        1: { description: 'Mainly Clear', icon: 'sun-cloud' },
        2: { description: 'Partly Cloudy', icon: 'cloud' },
        3: { description: 'Overcast', icon: 'cloud' },
        45: { description: 'Fog', icon: 'cloud' },
        48: { description: 'Rime Fog', icon: 'cloud' },
        51: { description: 'Light Drizzle', icon: 'cloud-drizzle' },
        53: { description: 'Drizzle', icon: 'cloud-drizzle' },
        55: { description: 'Dense Drizzle', icon: 'cloud-drizzle' },
        61: { description: 'Slight Rain', icon: 'cloud-rain' },
        63: { description: 'Rain', icon: 'cloud-rain' },
        65: { description: 'Heavy Rain', icon: 'cloud-rain-heavy' },
        80: { description: 'Rain Showers', icon: 'cloud-rain' },
        81: { description: 'Rain Showers', icon: 'cloud-rain' },
        82: { description: 'Violent Showers', icon: 'cloud-rain-heavy' },
    };
    return weatherMap[code] || { description: 'Unknown', icon: 'sun' };
};


// Weather Forecast Component
const WeatherForecast = ({ latitude, longitude, city, country }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      // Don't fetch weather data if we don't have coordinates
      if (!latitude || !longitude) {
        setError("Location coordinates not available");
        setLoading(false);
        return;
      }

      try {
        const params = {
          latitude: latitude,
          longitude: longitude,
          hourly: "temperature_2m,weather_code",
          daily: "weather_code,temperature_2m_max,temperature_2m_min",
          current: "temperature_2m,weather_code",
          timezone: "auto",
          forecast_days: 3
        };
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&hourly=${params.hourly}&daily=${params.daily}&current=${params.current}&timezone=${params.timezone}&forecast_days=${params.forecast_days}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Set location info
        setLocationInfo({
          latitude: data.latitude.toFixed(4),
          longitude: data.longitude.toFixed(4),
        });

        // Set current weather
        const currentTemp = data.current.temperature_2m.toFixed(1);
        setCurrentWeather({
            temperature: currentTemp,
            weatherInfo: getWeatherInfo(data.current.weather_code)
        });

        // Process daily forecast for next 2 days
        const nextTwoDays = data.daily.time.slice(0, 3).map((dateStr, i) => ({
            date: new Date(dateStr),
            weatherInfo: getWeatherInfo(data.daily.weather_code[i]),
            temp_max: data.daily.temperature_2m_max[i].toFixed(1),
            temp_min: data.daily.temperature_2m_min[i].toFixed(1),
        }));

        // Store temperature data in localStorage for MainPage1
        localStorage.setItem('weatherData', JSON.stringify({
            temperature: currentTemp,
            city: city,
            country: country,
            weatherInfo: getWeatherInfo(data.current.weather_code),
            dailyForecast: nextTwoDays
        }));

        // Process and set hourly forecast for the next 24h
        setHourlyForecast(data.hourly.time.slice(0, 24).map((timeStr, i) => ({
          time: new Date(timeStr),
          temperature: data.hourly.temperature_2m[i].toFixed(1),
        })));
        
        // Process and set daily forecast
        setDailyForecast(data.daily.time.map((dateStr, i) => ({
            date: new Date(dateStr),
            weatherInfo: getWeatherInfo(data.daily.weather_code[i]),
            temp_max: data.daily.temperature_2m_max[i].toFixed(1),
            temp_min: data.daily.temperature_2m_min[i].toFixed(1),
        })));

      } catch (err) {
        console.error("Failed to fetch or process weather data:", err);
        setError("Could not retrieve weather data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, [latitude, longitude]);

  if (loading) {
    return (
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-lg p-8 text-center">
        <p className="text-lg animate-pulse">Fetching Weather Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md bg-red-900/50 border border-red-700 rounded-2xl shadow-lg p-8 text-center">
        <p className="text-lg font-semibold">Error</p>
        <p className="text-red-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-6">
        <h1 className="text-xl font-bold">{city}, {country}</h1>
        <p className="text-xs text-slate-400">
            Lat: {locationInfo?.latitude}, Lon: {locationInfo?.longitude}
        </p>

        {currentWeather && (
             <div className="flex items-center justify-center my-6">
                <WeatherIcon iconName={currentWeather.weatherInfo.icon} className="w-24 h-24 text-yellow-400" />
                <div className="ml-4">
                    <p className="text-6xl font-bold">{currentWeather.temperature}°C</p>
                    <p className="text-slate-300 text-lg">{currentWeather.weatherInfo.description}</p>
                </div>
            </div>
        )}
      </div>
      
      {/* Daily Forecast */}
       <div className="px-6 pb-4">
        <h2 className="font-semibold mb-2">3-Day Forecast</h2>
        <ul className="space-y-2">
            {dailyForecast?.map((day, index) => (
                <li key={index} className="flex justify-between items-center bg-slate-800/70 p-2 rounded-lg">
                    <span className="font-medium text-slate-300 w-1/3">
                        {index === 0 ? 'Today' : day.date.toLocaleDateString([], { weekday: 'long' })}
                    </span>
                    <WeatherIcon iconName={day.weatherInfo.icon} className="w-6 h-6 text-yellow-400" />
                    <div className="font-semibold text-right w-1/3">
                        <span>{day.temp_max}°</span>
                        <span className="text-slate-400 ml-2">{day.temp_min}°</span>
                    </div>
                </li>
            ))}
        </ul>
      </div>

      {/* Hourly Forecast */}
      <div className="px-6 pt-4 pb-6">
        <h2 className="font-semibold mb-2">Hourly Forecast</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2 -mx-6 px-6">
            {hourlyForecast?.map((hour, index) => (
                <div key={index} className="flex flex-col items-center bg-slate-800/70 p-3 rounded-lg flex-shrink-0">
                    <span className="text-sm text-slate-400">
                        {hour.time.toLocaleTimeString([], { hour: 'numeric', hour12: true })}
                    </span>
                    <span className="text-lg font-bold mt-1">{hour.temperature}°</span>
                </div>
            ))}
        </div>
      </div>
      
      <div className="p-3 bg-slate-900 text-center text-xs text-slate-500">
        Data provided by Open-Meteo
      </div>
    </div>
  );
};



