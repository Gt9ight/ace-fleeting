import React, { useState } from 'react';
import './fleetForm.css'
import FleetSpecifics from './FleetSpecifics';
import { createFleetDatabase } from '../../utilis/Firebase';


  const FleetForm = () => {
    const [customerFleet, setCustomerFleet] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [newCustomer, setNewCustomer] = useState('');
    const [customers, setCustomers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [currentUnitIndex, setCurrentUnitIndex] = useState(null);
  

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddingUnitNumber = () => {
    if (inputValue.trim() !== '') {
      setCustomerFleet([...customerFleet, { UnitNumber: inputValue, customer: selectedCustomer, TaskSpecifics: [] }]);
      setInputValue('');
    }
  };

  const handleDeleteUnitNumber = (index) => {
    const updatedUnitInfo = customerFleet.filter((_, i) => i !== index);
    setCustomerFleet(updatedUnitInfo);
  };

  const handleAddUnitInfo = ({ position, specifics, treadDepth }) => {
    if (position.trim() !== '' || specifics.trim() !== '' || treadDepth.trim() !== '') {
      const updatedUnitInfo = [...customerFleet];
      const details = {
        position: position.trim(),
        specifics: specifics.trim(), 
        treadDepth: treadDepth.trim(),
      };
      updatedUnitInfo[currentUnitIndex].TaskSpecifics.push(details);
      setCustomerFleet(updatedUnitInfo);
    }
    setShowPopup(false);
  };

  const handleCustomerChange = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleNewCustomerChange = (e) => {
    setNewCustomer(e.target.value);
  };

  const handleCreateNewCustomer = () => {
    if (newCustomer.trim() !== '') {
      setCustomers([...customers, newCustomer]);
      setNewCustomer('');
    }
  };

  const submitFleet = () => {
    if (customerFleet.length > 0) {
      createFleetDatabase('fleets', customerFleet);
       setCustomerFleet([]);
    }
  };

  return (
    <div> 
      <h1>Ace Fleeting</h1>
      <div className="customers">
      {customers.map((customerName) => (
        <button
          key={customerName}
          onClick={() => handleCustomerChange(customerName)}
          className={selectedCustomer === customerName ? 'active' : ''}
        >
          {customerName}
        </button>
      ))}
        <input
          type="text"
          value={newCustomer}
          onChange={handleNewCustomerChange}
          placeholder="Enter Customer Name"
        />
        <button onClick={handleCreateNewCustomer}>Create</button>
      </div>
      <h2 className='customer'>Customer: {selectedCustomer}</h2>
      <div className='input-section'>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a Unit Number"
        className='unit-input'
      />
      <button onClick={handleAddingUnitNumber} className='add-button'>Add</button>

      </div>
      <ul className="unit-list">
       
        {customerFleet.map((unit, index) => {
          if (selectedCustomer === 'All' || unit.customer === selectedCustomer) {
            return (
              <li key={index} className='unit-card'>
                <strong>Unit Number:</strong>{unit.UnitNumber}
                <button
                  onClick={() => {
                    setCurrentUnitIndex(index);
                    setShowPopup(true);
                  }}
                >
                  Add Specifics
                </button>
                <ul>
                
                  {unit.TaskSpecifics.map((details, subIndex) => (
                    <li key={subIndex}>
                      <strong>Position:</strong> {details.position}, <strong>Specifics:</strong> {details.specifics}, <strong>Tread Depth:</strong> {details.treadDepth}/32
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleDeleteUnitNumber(index)}>Delete</button>
              </li>
              
            );
            
          }
          return null;
        })}
      </ul>

      
      {showPopup && (
        <>
          <div className="overlay" onClick={() => setShowPopup(false)} />
          <div className="specifics-popup">
            <FleetSpecifics onClose={() => setShowPopup(false)} onSave={handleAddUnitInfo} />
          </div>
        </>
      )}
      <button onClick={submitFleet}>submit</button>


    </div>
  );
};

export default FleetForm;