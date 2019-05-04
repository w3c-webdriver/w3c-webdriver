import React from 'react';

// Global site tag (gtag.js) - Google Analytics
const Analytics = ({ trackingId }) => (
  <>
    <script async src={ `https://www.googletagmanager.com/gtag/js?id=${trackingId}`} />
    <script
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${trackingId}');`
      }}
    />
  </>
);

export default Analytics;
