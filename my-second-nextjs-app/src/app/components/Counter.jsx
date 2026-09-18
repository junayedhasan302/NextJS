'use client'
import React, { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);
    console.log("Counter component rendered!");
    const handleIncrease = () =>{
        console.log("Clicked!");
        setCount(count+1);
    }
    return (
        <div>
            <h2 className='text-4xl font-bold mb-4'>Counter: {count}</h2>
            <button onClick={handleIncrease}
            className='bg-violet-500 text-white font-bold hover:bg-violet-700 py-2 px-4 rounded-xl'>Increase!</button>
        </div>
    );
};

export default Counter;