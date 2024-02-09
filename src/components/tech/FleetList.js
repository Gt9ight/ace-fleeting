import React, { useEffect, useState, useContext } from 'react';
import { db, auth } from '../../utilis/Firebase';
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';
import './fleetList.css'
const FleetList = () => {
  const [FleetsFromFirestore, setFleetsFromFirestore] = useState([]);
  const [showCustomerCategory, setShowCustomerForCategory] = useState(null);

  const {currentUser} = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'fleets'));
        const fetchedFleet = [];
        querySnapshot.forEach((doc) => {
          fetchedFleet.push({ id: doc.id, ...doc.data() });
        });
        setFleetsFromFirestore(fetchedFleet);
      } catch (error) {
        console.error('Error fetching documents: ', error);
      }
    };

    fetchData();
  }, []);


  
  const handleDone = async (UnitId, isDone) => {
    try {
      const todoRef = doc(db, 'fleets', UnitId);
      await updateDoc(todoRef, {
        done: isDone,
      });
     
      const updatedTask = FleetsFromFirestore.map((unit) =>
        unit.id === UnitId ? { ...unit, done: isDone } : unit
      );
      setFleetsFromFirestore(updatedTask);
    } catch (error) {
      console.error('Error marking todo as done: ', error);
    }
  };

 
  const ByCustomer = {};
  FleetsFromFirestore.forEach((unit) => {
    if (!ByCustomer[unit.customer]) {
      ByCustomer[unit.customer] = [];
    }
    ByCustomer[unit.customer].push(unit);
  });



 
  const getCustomerProgress = (cust) => {
    const totalTodos = ByCustomer[cust]?.length || 0;
    const completedTodos = ByCustomer[cust]?.filter((unit) => unit.done).length || 0;

    return totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;
  };

  const toggleCustomerForCategory = (cust) => {
    if (showCustomerCategory === cust) {
      setShowCustomerForCategory(null);
    } else {
      setShowCustomerForCategory(cust);
    }
  };

  const getCustomerFleetCount = (cust) => {
    return ByCustomer[cust]?.length || 0;
  };

  const getCustomerCompletedCount = (cust) => {
    return ByCustomer[cust]?.filter((unit) => unit.done).length || 0;
  };

  return (
    <div>
      <div className='current-user'>
        <p className='username'>Welcome, {currentUser.displayName}</p>        
        <button onClick={()=>signOut(auth)} className='logout'>Log Out</button>
      </div>
      <h2 className='fleetList-title'>Fleets</h2>
      <div className="category-cards">
        {Object.keys(ByCustomer).map((Fleetcustomer) => (
          <div key={Fleetcustomer} className="category-card">
            <div
              onClick={() => toggleCustomerForCategory(Fleetcustomer)}
              className={`category-header ${showCustomerCategory === Fleetcustomer ? 'active' : ''}`}
            >
               <h3>{Fleetcustomer} - {getCustomerCompletedCount(Fleetcustomer)}/{getCustomerFleetCount(Fleetcustomer)}Units</h3>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${getCustomerProgress(Fleetcustomer)}%` }}
                ></div>
              </div>
              <p>{getCustomerProgress(Fleetcustomer).toFixed(2)}% Complete</p>
            </div>
            {showCustomerCategory === Fleetcustomer && (
              <ul className="fleet-list">
                {ByCustomer[Fleetcustomer]
                  .sort((unitA, unitB) => {
                  const priorityOrder = { low: 3, medium: 2, high: 1 };
                  return priorityOrder[unitA.priority] - priorityOrder[unitB.priority];
              }).map((unit) => (
                  <li key={unit.id} className={`unit-item ${unit.done ? 'done' : ''} ${unit.priority}`}>
                    <input
                      type="checkbox"
                      checked={unit.done || false}
                      onChange={(e) => handleDone(unit.id, e.target.checked)}
                    />
                    <strong>Unit Number:</strong> {unit.UnitNumber}
                   
                    <ul>
                      {unit.TaskSpecifics &&
                        unit.TaskSpecifics.length > 0 &&
                        unit.TaskSpecifics.map((info, index) => (
                          <li key={index}>
                            <strong>Position:</strong> {info.position}, <strong>Specifics:</strong>{' '}
                            {info.specifics}, <strong>Tread Depth:</strong> {info.treadDepth}/32
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FleetList;
