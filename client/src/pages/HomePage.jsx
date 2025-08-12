import React from "react";
import TypingAnimation from "../components/TypingAnimation";
import "../styles/HomePage.css";
import blueQR from "../assets/blue-QR.svg";
import barcodeIcon from "../assets/bl-barcode.svg";
import blueUrl from "../assets/blue-url.svg";
import ShortenerPage from "./ShortenerPage";

const floatingIcons = [
  { src: blueQR, alt: "QR Code icon", top: "15%", left: "25%" },
  { src: barcodeIcon, alt: "Barcode icon", top: "15%", left: "70%" },
  { src: blueUrl, alt: "URL icon", top: "35%", left: "10%" },
  { src: blueQR, alt: "QR Code icon", top: "35%", left: "85%" },
  { src: barcodeIcon, alt: "Barcode icon", top: "65%", left: "15%" },
  { src: blueUrl, alt: "URL icon", top: "65%", left: "75%" },
  { src: blueQR, alt: "QR Code icon", top: "80%", left: "30%" },
  { src: barcodeIcon, alt: "Barcode icon", top: "80%", left: "65%" },
];

const FloatingIcon = ({ src, alt, top, left }) => (
  <div
    className="floating-icon"
    style={{ top, left }}
    role="img"
    aria-label={alt}
  >
    <img src={src} alt={alt} loading="lazy" />
  </div>
);

const HomePage = () => {
  const wordsToAnimate = ["URL", "QR Code", "Barcode"];
  const [activeTab, setActiveTab] = React.useState("url");
  return (
    <>
      <header className="site-header" >
        <h1>PixelForge</h1>
      </header>

      <main role="main">
        <section className="hero">
          <h2>PixelForge</h2>

          {floatingIcons.map((icon, index) => (
            <FloatingIcon
              key={`${icon.alt}-${index}`}
              src={icon.src}
              alt={icon.alt}
              top={icon.top}
              left={icon.left}
            />
          ))}

          <div className="tagline">
            <p>
              Generate - <TypingAnimation words={wordsToAnimate} />
            </p>
          </div>
        </section>

        <section className="content-section">
          <section className="buttons-section"> 
            <button className="btn url-btn" onClick={() => setActiveTab("url")}>Url</button>
            <button className="btn qr-btn" onClick={() => setActiveTab("qr")}>QR Code</button>
            <button className="btn barcode-btn" onClick={() => { setActiveTab("bar")}}>BarCode</button>
          </section>
          <article className="tabs-section">
            {activeTab === "url" && <ShortenerPage/>}
            {activeTab === "qr" && (
              <section className="QR-section">
                <h3>QR</h3>
                <p>Generate QR codes</p>
              </section>
            )}
            {activeTab === "bar" && (
              <section className="BarCode-section">
                <h3>BARCODE</h3>
                <p>Generate Barcodes</p>
              </section>
            )}
          </article>
        </section>
      </main>
      <footer className="site-footer" role="contentinfo">
        <p>&copy; PixelForge. All rights reserved.</p>
      </footer>
    </>
  );
};

export default HomePage;