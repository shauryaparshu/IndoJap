import Script from 'next/script';
import React from 'react';

type AdsenseTypes ={
    pid:string;
}

const AdSense = ({pid}: AdsenseTypes) => {
    return(
        <Script
            async 
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7913230536929786`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
            />
    )
}

export default AdSense;