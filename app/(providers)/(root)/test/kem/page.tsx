'use client';

import React, { useState, useEffect } from 'react';
import ChartStarRatingReview from "@/components/organisms/ChartStarRatingReview";
import ProgressBar from "@/components/molecules/ProgressBar";
import ChatBubbleMovingChoice from "@/components/molecules/ChatBubbleMovingChoice";
import axios from 'axios';

function page() {
  const [ratingData, setRatingData] = useState([]);
  const workerId = '450436de-f448-450f-800d-584752bae93e'; 

  useEffect(() => {
    axios.get(`http://localhost:5050/review/${workerId}`) 
      .then(response => {
        setRatingData(response.data.starCountList); 
      })
      .catch(error => console.error('🚨Error fetching data:', error));
  }, [workerId]);

  return (
    <div className="bg-Black-300 p-4 g-6">
      <ChartStarRatingReview ratingData={ratingData} />
      <div className="mb-8">
        <ProgressBar totalSteps={4} currentStep={1} />
      </div>
      <ProgressBar totalSteps={4} currentStep={2} />
      <ProgressBar totalSteps={4} currentStep={3} />
      <div className="mb-8">
        <ProgressBar totalSteps={4} currentStep={4} />
      </div>
      <div className="flex justify-center">
        <ChatBubbleMovingChoice onSubmit={(selectedService) => alert(`선택된 서비스 서비스타입 이사: ${selectedService}`)} />
      </div>
    </div>
  );
}

export default page;