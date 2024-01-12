import React, { useState } from 'react';

function MainScreen() {
    const [totalbudget, setTotalBudget] = useState(2000);
    const [totalallocated, setTotalAllocated] = useState(0);
    const [totalremaining, setTotalRemaining] = useState(2000);
    const [currency, setCurrency] = useState('$');
    const default_departments = [
        {
            name: 'Human Resources',
            allocated: 0,
        },
        {
            name: 'Marketing',
            allocated: 0,
        },
        {
            name: 'Finance',
            allocated: 0,
        },
        {
            name: 'IT',
            allocated: 0,
        },
        {
            name: 'Sales',
            allocated: 0,
        },
    ];
    const [departments, setDepartments] = useState(default_departments);
    const changeBudget = (value) => {
        if(value < 0){
            return;
        }
        setTotalBudget(value);
        setTotalRemaining(value - totalallocated);
    };
    const changeAllocation = (value, index) => {
        if(value > totalremaining){
            return;
        }
        
        if(value < 0) 
        {
            value = Math.min(value, -1 * departments[index].allocated);
        }
        const department = departments[index];
        department.allocated += value;
        const newDepartments = [...departments];
        newDepartments[index] = department;
        setDepartments(newDepartments);
        setTotalAllocated(totalallocated + value);
        setTotalRemaining(totalremaining - value);
    };
    return (
        <div>
            <div className='header'>Company's Budget Allocation</div>
            <div className='budget-overview-grid'> 
                <div>
                    <input type = "text" value={totalbudget}></input>
                    </div> 
                    </div>
            <div> Allocation </div>
            {departments.map((department, index) => (  
                <div> 
                    <div> {department.name} </div>
                    <div> {department.allocated} </div>
                    <div onClick={e => changeAllocation(10, index)}></div>
                    <div onClick={e => changeAllocation(-10, index)}>  </div>
                    <div>  </div>
                </div>
            ))}
            <div> Change Allocation </div>
            <div> 
                <div> Department </div>
                <select>
                    {departments.map((department, index) => (
                        <option value={department.name}>{department.name}</option>
                    ))}
                </select>
                <div> Add Allocation </div>
                <div>  </div>     
            </div>
        </div>
    );
}

export default MainScreen;
