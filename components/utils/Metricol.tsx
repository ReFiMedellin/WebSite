'use client';
import Script from 'next/script';

export const Metricol = () => {
  return (
    <div>
      <Script id='Metricol'>
        {`
     function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"88252c480963378aceab272d7fd1654c"})});
     `}
      </Script>
    </div>
  );
};
