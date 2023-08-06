import React, { useEffect, useState } from 'react';
import './style.css'
import val from './data.js'
import Footer from './Footer'
const Home = () => {
  const [inputLang, setinputLang] = useState('');
  const [outputLang, setoutputLang] = useState('');
  const [text, setText] = useState('');
  const [ans, setAns] = useState('');
  

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://text-translator2.p.rapidapi.com/translate';
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': '739a8102c1mshbf29c7d638db798p139316jsn4fcb0f69ce03',
          'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
          source_language: val[0]['languages'][inputLang.toLowerCase()],
          target_language: val[0]['languages'][outputLang.toLowerCase()],
          text: text
        })
      };
      
      try {
        const response = await fetch(url, options);
        const result = await response.text();
        const parsedData = JSON.parse(result);
        const translatedText = parsedData.data.translatedText;
        const decodedText = decodeURIComponent(JSON.parse(`"${translatedText}"`));
        setAns(decodedText);
        console.log(decodedText);
      } catch (error) {
        console.error(error);
      }
    };

    if (inputLang && outputLang && text) {
      fetchData();
    }
  }, [inputLang, outputLang, text]);

  return (
    <div>
      <form action="">
        
        <div className="heading">
          <h1>Translate</h1>
        </div>
        <div className="setup">
        
      
        <input onChange={(e) => setinputLang(e.target.value)} type="text" placeholder='Input language' value={inputLang} />
       <p> &#x2192;</p> 
        
         
        
        <input onChange={(e) => setoutputLang(e.target.value)} type="text" placeholder='Output language' value={outputLang} />
       
        </div>
        <textarea name="" id="" cols="30" rows="10" className="textInput" onChange={(e) => setText(e.target.value)} type="text" placeholder='enter input text' value={text}></textarea>
        <textarea name="" id="" cols="30" rows="10" value={text.length ?ans:''}></textarea>
      
 
        </form>
        <Footer/>
    </div>
  )
}

export default Home;
