import React from 'react';

export function Wallpaper() {
  return (
    <svg className="wallpaper" viewBox="0 0 1920 1080" aria-hidden="true">
      <defs>
        <linearGradient id="upper" x1=".3" x2=".63" y1="0" y2="1">
          <stop stopColor="#202e13"/>
          <stop offset=".58" stopColor="#293e08"/>
          <stop offset="1" stopColor="#0a1701"/>
        </linearGradient>
        <linearGradient id="right" x1=".13" x2="1" y1=".15" y2=".84">
          <stop stopColor="#060b02"/>
          <stop offset=".53" stopColor="#222d04"/>
          <stop offset="1" stopColor="#1a2904"/>
        </linearGradient>
        <linearGradient id="fold" x1=".3" x2=".45" y1=".22" y2=".74">
          <stop stopColor="#121c04"/>
          <stop offset=".42" stopColor="#080d02"/>
          <stop offset=".73" stopColor="#000"/>
          <stop offset="1" stopColor="#000"/>
        </linearGradient>
        <filter id="soft"><feGaussianBlur stdDeviation="17"/></filter>
        <filter id="fine"><feGaussianBlur stdDeviation="8"/></filter>
      </defs>
      <path fill="#030d02" d="M0 0h1920v1080H0z"/>
      <path fill="url(#upper)" filter="url(#soft)"
        d="M-80-80H1190C1000 60 856 272 622 419 397 562 103 601-80 478Z"/>
      <path fill="url(#fold)" filter="url(#soft)"
        d="M-80 782C199 842 266 751 445 614 572 518 737 536 854 437 1155 180 1378 21 1933 159V1160H-80Z"/>
      <path fill="url(#right)" filter="url(#fine)"
        d="M1010 1130C1230 845 1429 603 1590 507 1745 413 1873 385 1960 276V1130Z"/>
      <path fill="none" stroke="#0e1907" strokeWidth="54" filter="url(#soft)"
        d="M-80 970C187 953 309 668 506 708 746 756 712 1026 1002 1120"/>
    </svg>
  );
}
