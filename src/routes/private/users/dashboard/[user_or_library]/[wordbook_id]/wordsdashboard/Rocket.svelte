<div class="w-1/5 aspect-ratio-1/1 absolute top-0 left-0 rotate-45">
<svg class="size-full" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- グラデーション定義 -->
      <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#e8e8e8;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#ffffff;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#d0d0d0;stop-opacity:1" />
      </linearGradient>
      
      <linearGradient id="noseCone" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#ff4444;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#ff6666;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#cc3333;stop-opacity:1" />
      </linearGradient>
      
      <linearGradient id="flame1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#ffff00;stop-opacity:1" />
        <stop offset="30%" style="stop-color:#ff8800;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#ff0000;stop-opacity:1" />
      </linearGradient>
      
      <linearGradient id="flame2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
        <stop offset="20%" style="stop-color:#ffff00;stop-opacity:1" />
        <stop offset="60%" style="stop-color:#ff4400;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#cc0000;stop-opacity:1" />
      </linearGradient>
      
      <radialGradient id="window" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:#87ceeb;stop-opacity:0.8" />
        <stop offset="70%" style="stop-color:#4682b4;stop-opacity:0.9" />
        <stop offset="100%" style="stop-color:#2f4f4f;stop-opacity:1" />
      </radialGradient>
      
      <!-- 星の形 -->
      <g id="star">
        <polygon points="0,-8 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2" fill="#ffff00" opacity="0.8"/>
      </g>
    </defs>
    
  
    
    <!-- メインエンジンの炎（ひし形） -->
    <polygon points="200,480 215,520 200,580 185,520" fill="url(#flame1)">
      <animateTransform attributeName="transform" type="scale" values="1,1;1.2,1.1;1,1" dur="0.3s" repeatCount="indefinite"/>
    </polygon>
    <polygon points="200,485 210,515 200,560 190,515" fill="url(#flame2)">
      <animateTransform attributeName="transform" type="scale" values="1,1;1.1,1.2;1,1" dur="0.25s" repeatCount="indefinite"/>
    </polygon>
    
    <!-- サイドエンジンの炎（ひし形・左右対称） -->
    <polygon points="140,460 150,485 140,530 130,485" fill="url(#flame1)">
      <animateTransform attributeName="transform" type="scale" values="1,1;1.3,1.1;1,1" dur="0.2s" repeatCount="indefinite"/>
    </polygon>
    <polygon points="260,460 270,485 260,530 250,485" fill="url(#flame1)">
      <animateTransform attributeName="transform" type="scale" values="1,1;1.3,1.1;1,1" dur="0.2s" repeatCount="indefinite"/>
    </polygon>
    
    <!-- 追加の炎（より多くの炎・左右対称） -->
    <polygon points="170,465 180,490 170,520 160,490" fill="url(#flame1)" opacity="0.8">
      <animateTransform attributeName="transform" type="scale" values="1,1;1.4,1.2;1,1" dur="0.18s" repeatCount="indefinite"/>
    </polygon>
    <polygon points="230,465 240,490 230,520 220,490" fill="url(#flame1)" opacity="0.8">
      <animateTransform attributeName="transform" type="scale" values="1,1;1.4,1.2;1,1" dur="0.18s" repeatCount="indefinite"/>
    </polygon>
    
    <!-- 小さな炎効果（ひし形・左右対称） -->
    <polygon points="140,462 145,470 140,485 135,470" fill="#ffaa00" opacity="0.8">
      <animateTransform attributeName="transform" type="scale" values="1,1;1.5,1.2;1,1" dur="0.15s" repeatCount="indefinite"/>
    </polygon>
    <polygon points="260,462 265,470 260,485 255,470" fill="#ffaa00" opacity="0.8">
      <animateTransform attributeName="transform" type="scale" values="1,1;1.5,1.2;1,1" dur="0.15s" repeatCount="indefinite"/>
    </polygon>
    
    <!-- 追加の小さな炎（左右対称） -->
    <polygon points="170,468 175,475 170,490 165,475" fill="#ffaa00" opacity="0.7">
      <animateTransform attributeName="transform" type="scale" values="1,1;1.3,1.3;1,1" dur="0.12s" repeatCount="indefinite"/>
    </polygon>
    <polygon points="230,468 235,475 230,490 225,475" fill="#ffaa00" opacity="0.7">
      <animateTransform attributeName="transform" type="scale" values="1,1;1.3,1.3;1,1" dur="0.12s" repeatCount="indefinite"/>
    </polygon>
    
    <!-- 底部の追加の炎（10個・左右対称） -->
    <polygon points="155,475 160,485 155,510 150,485" fill="url(#flame1)" opacity="0.6">
      <animateTransform attributeName="transform" type="scale" values="1,1;1.2,1.1;1,1" dur="0.16s" repeatCount="indefinite"/>
    </polygon>
    <polygon points="245,475 250,485 245,510 240,485" fill="url(#flame1)" opacity="0.6">
      <animateTransform attributeName="transform" type="scale" values="1,1;1.2,1.1;1,1" dur="0.16s" repeatCount="indefinite"/>
    </polygon>
    
    <polygon points="185,478 190,488 185,515 180,488" fill="url(#flame2)" opacity="0.7">
      <animateTransform attributeName="transform" type="scale" values="1,1;1.3,1.2;1,1" dur="0.14s" repeatCount="indefinite"/>
    </polygon>
    <polygon points="215,478 220,488 215,515 210,488" fill="url(#flame2)" opacity="0.7">
      <animateTransform attributeName="transform" type="scale" values="1,1;1.3,1.2;1,1" dur="0.14s" repeatCount="indefinite"/>
    </polygon>
    
    <polygon points="160,470 165,480 160,500 155,480" fill="#ffaa00" opacity="0.8">
      <animateTransform attributeName="transform" type="scale" values="1,1;1.4,1.1;1,1" dur="0.13s" repeatCount="indefinite"/>
    </polygon>
    <polygon points="240,470 245,480 240,500 235,480" fill="#ffaa00" opacity="0.8">
      <animateTransform attributeName="transform" type="scale" values="1,1;1.4,1.1;1,1" dur="0.13s" repeatCount="indefinite"/>
    </polygon>
    
    <polygon points="175,472 180,480 175,505 170,480" fill="url(#flame1)" opacity="0.5">
      <animateTransform attributeName="transform" type="scale" values="1,1;1.1,1.3;1,1" dur="0.17s" repeatCount="indefinite"/>
    </polygon>
    <polygon points="225,472 230,480 225,505 220,480" fill="url(#flame1)" opacity="0.5">
      <animateTransform attributeName="transform" type="scale" values="1,1;1.1,1.3;1,1" dur="0.17s" repeatCount="indefinite"/>
    </polygon>
    
    <polygon points="190,476 195,483 190,508 185,483" fill="#ff6600" opacity="0.6">
      <animateTransform attributeName="transform" type="scale" values="1,1;1.2,1.2;1,1" dur="0.11s" repeatCount="indefinite"/>
    </polygon>
    <polygon points="210,476 215,483 210,508 205,483" fill="#ff6600" opacity="0.6">
      <animateTransform attributeName="transform" type="scale" values="1,1;1.2,1.2;1,1" dur="0.11s" repeatCount="indefinite"/>
    </polygon>
    
    <!-- ロケット本体 -->
    <rect x="150" y="180" width="100" height="300" fill="url(#rocketBody)" stroke="#aaaaaa" stroke-width="2"/>
    
    <!-- エンジンノズル -->
    <polygon points="150,480 170,500 230,500 250,480 250,500 150,500" fill="#666666" stroke="#444444" stroke-width="2"/>
    
    <!-- サイドブースター -->
    <rect x="130" y="250" width="20" height="200" fill="#cccccc" stroke="#999999" stroke-width="1"/>
    <rect x="250" y="250" width="20" height="200" fill="#cccccc" stroke="#999999" stroke-width="1"/>
    
    <!-- ノーズコーン -->
    <polygon points="150,180 200,80 250,180" fill="url(#noseCone)" stroke="#aa2222" stroke-width="2"/>
    
    <!-- 窓 -->
    <circle cx="200" cy="300" r="25" fill="url(#window)" stroke="#333333" stroke-width="3"/>
    <circle cx="200" cy="300" r="20" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.3"/>
    
    <!-- ロケットの詳細 -->
    <!-- 本体のライン -->
    <line x1="150" y1="220" x2="250" y2="220" stroke="#999999" stroke-width="1"/>
    <line x1="150" y1="280" x2="250" y2="280" stroke="#999999" stroke-width="1"/>
    <line x1="150" y1="340" x2="250" y2="340" stroke="#999999" stroke-width="1"/>
    <line x1="150" y1="400" x2="250" y2="400" stroke="#999999" stroke-width="1"/>
    
    <!-- ロゴマーク -->
    <circle cx="200" cy="200" r="15" fill="#4444ff" stroke="#2222cc" stroke-width="2"/>
    <polygon points="200,190 205,200 200,210 195,200" fill="#ffffff"/>
    
    <!-- 安定翼 -->
    <polygon points="150,450 120,480 150,480" fill="#ff6666" stroke="#cc4444" stroke-width="2"/>
    <polygon points="250,450 280,480 250,480" fill="#ff6666" stroke="#cc4444" stroke-width="2"/>
    
    <!-- サイドブースターのノズル -->
    <rect x="125" y="445" width="30" height="15" fill="#444444" stroke="#222222" stroke-width="1"/>
    <rect x="245" y="445" width="30" height="15" fill="#444444" stroke="#222222" stroke-width="1"/>
    
  
  </svg>
</div>