import React, { useState } from 'react';
import './mainscreen.css'
function MainScreen() {
    const [totalbudget, setTotalBudget] = useState(2000);
    const [totalallocated, setTotalAllocated] = useState(0);
    const [totalremaining, setTotalRemaining] = useState(2000);
    const [currency, setCurrency] = useState('$');
    const [currencytext, setCurrencyText] = useState('($ Dollar)');
    const [spendInput, setSpendInput] = useState(0);
    const [selectedDept, setSelectedDept] = useState('Choose...');
    const [selectedOption, setSelectedOption] = useState('Add');
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
    const texttocurrency = {
        "($ Dollar)": '$',
        "(€ Pound)": '€',
        "(£ Euro)": '£',
        "(₹ Ruppee)": '₹',
        
    }
    const handleCurrencyChange = e =>{
        setCurrencyText(e.target.value);
        setCurrency(texttocurrency[e.target.value]);
    }
    const depttoindex = {
        "Human Resources": 0,
        "Marketing": 1,
        "Finance": 2,
        "IT": 3,
        "Sales": 4,
    }
    const updateAlloc = () =>{
        if(selectedDept === 'Choose...'){
            return;
        }
        if(spendInput <= 0){
            setSpendInput(0);
            return;
        }
        const department = departments[depttoindex[selectedDept]];
        if(selectedOption === "Subtract"){
            if(department.allocated < spendInput){
                setSpendInput(0);
                return;
            }
            department.allocated = department.allocated - spendInput;
            setTotalAllocated(totalallocated - spendInput);
            setTotalRemaining(totalremaining + spendInput);
        }
        else if (selectedOption === "Add"){
            if(totalremaining < spendInput){
                setSpendInput(0);
                return;
            }
            department.allocated += spendInput;
            setTotalAllocated(totalallocated + spendInput);
            setTotalRemaining(totalremaining - spendInput);
        }
        
        const newDepartments = [...departments];
        newDepartments[depttoindex[selectedDept]] = department;
        setDepartments(newDepartments);
        
        setSpendInput(0);
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
            <div className='allocation-grid'>
                <div className='allocation-grid-header'> Department </div>
                <div className='allocation-grid-header'> Allocated Budget</div>
                <div className='allocation-grid-header'> Increase by 10 </div>
                <div className='allocation-grid-header'> Decrease by 10 </div>
                <div className='allocation-grid-header'> Reset </div>
            </div>
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
            <div className = "change-allocation-section"> 
                <div>
                    <label className='change-allocation-label'> Department </label>
                    <select className='change-allocation-select' value = {selectedDept} onChange = {e => setSelectedDept(e.target.value)}>
                        <option value="Choose..."> Choose... </option>
                        {departments.map((department, index) => (
                            <option value={department.name}>{department.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className='change-allocation-label'> Add Allocation </label>
                    <select className='change-allocation-select' value={selectedOption} onChange = {e => setSelectedDept(e.target.value)}>
                        <option value="Add"> Add </option>
                        <option value="Subtract"> Subtract </option>
                    </select>
                </div>
                <div>
                    <label className='currency-label'> {currency} </label>
                    <input type = "number" className='spent-input' value={spendInput} onChange={e => setSpendInput(parseInt(e.target.value))}></input>
                </div>
                <div className='save-btn' onClick={updateAlloc}> Save </div>     
            </div>
        </div>
    );
}

export default MainScreen;
