import React from 'react';
import Navigation from "../Components/Navigation";

function NotFound(props) {
    return (
        <div>
            <Navigation />
            <h1 style={{textAlign:"center"}}>Error 404 : Page Not Found</h1>
        </div>
    );
}

export default NotFound;