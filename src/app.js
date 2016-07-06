var GameScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var backgroundLayer = new cc.LayerColor(new cc.Color(140, 200, 140, 128));
        this.addChild(backgroundLayer);
        var gamelayer = new GameLayer();
        this.addChild(gamelayer);
    }
});

var console_label;

var GameLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();
        var gradient = cc.LayerGradient.create(cc.color(50,0,50,255),cc.color(0xFF,0x00,0xFF,255));
        this.addChild(gradient);
        for(i=0;i<16;i++){
          //var tile = cc.Sprite.create(res.cover_png);
          var tile = new MemoryTile();
          this.addChild(tile,0);
          //タイルを格子状に配置する計算式
          tile.setPosition(49+i%4*74,320-Math.floor(i/4)*74);
        }
        console_label = cc.LabelTTF.create("神経衰弱ゲーム","Arial",26);
        console_label.setPosition(size.width * 3 / 6, size.height * 4 / 5);
        this.addChild(console_label,1)
        return true;
      },
});
//Spriteクラスを拡張して実装してみた
//Spriteクラスを拡張して実装してみた
var MemoryTile = cc.Sprite.extend({
    ctor:function() {
        this._super();
        this.initWithFile(res.cover_png);
        //イベントマネージャにイベントリスナーを追加
        cc.eventManager.addListener(listener.clone(),this);
    },
});

//listnerの宣言
var listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function (touch, event) {
      var target = event.getCurrentTarget();
      var location = target.convertToNodeSpace(touch.getLocation());
      var targetSize = target.getContentSize();
      var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);

      if (cc.rectContainsPoint(targetRectangle, location)) {
          console.log("I piced a tile!!");
          console_label.setString("I piced a tile!!");
          // 一秒後に消える
       setTimeout(function() {
           console_label.setString("");
       }, 1500);

      }
    }
});
