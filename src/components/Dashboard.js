import React, { useState } from 'react';

const Dashboard = ({ updateBanner }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [description, setDescription] = useState('');
  const [timer, setTimer] = useState(60);
  const [link, setLink] = useState('');

  const handleUpdate = () => {
    updateBanner({ isVisible, description, timer, link });
  };

  return (
    <div className="dashboard">
      <button onClick={() => {
        setIsVisible((prev) => !prev); 
        handleUpdate(); 
      }}>
        {isVisible ? 'Banner Off' : 'Banner On'}: visibility
      </button>
      <input
        type="text"
        placeholder="Banner Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Timer (seconds)"
        value={timer}
        onChange={(e) => setTimer(Number(e.target.value))}
      />
      <input
        type="text"
        placeholder="Banner Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Banner</button>
    </div>
  );
};

export default Dashboard;
