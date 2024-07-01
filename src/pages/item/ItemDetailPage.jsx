import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/common/Header";

function ItemDetailPage() {
    const { id } = useParams();
    return (
        <div>
            <Header/>
            <h1>{id}</h1>
        </div>
    );
} 

export default ItemDetailPage;