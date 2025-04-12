import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import quotes from '../src/quotes.js';

function App() {
  const noReturn = (exclude) => {
    let random;
    do {
      random = Math.floor(Math.random() * quotes.length);
    } while (quotes[random] === exclude);
    return quotes[random];
  };

  const [quote, setQuote] = useState(noReturn());
  const genQuotes = () => setQuote(noReturn(quote));

  // Mouse Position
  const targetPos = useRef({ x: 0, y: 0 });
  const jetPos = useRef({ x: 0, y: 0 });
  const jetRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animateJet = () => {
      const speed = 0.1; // Lower = smoother
      jetPos.current.x += (targetPos.current.x - jetPos.current.x) * speed;
      jetPos.current.y += (targetPos.current.y - jetPos.current.y) * speed;

      if (jetRef.current) {
        jetRef.current.style.left = `${jetPos.current.x}px`;
        jetRef.current.style.top = `${jetPos.current.y}px`;
      }

      requestAnimationFrame(animateJet);
    };

    animateJet(); // Start animation loop

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
    <img src="/iaf.webp" alt="IAF-logo" className="logo"/>
    <img src="/iaf-logo.png" alt="IAF-logo" className="iaf-logo"/>
    <div className="app">
      <img src="/jet.png" alt="jet" className="fighter-jet" ref={jetRef}/>
      <h2 className="text">"{quote.text}"</h2>
      <p> — {quote.author}</p>
      <button className="btn" onClick={genQuotes}>🔁 New Quote</button>
    </div>
    <footer className="iaf-footer">
      <p className="motto">" नभः स्पृशं दीप्तम् "</p>
      <div className="jet-trail"></div>
    </footer>
    </>
    
  );
}

export default App;
