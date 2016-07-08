var gameArray = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17];
var pickedTiles = [];
var scoreText;
var gameoverText;
var miss=0;
var gameover=0;
var console_label;

var shuffle = function(v){
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i),x = v[--i], v[i] = v[j], v[j] = x);
        return v;
};

var gameScene = cc.Scene.extend({
    onEnter:function () {

      var backgroundLayer = new cc.LayerColor(new cc.Color(140, 200, 140, 128));
        this.addChild(backgroundLayer);

        gameArray = shuffle(gameArray);
        this._super();
        gameLayer = new game();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});

var game = cc.Layer.extend({
    init:function () {
        this._super();
        var gradient = cc.LayerGradient.create(cc.color(50,0,50,255), cc.color(0xFF,0x00,0xFF,255));
        this.addChild(gradient);
        scoreText = cc.LabelTTF.create("Miss: 0","Arial","32",cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(scoreText);
        scoreText.setPosition(90,50);
        gameoverText = cc.LabelTTF.create("GameOver: "+gameover,"Arial","32",cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(gameoverText);
        gameoverText.setPosition(350,50);
        for(i=0;i<36;i++){
            var tile = new MemoryTile();
            tile.pictureValue = gameArray[i];
            this.addChild(tile,0);
            //タイルを格子状に配置する計算式
            tile.setPosition(49+i%6*76,480-Math.floor(i/6)*74);
        }
    }
});
//Spriteクラスを拡張して実装してみた
var MemoryTile = cc.Sprite.extend({
    ctor:function() {
        this._super();
        this.initWithFile(res.cover_png);
        cc.eventManager.addListener(listener.clone(), this);
    }
});
//listnerの宣言
var listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function (touch, event) {
        if(pickedTiles.length<2){
            var target = event.getCurrentTarget();
            var location = target.convertToNodeSpace(touch.getLocation());
            var targetSize = target.getContentSize();
            var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
            if (cc.rectContainsPoint(targetRectangle, location)) {
                if(pickedTiles[0] != target){
                  target.initWithFile("res/tile_"+target.pictureValue+".png");
                  pickedTiles.push(target);
                  if(pickedTiles.length==2){
                      checkTiles();
                  }
                }
            }
        }
    }
});

function checkTiles(){
    var pause = setTimeout(function(){
        if(pickedTiles[0].pictureValue!=pickedTiles[1].pictureValue){
            pickedTiles[0].initWithFile(res.cover_png);
            pickedTiles[1].initWithFile(res.cover_png);
            miss++;
            scoreText.setString("Miss: "+miss);
            if(miss == 3){
              miss = 0;
              gameover++;
              cc.director.runScene(new GameoverScene());
            }

        }
        else{
            gameLayer.removeChild(pickedTiles[0]);
            gameLayer.removeChild(pickedTiles[1]);
        }
        pickedTiles = [];
    },500);
}
