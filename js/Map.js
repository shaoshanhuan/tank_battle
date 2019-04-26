// 地图类
function Map(game){
    // 自己的中介者
    this.game = game;
    // 自己的编码，就是20*20的矩阵
    this.code = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,2,2,2,2,0,0,2,2,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,2,2,0,0,2,2,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,2,2,0,0,2,2,0,0,0,0],[0,0,1,1,1,1,1,1,0,0,2,2,0,0,2,2,0,0,0,0],[0,0,1,1,1,1,1,1,0,0,2,2,0,0,2,2,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0]];

}
// 更新
Map.prototype.update = function(){

}
// 渲染
Map.prototype.render = function(){
    // 渲染比较复杂，要根据自己的二维数组渲染
    for(var i = 0 ; i < 20 ; i++){
        for(var j = 0 ; j < 20 ; j++){
            // 得到这个小格的数字
            var c = this.code[i][j];
            // 如果不是0，因为0表示没有东西
            if(c != 0){
                this.game.ctx.drawImage(this.game.R.tile, (this.code[i][j] - 1) * 32, 0, 16, 16, j * 16, i*16, 16, 16);
            }
        }
    }
}