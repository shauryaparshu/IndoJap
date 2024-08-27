"use client";
import React, { useEffect, useRef } from 'react';

type AdBannerProps = {
    dataAdSlot: string,
    dataAdFormat: string,
    dataFullWidthResponsive: boolean,
}

const AdBanner: React.FC<AdBannerProps> = ({ dataAdSlot, dataAdFormat, dataFullWidthResponsive }) => {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (adRef.current && !adRef.current.hasAttribute('data-adsbygoogle-status')) {
            try {
                ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            } catch (error: any) {
                console.log(error.message);
            }
        }
    }, []);

    return (
        <div ref={adRef}>
            <ins 
                className='adsbygoogle'
                style={{ display: 'block' }}
                data-ad-client="ca-pub-7913230536929786"
                data-ad-slot={dataAdSlot}
                data-ad-format={dataAdFormat}
                data-full-width-responsive={dataFullWidthResponsive.toString()}
            >
            </ins>
        </div>
    )
}

export default AdBanner;
