import React from "react";

function TabPanel(props) {
    const { children, value, index} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`${index}`}
        > 
            {children}
        </div>
    );
}

export default TabPanel;