import React from "react";

function AdminTabPanel(props) {
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

export default AdminTabPanel;