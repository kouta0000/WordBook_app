<!--
class UIScene extends Phaser.Scene {
    player!: Phaser.GameObjects.Sprite;
    constructor() {
      super('UIScene');
    }
  
   
    preload() {
      this.load.image('level1_background', '/quest_assets/background.png');
      this.load.image('player','/quest_assets/player.png');
      this.load.image('ice', '/quest_assets/ice.png');
      
    }
    create() {
      const centerX:number = this.game.config.width as number / 2;
      const centerY:number = this.game.config.height as number / 2;
      this.add.image(centerX, centerY, 'level1_background');
      spaces.forEach(space => {
      this.add.image(space.x+space.width/2,space.y-space.height/2, 'ice');
      });
      sugorokuTiles.forEach((tile,i)=>{
        this.add.text(spaces[i].x+spaces[i].width/4, spaces[i].y-spaces[i].height/1.5, tile, {
                      fontFamily: 'Arial',    // フォントファミリー（絵文字表示に影響する可能性あり）
                      fontSize: '32px',       // フォントサイズ
                      color: '#ffffff',       // 文字色（白）
                      align: 'center'         // 中央揃え
                  });
      })
      this.player = this.add.sprite(player.x+player.width/2, player.y-player.height/2, 'player');
      }
            
      update() {
        if (dice) {
          
          if (position == spaces.length-1) {
            position=0;
            const x = spaces[0].x+spaces[0].width/2;
            const y = spaces[0].y+spaces[0].height/2;
            this.tweens.add({
              targets:this.player,
              x:x,
              y:y,
              duration:1000,
              ease:'Power1'
            })
            dice = 0;
          } else {
          let parts;
          if (position+dice<spaces.length-1) {
            const baf = position+dice;
            parts = spaces.slice(position+1, baf+1);
            position = baf;
          } else {
            const baf = spaces.length-1;
            parts = spaces.slice(position+1, baf+1);
            position = baf;
          };
          const tweenchain = parts.map(v=>{return {x:v.x+v.width/2, y:v.y-v.height/2,duration:500, ease:"Power2"}})
          const tweenChain = this.tweens.chain({
            targets:this.player,
            tweens: tweenchain,
            onComplete: () => {
              if (position == spaces.length-1){
                 level++;
                 isactives[level-1] = true;
                 isnows[level-2] = false;
                 isnows[level-1] = true;
                 current_id = level;
              }
            }
          });
          tweenChain.play();
          dice = 0;
        }
      }
    }
  }
  
    onMount(() => {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 1280,
        height: 960,
        parent: gameContainer,
        backgroundColor: '#333333',
        scene: [UIScene],
        scale: {
              mode: Phaser.Scale.FIT, // ここが重要！
              autoCenter: Phaser.Scale.CENTER_BOTH,
          }
      };
      game = new Phaser.Game(config);
    });
  
    onDestroy(() => {
      if (game) {
        game.destroy(true);
      }
    });
    
     
    !-->