<svg class="size-9/10" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- グラデーション定義 -->
      <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#C7D2FE;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#6366F1;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#4338CA;stop-opacity:1" />
      </linearGradient>
      
      <!-- ハイライト用グラデーション -->
      <radialGradient id="highlight" cx="30%" cy="30%" r="50%">
        <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:0.6" />
        <stop offset="50%" style="stop-color:#FFFFFF;stop-opacity:0.2" />
        <stop offset="100%" style="stop-color:#FFFFFF;stop-opacity:0" />
      </radialGradient>
      
      <!-- 影用グラデーション -->
      <radialGradient id="shadow" cx="70%" cy="70%" r="40%">
        <stop offset="0%" style="stop-color:#000000;stop-opacity:0" />
        <stop offset="50%" style="stop-color:#000000;stop-opacity:0.1" />
        <stop offset="100%" style="stop-color:#000000;stop-opacity:0.3" />
      </radialGradient>
      
      <!-- メタリック針の頭用グラデーション -->
      <linearGradient id="metallicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#F8FAFC;stop-opacity:1" />
        <stop offset="25%" style="stop-color:#E2E8F0;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#94A3B8;stop-opacity:1" />
        <stop offset="75%" style="stop-color:#64748B;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#334155;stop-opacity:1" />
      </linearGradient>
      
      <!-- ドロップシャドウフィルター -->
      <filter id="dropShadow" width="140%" height="140%">
        <feDropShadow dx="6" dy="6" stdDeviation="4" flood-opacity="0.5"/>
      </filter>
    </defs>
    
    <!-- 四角形のパスを角丸で作成 -->
    <rect x="28" y="28" width="64" height="64" 
          rx="12" ry="12"
          fill="url(#mainGradient)"
          filter="url(#dropShadow)"/>
    
    <!-- ハイライト効果 -->
    <rect x="28" y="28" width="64" height="64" 
          rx="12" ry="12"
          fill="url(#highlight)"/>
    
    <!-- メタリックな針の頭 -->
    <rect x="52" y="52" width="16" height="16" 
          rx="2" ry="2"
          fill="url(#metallicGradient)" 
          stroke="#475569" 
          stroke-width="0.5"/>
    
    
    <!-- 針の頭の小さな反射 -->
    <rect x="54" y="54" width="4" height="4" 
          rx="0.5" ry="0.5"
          fill="#FFFFFF" 
          opacity="0.2"/>
  
  </svg>