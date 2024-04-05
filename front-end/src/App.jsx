import "./App.css";
import Routing from "./utils/Routing.jsx";
import React, { useEffect } from "react";
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: "true",
        // includedLanguages: 'hi,en,mr,bh,',
        layout:
          window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
      },
      "google_translate_element"
    );
  };

  return (
    <div className="fixed-con bg-green w-full h-screen  bg-slate-400">
      <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition: Bounce 

/>
      <div
        id="google_translate_element"
        className="inline-block absolute right-0 top-3"
      ></div>

      <Routing></Routing>
    </div>
  );
};

export default App;
