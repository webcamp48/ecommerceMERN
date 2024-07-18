import React, { useState } from 'react';
import './TabComponent.css';

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState('description');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabComponent">
      <div className="tabs">
        <button
          className={activeTab === 'description' ? 'tab active' : 'tab'}
          onClick={() => handleTabClick('description')}
        >
          Description
        </button>
        <button
          className={activeTab === 'reviews' ? 'tab active' : 'tab'}
          onClick={() => handleTabClick('reviews')}
        >
          Reviews (122)
        </button>
      </div>
      <div className="tabContent">
        {activeTab === 'description' && (
          <div>
            <p>
              An e-commerce website is an online platform that facilitates the
              buying and selling of products or services over the internet. It
              serves as a virtual marketplace where businesses and individuals
              can showcase their products, interact with customers, and conduct
              transactions without the need for a physical presence. E-commerce
              websites have gained immense popularity due to their convenience,
              accessibility, and the global reach they offer.
            </p>
            <p>
              E-commerce websites typically display products or services along
              with detailed descriptions, images, prices, and any available
              variations (e.g., sizes, colors). Each product usually has its own
              dedicated page with relevant information.
            </p>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div>
            <p>User reviews will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabComponent;
