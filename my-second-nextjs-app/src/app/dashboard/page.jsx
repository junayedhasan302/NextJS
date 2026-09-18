import React from 'react';
import Counter from '../components/Counter';

const DashboardPage = () => {
    console.log("Dashboard Page Rendered");
    return (
        <div>
            <h2>Dashboard Page!</h2>
            <Counter/>
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        </div>
    );
};

export default DashboardPage;