import React, { useEffect, useRef, useState } from 'react';
import '../App.css'

const TextToVoice = () => {
  const [voices, setVoices] = useState([]);
  const speech = useRef(new SpeechSynthesisUtterance());
  const textRef = useRef(null);

  useEffect(() => {
    const populateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        speech.current.voice = availableVoices[0]; 
      }
    };

    window.speechSynthesis.onvoiceschanged = populateVoices;
    populateVoices(); 
  }, []);

  const handleVoiceChange = (e) => {
    speech.current.voice = voices[e.target.value]; 
  }; 

  const handleSpeech = () => {
    const text = textRef.current.value.trim();
    if (text === '') {
      alert('Please enter some text');
    } else {
      speech.current.text = text;
      window.speechSynthesis.speak(speech.current);
    }
  };
  return (
    <>
      <div className="hero">
        <h1>
          Text to Speech <span>Converter</span>
        </h1>
        <textarea id='textarea' ref={textRef} placeholder="Write anything here..."></textarea>
        <div className="row">
          <select onChange={handleVoiceChange}>
            {voices.map((voice, index) => (
              <option key={index} value={index}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
          <button className="btm" onClick={handleSpeech}>
            <i className="fa-solid fa-play"></i>Listen
          </button>
        </div>
      </div>
    </>
  );
};

export default TextToVoice;
