import React, { useState } from 'react';
import './mainscreen.css'
function MainScreen() {
    const [totalbudget, setTotalBudget] = useState(2000);
    const [totalallocated, setTotalAllocated] = useState(0);
    const [totalremaining, setTotalRemaining] = useState(2000);
    const [currency, setCurrency] = useState('$');
    const [currencytext, setCurrencyText] = useState('($ Dollar)');
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
    const deleteDepartment = (index) =>{

    };
    const handleBudgetChange = e =>{
        if(e.target.value > totalbudget){
            if(totalbudget >= 20000){
                return;
            }
            changeBudget(totalbudget + 10);
        }
        else{
            if(totalbudget <= 0 || totalbudget <= totalallocated){
                return;
            }
            changeBudget(totalbudget - 10);
        }
    }
    const handleCurrencyChange = e =>{
        setCurrencyText(e.target.value);
        setCurrency(texttocurrency[e.target.value]);
    }
    const texttocurrency = {
        "($ Dollar)": '$',
        "(€ Pound)": '€',
        "(£ Euro)": '£',
        "(₹ Ruppee)": '₹',
        
    }
    return (
        <div>
            <div className='header'>Company's Budget Allocation</div>
            <div className='budget-overview-grid'> 
                <div className='set-budget-section'>
                    <div className='set-budget-text'> Budget {currency}</div>
                    <input class = "budget-input" type = "number" value={totalbudget} onChange={handleBudgetChange}></input>
                </div> 
                <div className='remaining-budget'>Remaining budget: {currency} {totalremaining} </div>
                <div className = "spent-budget"> Spent so far: {currency} {totalallocated}</div>
                <div className='currency-select-wrapper'>
                    <p className='currency-select-text'> Currency: </p>
                    <select className = "currency-select" value={currencytext} onChange={handleCurrencyChange}>
                        
                        <option value = "($ Dollar)"> $ Dollar </option>
                        <option value= "(€ Pound)"> € Pound </option>
                        <option value= "(£ Euro)"> £ Euro </option>
                        <option value= "(₹ Ruppee)"> ₹ Ruppee </option>

                    </select>
                </div>
            </div>
            <div className='allocation-header'> Allocation </div>
            {departments.map((department, index) => (  
                <div className='allocation'> 
                    <div className='allocation-name'> {department.name} </div>
                    <div className='allocation-amount'> {currency}{department.allocated} </div>
                    <div className = "increment-btn" onClick={e => changeAllocation(10, index)}> + </div>
                    <div className = "decrement-btn" onClick={e => changeAllocation(-10, index)}> - </div>
                    <div className = "cancel-btn" onClick={e => changeAllocation(-1 * departments[index].allocated,index)}> X </div>
                </div>
            ))}
            <div className='change-allocation-header'> Change Allocation </div>
            <div classname = "change-allocation-section"> 
                <label className='change-allocation-label'> Department </label>
                <select className='change-allocation-select'>
                    {departments.map((department, index) => (
                        <option value={department.name}>{department.name}</option>
                    ))}
                </select>
                <div>
                    <label className='change-allocation-label'> Add Allocation </label>
                    <select className='change-allocation-select'>
                        <option value="Add"> Add </option>
                        <option value="Subtract"> Subtract </option>
                    </select>
                </div>
                <input type = "number" className='spent-input'></input>
                <div className='save-btn'> Save </div>     
            </div>
        </div>
    );
}

export default MainScreen;
