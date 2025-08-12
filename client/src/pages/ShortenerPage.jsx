import React, { useState } from "react";
import { nanoid } from "nanoid";
import {QRCodeCanvas} from "qrcode.react"; 
import '../styles/Shortener.css'; 
const ShortenerPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState("");
  const [showQR, setShowQR] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setShowQR(false);

    if (!longUrl) {
      setError("Please enter a URL");
      return;
    }
    if (!(longUrl.startsWith("http://") || longUrl.startsWith("https://"))) {
      setError("Please enter a valid URL starting with http:// or https://");
      return;
    }
    try {
      new URL(longUrl);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    const generatedShort = `https://pixel.com/${customUrl ? customUrl : nanoid(4)}`;
    setShortUrl(generatedShort);
  };

  // Function to copy the shortened URL to clipboard 
  // using the Clipboard API along with async/await
  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl)
        .then( alert("Shortened URL copied to clipboard!"))
        .catch((err) => {
          console.error("Failed to copy: ", err);
          setError("Failed to copy URL");
        });
    }
  };

  const handleRedirect = () => {
    if (shortUrl) {
      window.open(shortUrl, "_blank");
    }
  };

  const toggleQR = () => {
    setShowQR((state) => !state);
  };

  return (
    <> 
        <section className="url-section">
          <form onSubmit={handleSubmit}>
            <div className="input-section">
              <label htmlFor="urlInput">Enter Long URL:</label>
              <input
                type="text"
                id="urlInput"
                placeholder="Enter Url..."
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
              />

              <label htmlFor="customUrl">Customize your URL</label>
              <input
                type="text"
                id="urlOpt"
                placeholder="Optional..."
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
              />

              <button type="submit" className="btn submit-btn">
                Shorten URL
              </button>

              {error && <p className="error">{error}</p>}

              {shortUrl && (
                <>
                {/* Displays the shortened URL and options */}
                  <p className="short-url">
                    Shortened URL:{"  "}
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                      {shortUrl}
                    </a>
                  </p>

                  <div style={{ display: "flex", gap: "15px", marginTop: "12px" }}>
                    <button type="button" onClick={handleRedirect} className="btn action-btn">
                      Redirect
                    </button>
                    <button type="button" onClick={handleCopy} className="btn action-btn">
                      Copy
                    </button>
                    <button type="button" onClick={toggleQR} className="btn action-btn">
                      {showQR ? "Hide QR" : "Show QR"}
                    </button>
                  </div>

                </>
              )}
            </div>
          </form>
        </section>
        <section className="qr-section">

          {showQR && (
                    <div style={{ display:"flex", justifyContent:"", marginTop: "15px" }}>
                      <QRCodeCanvas value={shortUrl} size={150} />
                    </div>
                  )}
        </section>
    </>
  );
};

export default ShortenerPage;
