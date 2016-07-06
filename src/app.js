var GameScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var gamelayer = new GameLayer();
        this.addChild(gamelayer);
    }
});

//myScene.js
var GameLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();
        var label = cc.LabelTTF.create("Hello World", "Arial", 40);
        label.setPosition(size.width * 3 / 6, size.height * 4 / 5);
        this.addChild(label, 4);

        for(i=0;i<16;i++){
          var tile = cc.Sprite.create(res.cover_png);
          this.addChild(tile,0);
          //タイルを格子状に配置する計算式
          tile.setPosition(49+i%4*74,320-Math.floor(i/4)*74);
        }
      },
});
