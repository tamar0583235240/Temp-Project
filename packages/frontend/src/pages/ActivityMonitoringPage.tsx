import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActivityMonitoringPage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/activity/stats')
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage('Error loading activity stats.'));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Activity Monitoring</h1>
      <p>{message}</p>
    </div>
  );
};

export default ActivityMonitoringPage;
