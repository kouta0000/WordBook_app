
<div class="h-screen w-full pt-25 pb-15 flex flex-col items-center justify-start bg-slate-100 absolute z-20">
    <div class="full p-10">
        <h1 style="animation: rainbow 1s ease-in-out;" class=" text-center font-bold text-3xl">テスト</h1>
    </div>
                <div class="grid grid-cols-2  gap-4 w-9/10 lg:w-1/3 p-5">
                    <div class="w-full aspect-square  mask mask-squircle bg-white  hover:bg-indigo-200/80 relative">
                    <a href="./4taku" class="absolute inset-0 flex justify-center items-center">
                        ４択問題
                    </a>
                    </div>
                    <div class="w-full aspect-square  mask mask-squircle grow bg-white  hover:bg-indigo-200/80 relative">
                        <a href="./input" class="absolute inset-0 flex justify-center items-center">
                        入力
                        </a>
                    </div>
                    <div class="w-full aspect-square  mask mask-squircle grow bg-white opacity-50 relative">
                        <a href="./" class="absolute inset-0 flex justify-center items-center">
                        並び替え
                        </a>
                    </div>
                </div>
</div>
<style>
 .system-2 .display {
            background: linear-gradient(145deg, #cecedf, #a9a9e4);
            border: 15px solid #444;
            border-radius: 25px;
            position: relative;
            box-shadow: 0 0 50px rgba(255, 0, 255, 0.4);
        }

        .system-2 .screen {
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, #cecee9 0%, #c4c4f5 100%);
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
            background: linear-gradient(145deg, #8b8beb, #424294);
            border: 2px solid #5555aa;
            border-radius: 10px;
            padding: 15px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #f7f8fa;
            font-weight: 900;
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