import React, { useContext, useState } from 'react';
import './fleetForm.css'
import FleetSpecifics from './FleetSpecifics';
import { createFleetDatabase } from '../../utilis/Firebase';
import { signOut } from 'firebase/auth';
import { auth } from '../../utilis/Firebase';
import { AuthContext } from '../context/AuthContext';



  const FleetForm = () => {
    const [customerFleet, setCustomerFleet] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [newCustomer, setNewCustomer] = useState('');
    const [priority, setPriority] = useState('low')
    const [customers, setCustomers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [currentUnitIndex, setCurrentUnitIndex] = useState(null);

    const {currentUser} = useContext(AuthContext)
  

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddingUnitNumber = () => {
    if (inputValue.trim() !== '') {
      const newUnit = { UnitNumber: inputValue, customer: selectedCustomer, TaskSpecifics: [], priority };
      setCustomerFleet([...customerFleet, newUnit].sort((a, b) => {
        const priorityOrder = { low: 3, medium: 2, high: 1 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }));
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
      <div className='current-user'>
        <p className='username'>Welcome, {currentUser.displayName}</p>        
        <button onClick={()=>signOut(auth)} className='logout'>Log Out</button>
      </div>
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
      </div>
      <div className='customer-creation'>
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
      <select onChange={(e) => setPriority(e.target.value)} value={priority}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
      </select>
      <button onClick={handleAddingUnitNumber} className='add-button'>Add</button>

      </div>
      <ul className="unit-list">
       
        {customerFleet.map((unit, index) => {
          if (selectedCustomer === 'All' || unit.customer === selectedCustomer) {
            return (
              <li key={index} className={`unit-card priority-${unit.priority}`}>
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
      <button className='submission-button' onClick={submitFleet}>submit</button>


    </div>
  );
};

export default FleetForm;