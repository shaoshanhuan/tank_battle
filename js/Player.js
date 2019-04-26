// 玩家类
function Player(game){
    this.game = game;
    // 自己所在的列、行
    this.col = 6;
    this.row = 18;
    // 自己的位置
    this.x = this.col * 16;
    this.y = this.row * 16;
    // 速度
    this.speed = 1;
    // 有限状态，自己的方向，0上1右2下3左
    this.direction = 0;
    // 有限状态，是否在运动
    this.isMoving = false;
}
// 更新类，这个类被定时器每帧调用
Player.prototype.update = function(){
    if(this.isMoving){
        if(this.direction == 0){
            this.y -= this.speed;
            // 同时改一下row
            this.row = parseInt(this.y / 16);
        }else if(this.direction == 1){
            this.x += this.speed;
            // 同时改一下col
            this.col = parseInt(this.x / 16);
        }else if(this.direction == 2){
            this.y += this.speed;
            // 同时改一下row
            this.row = parseInt(this.y / 16);
        }else if(this.direction == 3){
            this.x -= this.speed;
            // 同时改一下col
            this.col = parseInt(this.x / 16);
        }
    }
}
// 渲染类，这个类被定时器每帧调用
Player.prototype.render = function(){
    this.game.ctx.drawImage(this.game.R.player1, 0, this.direction * 28, 28, 28, this.x + 2, this.y + 2, 28, 28);
}
// 改变方向
Player.prototype.changeDirection = function(n){
    // 每当改方向的时候，都要做16倍数的拉动。
    this.x = Math.round(this.x / 16) * 16;
    this.y = Math.round(this.y / 16) * 16;
    // 同时改一下col
    this.row = parseInt(this.y / 16);
    this.col = parseInt(this.x / 16);
    // 自己的方向改变
    this.direction = n;
}