import {React, useState} from "react";
import '../styles/Shortener.css';
import {QRCodeCanvas} from "qrcode.react";
const QRGenerator = () => {
  const [contentType, setContentType] = useState("url");
  const [userInput, setUserInput] = useState("");
  const [qrcodeData, setQrCodeData] = useState("");
  const [error, setError] = useState("");
  const [ssid, setSSID] = useState("");
  const [pswd, setPswd] = useState("");
  const [encryption, setEncryption] = useState("WPA");
  const [hidden, setHidden] = useState(false);
  
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
    else{
      // Handle WiFi QR code generation
      if(ssid.trim() === "" || pswd.trim() === "") {
        setError("Please enter both SSID and Password for WiFi QR code");
        return;
      }
      const wifiData = `WIFI:T:${encryption};S:${ssid};P:${pswd};H:${hidden ? "true" : "false"};;`;
      setQrCodeData(wifiData);

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
          <form className="input-section" onSubmit={handleQrCode}>
            <label htmlFor="contentInput" style={{paddingTop:"2rem"}}>Select Content Type:</label>
              <select id="selectType" onChange={(e) => setContentType(e.target.value)} value={contentType} >
                          <option value="url">url</option>
                          <option value="text">text</option>
                          <option value="wifi">wifi</option>
              </select>
              {contentType === "wifi" ? 
                <div className="wifi-div" style={{paddingTop:"2rem"}}>
                  <label htmlFor="ssid">Network Name (SSID):</label>
                  <input 
                    type="text" 
                    id="ssid"
                    placeholder="Enter WiFi SSID"
                    value={ssid}
                    onChange={(e) => setSSID(e.target.value)}
                    required
                  />
                  <label htmlFor="pswd">Password:</label>
                  <input type="text" id="pswd" placeholder="Enter WiFi password" value={pswd} onChange={(e) => setPswd(e.target.value)} />
                    <label htmlFor="encrypt">Encryption Type :</label>
                    <select id="selectType" onChange={(e) => setEncryption(e.target.value)} value={encryption}>
                    <option value="WPA">WPA</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None</option> 
                    </select>
                    <label htmlFor="hidden">Hidden: <input type="checkbox" id="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} /></label>
                </div> :
                ( 
                  <div className="text-div" >
                    <label htmlFor="contentInput" style={{paddingTop:"2rem"}}>Enter Content:</label>
                    <input 
                      type="text" 
                            id="contentInput"
                            placeholder="Enter content..."
                            required
                            value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                    />
                  </div>
                )}
              <button type="submit" className="btn submit-btn">Generate QR Code</button>
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