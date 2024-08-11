import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';
import './App.css'; 

const App = () => {
  const [bannerData, setBannerData] = useState({
    isVisible: true,
    description: '',
    timer: 60,
    link: '',
  });
  const [currentTimer, setCurrentTimer] = useState(bannerData.timer);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/banner');
        setBannerData(response.data);
        setCurrentTimer(response.data.timer); 
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };
    fetchBanner();
  }, []);

  useEffect(() => {
    let intervalId;
  
    if (bannerData.isVisible && currentTimer > 0) {
      intervalId = setInterval(() => {
        setCurrentTimer((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(intervalId);
            console.log("Timer ended. Showing notification."); 
            setShowNotification(true); 
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
  
    return () => clearInterval(intervalId);
  }, [bannerData.isVisible, currentTimer]);
  

  const updateBanner = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/banner', data);
      setBannerData(data);
      setCurrentTimer(data.timer); 
      setShowNotification(false); 
    } catch (error) {
      console.error('Error updating banner data:', error);
    }
  };

  const resetTimer = () => {
    setCurrentTimer(bannerData.timer); 
    setShowNotification(false); 
  };

  return (
    <div className="App">
      <Banner {...bannerData} currentTimer={currentTimer} />
      <Dashboard updateBanner={updateBanner} resetTimer={resetTimer} />
      {showNotification && <div className="notification">Time's up, Dev!</div>}
    </div>
  );
  
};

export default App;
