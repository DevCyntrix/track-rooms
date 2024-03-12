import { useState } from "react";
import './App.css';

import FirstPage from './firstPage/FirstPage';



//push these nuts

function App() { 

  const[openAccordionId, setOpenAccordionId] = useState(null);

  const handleAccordionClick = (accordionId) => {
    setOpenAccordionId((prevValue) => {
      return prevValue === accordionId ? null : accordionId
    });
  };

  return (

    <div className="App">
    <FirstPage/>
    </div>
  );
}
export default App;

