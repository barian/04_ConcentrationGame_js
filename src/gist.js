for(var i = 0 ;i < 4 ;i++){
  for(var j = 0;j < 4;j++){
    var cover = cc.Sprite.create(res.cover_png);
    cover.setPosition(size.width - (j*70+55),size.height- (i*70+150));
    this.addChild(cover)
  }
}
