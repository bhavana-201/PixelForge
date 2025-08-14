import {React, useState, useEffect, useMemo} from "react";
import "../styles/Shortener.css";
import JSBarCode from "jsbarcode";

const BarGenerator = () => {
  const [error, setError] = useState("");
  const [format, setFormat] = useState("code128");
  const [userInput, setUserInput] = useState("");
  const [barCodeData, setBarCodeData] = useState("");

  const regexRules = useMemo(() => ({
  code128: /^[\x20-\x7E]+$/,       // All printable ASCII
  code39: /^[0-9A-Z. $/+%-]+$/,
  ean13: /^\d{12}$/,               // First 12 digits, checksum later
  upca: /^\d{11}$/,                // First 11 digits, checksum later
  itf: /^\d{2,}$/                  // Pairs of digits
  }), [])


  // Function to handle bar code generation
  const handleBarCode = (e) => {
    e.preventDefault();
    setError("");
    if(userInput.trim() === "") {
      setError("Please enter some content for the bar code");
      return;
    }
    else{
      const userData = userInput.trim();
      if(!(regexRules[format].test(userData) )) {
        setError(`Invalid content for ${format} format. Please follow the rules.`);
        setBarCodeData("");
        return;
      }
      else{
        setBarCodeData(userData);
        setError("");
      }
    }
  }
    
  useEffect(() => {
    if (!barCodeData) return;

    const checks = {
      itf: (data) => data.length % 2 === 0, // ITF requires even number of digits
      ean13: (data) => data.length === 12, // EAN-13 requires 12 digits before checksum
      upca: (data) => data.length === 11, // UPC-A requires 11 digits before checksum
    };
    const isValid = regexRules[format].test(barCodeData) && (checks[format] ? checks[format](barCodeData) : true);
            
    if(isValid){
      try{
        JSBarCode("#barcode", barCodeData, {
          format: format,
          displayValue: true,
      });
    }catch (error) {
        console.error("Error generating bar code:", error);
        setError("Failed to generate bar code. Please try again.");
      }
    } else {
      setError(`Invalid content for ${format} format. Please follow the rules.`);
      setBarCodeData("");
    } 
  }, [barCodeData,regexRules, format]);
  return (
    <div className="qr-generator">
      <div className="main-section">
          <div style={{ display: "flex", gap: "15px" }}>
                    <button type="button"  className="btn action-btn">Content</button>
                    <button type="button"  className="btn action-btn">Customize</button>
                    <button type="button" className="btn action-btn"> Download</button>
          </div>  
          <form className="input-section" onSubmit={handleBarCode}>
            <label htmlFor="CodeType" style={{paddingTop:"2rem"}}>Format:</label>
            <select id="selectType" className="form-select" onChange={(e) => setFormat(e.target.value)} value={format}>
              <option value="code128">Code 128</option>
              <option value="code39">Code 39</option>
              <option value="ean13">EAN-13</option> 
              <option value="upca">UPC-A</option>
              <option value="itf">ITF</option>
            </select>
            <label htmlFor="contentInput" style={{paddingTop:"2rem"}}>Enter Content:</label>
            <input 
              type="text" 
              id="contentInput" 
              className="form-input" 
              placeholder="Enter content for bar code" 
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
              required
            />
            <button type="submit" className="btn submit-btn">Generate Bar Code</button>

          </form>        
          {error && <p className="error-message">{error}</p>}
      </div>
      <div className="main-section">
        <div className="output-display" style={{ display: "flex", justifyContent: "center", alignItems: "center",height: "100%" }}>
         <svg id="barcode"></svg>
        </div>
                
      </div>
    </div>
  );
};


export default BarGenerator;