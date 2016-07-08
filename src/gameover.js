var GameoverLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();
        /*
                var sprite = cc.Sprite.create(res.HelloWorld_png);
                sprite.setPosition(size.width / 2, size.height / 2);
                sprite.setScale(0.8);
                this.addChild(sprite, 0);
        */
        var label = cc.LabelTTF.create("G a m e  o v e r !!", "Arial", 60);
        label.setPosition(size.width / 2, size.height * 4 / 5);
        this.addChild(label, 4);
        var label = cc.LabelTTF.create("R e t r y\n    t o\nT o u c h", "Arial", 52);
        label.setPosition(size.width / 2, size.height * 2 / 5);
        this.addChild(label, 4);

        // タップイベントリスナーを登録する
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        return true;
    },

    onTouchBegan: function(touch, event) {
        return true;
    },
    onTouchMoved: function(touch, event) {},
    onTouchEnded: function(touch, event) {
        // 次のシーンに切り替える
        cc.director.runScene(new gameScene());
    },
});



var GameoverScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameoverLayer();
        this.addChild(layer);
    }
});
