import {React, useState} from "react";
import '../styles/Shortener.css';
import {QRCodeCanvas} from "qrcode.react";
const QRGenerator = () => {
  const [contentType, setContentType] = useState("url");
  const [userInput, setUserInput] = useState("");
  const [qrcodeData, setQrCodeData] = useState("");
  const [error, setError] = useState("");
  
  //funtion to handle QR code generation
  const handleQrCode = (e) => {
    e.preventDefault();
    setError("");
    if(contentType === "url"){
      if(!(userInput.startsWith("http://") || userInput.startsWith("https://"))) {
        setError("Please enter a valid URL starting with http:// or https://");
        return;
      }
      try {
      new URL(userInput);
      } catch {
        setError("Please enter a valid URL");
        return;
      }
      setQrCodeData(userInput);
    }
    else if(contentType === "text"){
      if(userInput.trim() === "") {
        setError("Please enter some text");
        return;
      }
      setQrCodeData(userInput);

  }
};
  return (
    <div className="qr-generator">
      <div className="main-section">
          <div style={{ display: "flex", gap: "15px" }}>
                    <button type="button"  className="btn action-btn">
                      Content
                    </button>
                    
                    <button type="button"  className="btn action-btn">
                      Customize
                    </button>
                    <button type="button" className="btn action-btn">
                      Download
                    </button>
          </div>
          <form className="input-section" onSubmit={ handleQrCode}>
            <label htmlFor="contentInput" style={{paddingTop:"2rem"}}>Select Content Type:</label>
              <select id="contentType" onChange={(e) => setContentType(e.target.value)} value={contentType} >
                          <option value="url">url</option>
                          <option value="text">text</option>
                          <option value="wifi">wifi</option>
              </select>
              <label htmlFor="contentInput" style={{paddingTop:"2rem"}}>Enter Content:</label>
                        <input 
                          type="text" 
                          id="contentInput"
                          placeholder="Enter content..."
                          required
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                        />
                        <button type="submit" className="btn submit-btn">
                          Generate QR Code
                        </button>
          </form>
          
          {error && <p className="error-message">{error}</p>}

      </div>
      <div className="main-section">
        
        <div className="qr-display" style={{ display: "flex", justifyContent: "center", alignItems: "center",height: "100%" }}>
          {qrcodeData && (

              <QRCodeCanvas
                value={qrcodeData} 
                size={300}
              />
          )}
              
        </div>
          
      </div>
    </div>
  );
};

export default QRGenerator;