import React, { useEffect, useState } from 'react';
import { db } from '../../utilis/Firebase';
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore';
import './fleetList.css'
const FleetList = () => {
  const [FleetsFromFirestore, setFleetsFromFirestore] = useState([]);
  const [showCustomerCategory, setShowCustomerForCategory] = useState(null);

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


  // Function to handle marking a todo as done
  const handleDone = async (UnitId, isDone) => {
    try {
      const todoRef = doc(db, 'fleets', UnitId);
      await updateDoc(todoRef, {
        done: isDone,
      });
      // Refresh the todos list after update
      const updatedTask = FleetsFromFirestore.map((unit) =>
        unit.id === UnitId ? { ...unit, done: isDone } : unit
      );
      setFleetsFromFirestore(updatedTask);
    } catch (error) {
      console.error('Error marking todo as done: ', error);
    }
  };

  // Organize todos by category
  const ByCustomer = {};
  FleetsFromFirestore.forEach((unit) => {
    if (!ByCustomer[unit.customer]) {
      ByCustomer[unit.customer] = [];
    }
    ByCustomer[unit.customer].push(unit);
  });



  // Calculate progress for each category
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

  return (
    <div>
      <h2>Todos from Firestore - Organized by Category</h2>
      <div className="category-cards">
        {Object.keys(ByCustomer).map((Fleetcustomer) => (
          <div key={Fleetcustomer} className="category-card">
            <div
              onClick={() => toggleCustomerForCategory(Fleetcustomer)}
              className={`category-header ${showCustomerCategory === Fleetcustomer ? 'active' : ''}`}
            >
              <h3>{Fleetcustomer}</h3>
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
                {ByCustomer[Fleetcustomer].map((unit) => (
                  <li key={unit.id} className={`unit-item ${unit.done ? 'done' : ''}`}>
                    <input
                      type="checkbox"
                      checked={unit.done || false}
                      onChange={(e) => handleDone(unit.id, e.target.checked)}
                    />
                    <strong>Unit Number:</strong> {unit.text}
                    {/* Render other properties here */}
                    <ul>
                      {unit.subtasks &&
                        unit.subtasks.length > 0 &&
                        unit.subtasks.map((info, index) => (
                          <li key={index}>
                            <strong>Position:</strong> {info.position}, <strong>Specifics:</strong>{' '}
                            {info.specifics}, <strong>Tread Depth:</strong> {info.treadDepth}
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
