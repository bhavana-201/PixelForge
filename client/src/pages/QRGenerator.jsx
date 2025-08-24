import {React, useEffect, useRef, useState} from "react";
import '../styles/Shortener.css';
import '../styles/qrgen.css'
import QRCodeStyling from "qr-code-styling";
import StepperStyle from '../components/StepperStyle';
import sharp from '../assets/sharp.svg'
import round from '../assets/round.svg'
import dot from '../assets/dot.svg'
import squareBorder from '../assets/squareBorder.png'
import dotBorder from '../assets/dotBorder.png'
import xround from '../assets/XroundBorder.png'
import roundCenter from '../assets/roundCenter.svg'
import squareCenter from '../assets/squareCenter.svg'
const QRGenerator = () => {
  const [qrContentType, setQrContentType] = useState("url");
  const [userInput, setUserInput] = useState("");
  const [qrcodeData, setQrCodeData] = useState("");
  const [error, setError] = useState("");
  const [ssid, setSSID] = useState("");
  const [pswd, setPswd] = useState("");
  const [encryption, setEncryption] = useState("WPA");
  const [hidden, setHidden] = useState(false);
  const [featureBtns, setFeatureBtns] = useState('content');
  const [qrCustom, setQrCustom] = useState('Style');
  const [style, setStyle] = useState("sharp");
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fgColor, setFgColor] = useState('#000000'); 
  const [corner, setCorner] = useState('square');
  const [cornerDot, setCornerDot] = useState('square');
  const [level, setLevel] = useState('Q');
  
  const ref = useRef(null);
  //funtion to handle QR code generation
  useEffect(() => {
   const qrCode = new QRCodeStyling({
      width: 400,
      height:400,
      data: qrcodeData,
      dotsOptions : {
        type: style,
        color: fgColor
      },
      backgroundOptions :{
        color: bgColor,
      },
      cornersSquareOptions:{
        type : corner,
        color : '#000000'
      },
      cornersDotOptions:{
        type: cornerDot,
        color: '#000000'
      },
      qrOptions:{
        errorCorrectionLevel : level
      }
    });
    if (ref.current) {
      ref.current.innerHTML = ""; 
      qrCode.append(ref.current);
    }
  }, [qrcodeData, style, fgColor, bgColor, corner, cornerDot, level]); 
    const handleQrCode = (e) => {
    e.preventDefault();
    setError("");
    if(qrContentType === "url"){
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
    else if(qrContentType === "text"){
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
          <div style={{ display: "flex", gap: "15px", justifyContent: "center", alignItems: "center", paddingTop: "1rem" }}>
                    <button type="button"  className="btn action-btn" onClick={() => setFeatureBtns('content')}>
                      Content
                    </button>
                    <button type="button"  className="btn action-btn" onClick={() => setFeatureBtns('customize')}>
                      Customize
                    </button>
                    
          </div>
          { featureBtns === 'content'? 
            <form className="input-section">
              <label htmlFor="contentInput" style={{paddingTop:"2rem"}}>Select Content Type:</label>
                <select id="selectType" onChange={(e) => setQrContentType(e.target.value)} value={qrContentType} >
                            <option value="url">url</option>
                            <option value="text">text</option>
                            <option value="wifi">wifi</option>
                </select>
                {qrContentType === "wifi" ? 
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
                
            </form> : 
            <div> 
              {/* users is in customize section so we display stepper style */}
              <StepperStyle qrCustom={qrCustom} setQrCustom={setQrCustom} labels={['Style', 'Border', 'Level']}/> 
              { qrCustom === 'Style' && (
                <div className="custom-section" style={{ margin:"1rem"}}>
                  <label id="style-label">Style</label>
                  <div id="qr-style" >
                    <button className="custom-btn" onClick={() => setStyle('square')}><img src= {sharp} alt="Sharp QR code style"/></button>
                    <button className="custom-btn" onClick={() => setStyle('rounded')}><img src={round} alt="Rounded QR code style"/></button>
                    <button className="custom-btn" onClick={() => setStyle('dots')}><img src={dot} alt="Dotted QR code style"/></button>
                  </div>
                  <label style={{paddingTop:"1.5rem"}}>Color</label>
                  <div id="qr-style">
                    <section className="color-section" >
                      <label className="color-label">bg</label>
                      <input className="color-input" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                      <span>{bgColor}</span>
                    </section>
                    <section className="color-section" >
                      <label className="color-label">fg</label>
                      <input className="color-input" type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} />
                      <span>{fgColor}</span>
                    </section>
                  </div>
                </div>
              )}
              { qrCustom === 'Border' && (
                <div className="custom-section" style={{ margin:"1rem"}}>
                  <label id="style-label">Border</label>
                  <div id="qr-style" >
                    {/* img btn options for 3 borders */}
                    <button className="custom-btn" onClick={() => setCorner('square')}><img src={squareBorder} alt="Square QR code style"/></button>
                    <button className="custom-btn" onClick={() => setCorner('dot')}><img src={dotBorder} alt="Dotted QR code style"/></button>
                    <button className="custom-btn" onClick={() => setCorner('extra-rounded')}><img src={xround} alt="Extra-Rounded QR code style"/></button>
                  </div>
                  <label style={{paddingTop:"1.5rem"}}>Center</label>
                  <div id="qr-style">
                    <button className="custom-btn" onClick={() => setCornerDot('square')}><img src={squareCenter} alt="Square Center"/></button>
                    <button className="custom-btn" onClick={() => setCornerDot('dot')}><img src={roundCenter} alt="Round Center"/></button>   
                  </div>
                </div>
                
              )}
              { qrCustom === 'Level' &&(
                <div className="custom-section" style={{ margin:"1rem"}}>
                  <label id="style-label">Error Correction Level</label>
                  <p style={{color:"#4f4d4dff", margin:"0", paddingBottom:"1rem", fontSize:"14px"}}>By changing the error correction level, you can simplify or complicate the QR code pattern</p>
                  <div id="qr-style" >
                    {/* 4 img btn options for error correction level L M Q H*/}
                    <button className="level-btn" onClick={() => setLevel('L')}>Low</button>
                    <button className="level-btn" onClick={() => setLevel('M')}>Medium</button>
                    <button className="level-btn" onClick={() => setLevel('Q')}>Quartile</button>
                    <button className="level-btn" onClick={() => setLevel('H')}>High</button>
                  </div>
                </div>
              )}
            </div>}
          <button type="button" onClick={handleQrCode} className="btn submit-btn">Generate QR Code</button>
          {error && <p className="error-message">{error}</p>}

      </div>
      <div className="main-section">
        <div ref={ref} className="qr-display" style={{ display: "flex", justifyContent: "center", alignItems: "center",height: "100%" }}>
          <button type="button" className="btn action-btn" onClick={() => setFeatureBtns('download')}>
            Download
            {/* add dropdown icon to let the uesr select dload type */}
          </button>
        </div>
        
          
      </div>
    </div>
  );
};

export default QRGenerator;




