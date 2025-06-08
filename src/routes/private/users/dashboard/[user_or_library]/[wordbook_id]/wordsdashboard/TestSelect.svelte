
<div class="h-screen w-full pt-15 pb-15 flex items-center justify-center bg-linear-to-br from-indigo-900 to-indigo-700 absolute z-20">
    <div class="system-2">
        <div class="display">
            <div class="screen">
                <div class="title">TEST GAME</div>
                <div class="flex flex-col lg:grid grid-cols-2 gap-4">
                    <a href="./4taku" class="block menu-item w-full">
                        ４択問題
                    </a>
                    <a href="./tsuzuri" class="block menu-item w-full">
                        綴り問題
                    </a>
                    <div class="menu-item">クロスワード（開発中）</div>
                    <div class="menu-item">もぐらたたき（開発中）</div>
                    <div class="menu-item">落下（開発中）</div>
                </div>
            </div>
        </div>
    </div>
</div>
<style>
 .system-2 .display {
            background: linear-gradient(145deg, #2a2a3a, #1a1a2a);
            border: 15px solid #444;
            border-radius: 25px;
            position: relative;
            box-shadow: 0 0 50px rgba(255, 0, 255, 0.4);
        }

        .system-2 .screen {
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, #010175 0%, #000091 100%);
            border-radius: 10px;
            padding: 25px;
            position: relative;
        }

        .system-2 .title {
            color: #ff00ff;
            font-size: 28px;
            text-align: center;
            margin-bottom: 25px;
            text-shadow: 0 0 15px #ff00ff;
            background: linear-gradient(45deg, #ff00ff, #00ffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: rainbow 3s infinite;
        }


        .system-2 .menu-item {
            background: linear-gradient(145deg, #333366, #222244);
            border: 2px solid #5555aa;
            border-radius: 10px;
            padding: 15px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #cadffd;
        }

        .system-2 .menu-item:hover {
            border-color: #ff00ff;
            box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
            transform: translateY(-2px);
        }

        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        </style>