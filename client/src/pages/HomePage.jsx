import React from "react";
import TypingAnimation from "../components/TypingAnimation";
import "../styles/HomePage.css";
import blueQR from "../assets/blue-QR.svg";
import barcodeIcon from "../assets/bl-barcode.svg";
import blueUrl from "../assets/blue-url.svg";

const HomePage = () => {
  const wordsToAnimate = ["URL", "QR Code", "Barcode"];
const floatingIcons = [
  { src: blueQR, alt: "QR", top: "15%", left: "25%" },
  { src: barcodeIcon, alt: "Barcode", top: "15%", left: "70%" },

  { src: blueUrl, alt: "URL", top: "35%", left: "10%" },

  { src: blueQR, alt: "QR", top: "35%", left: "85%" },

  { src: barcodeIcon, alt: "Barcode", top: "65%", left: "15%" },
  { src: blueUrl, alt: "URL", top: "65%", left: "75%" },

  { src: blueQR, alt: "QR", top: "80%", left: "30%" },
  { src: barcodeIcon, alt: "Barcode", top: "80%", left: "65%" },
];

  return (
    <>
      <header className="site-header">
        <h1>PixelForge</h1>
      </header>

      <main>
        <section className="hero">
          <h2>PixelForge</h2>

          {/* Floating icons */}
          {floatingIcons.map((icon, index) => (
            <div
              key={index}
              className="floating-icon"
              style={{ top: icon.top, left: icon.left }}
            >
              <img src={icon.src} alt={icon.alt} />
            </div>
          ))}

          <div className="tagline">
            <p>
              Generate - <TypingAnimation words={wordsToAnimate} />
            </p>
          </div>
        </section>

        <section className="content-section">
          <p>Working here on the tab interface</p>
        </section>
      </main>
    </>
  );
};

export default HomePage;
