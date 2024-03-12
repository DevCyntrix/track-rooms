import React, { useState } from 'react';
import Header from '../header/Header';
import DropDown from "../dropdown/DropDown";
import Footer from '../footer/Footer';
import './FirstPage.css';

function FirstPage() {
    const [openAccordionId, setOpenAccordionId] = useState(null);

    const handleAccordionClick = (id) => {
        setOpenAccordionId(id);
    };

    return (
        <div className='firstpage'>
            <div>
                <header>
                    <Header />
                </header>
            </div>
            <div className="content">
                <DropDown 
                    id="1" 
                    labelText="Gebäude" 
                    open={openAccordionId === "1"}
                    onClick={handleAccordionClick}
                >
                    <h3>6A</h3>
                    <h3>6B</h3>
                </DropDown>
            </div>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default FirstPage;
