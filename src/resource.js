//resource.js
var res = {
    HelloWorld_png : "res/HelloWorld.png",
    cover_png : "res/cover.png",
    tile0_png : "res/tile_0.png",
    tile1_png : "res/tile_1.png",
    tile2_png : "res/tile_2.png",
    tile3_png : "res/tile_3.png",
    tile4_png : "res/tile_4.png",
    tile5_png : "res/tile_5.png",
    tile6_png : "res/tile_6.png",
    tile7_png : "res/tile_7.png",

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
