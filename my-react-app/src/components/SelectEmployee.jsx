// // src/components/SelectEmployee.js
// function SelectEmployee({ employees, onSelectEmployee }) {
//     return (
//       <div>
//         <label>Select Employee: </label>
//         <select onChange={(e) => onSelectEmployee(e.target.value)}>
//           <option value="">-- Select --</option>
//           {employees.map((employee) => (
//             <option key={employee} value={employee}>
//               {employee}
//             </option>
//           ))}
//         </select>
//       </div>
//     );
//   }
  
//   export default SelectEmployee;

import React from 'react';
import './SelectEmployee.css';

function SelectEmployee({ employees, onSelectEmployee }) {
  return (
    <div className="employee-grid">
      {employees.map((employee) => (
        <div key={employee} className="employee-card" onClick={() => onSelectEmployee(employee)}>
           <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6BAHlIuDPK6lkExHi1DWN6cdzB2OJkmSSMNxEhQXpLnHQ3fslHw7AqUJsZEDvu85xhWw&usqp=CAU" 
            alt={`${employee.name}`} 
            className="employee-image" 
          />
          <h3>{employee}</h3>
          <p>8856940676</p>
          <p>Customer Support</p>
        </div>
        
        
      ))}
    </div>
  );
}

export default SelectEmployee;

  