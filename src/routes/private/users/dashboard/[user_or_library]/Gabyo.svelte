<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 頭部のグラデーション -->
      <radialGradient id="headGradient" cx="50%" cy="30%" r="70%">
        <stop offset="0%" style="stop-color:#818cf8"/>
        <stop offset="70%" style="stop-color:#6366f1"/>
        <stop offset="100%" style="stop-color:#4338ca"/>
      </radialGradient>
      
      <!-- 針の部分のグラデーション -->
      <linearGradient id="needleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ddd"/>
        <stop offset="50%" style="stop-color:#aaa"/>
        <stop offset="100%" style="stop-color:#777"/>
      </linearGradient>
      
      <!-- 影のフィルター -->
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="4" dy="4" stdDeviation="6" flood-opacity="0.5"/>
      </filter>
    </defs>
    
    <!-- 画鋲の頭部（円形） -->
    <circle cx="50" cy="50" r="25" 
            fill="url(#headGradient)" 
            filter="url(#shadow)"/>
    
    <!-- 中央の針の見える部分（小さな円） -->
    <circle cx="50" cy="50" r="3" 
            fill="url(#needleGradient)"/>
    
    <!-- 光沢効果 -->
    <ellipse cx="45" cy="40" rx="8" ry="12" 
             fill="white" 
             opacity="0.4" 
             transform="rotate(-20 45 40)"/>
    
    <!-- 小さなハイライト -->
    <circle cx="42" cy="38" r="3" 
            fill="white" 
            opacity="0.6"/>
  </svg>