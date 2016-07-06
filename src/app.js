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

        for(var i = 0 ;i < 4 ;i++){
          for(var j = 0;j < 4;j++){
            var cover = cc.Sprite.create(res.cover_png);
            cover.setPosition(size.width - (j*70+55),size.height- (i*70+150));
            this.addChild(cover)
          }
        }

      },
});
