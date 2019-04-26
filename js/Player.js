// 玩家类
function Player(game){
    this.game = game;
    // 自己所在的列、行
    this.col = 6;
    this.row = 16;
    // 自己的位置
    this.x = this.col * 16;
    this.y = this.row * 16;
    // 速度，这个值必须要能够整除16，否则容易插墙里
    this.speed = 2;
    // 有限状态，自己的方向，0上1右2下3左
    this.direction = 0;
    // 有限状态，是否在运动
    this.isMoving = false;
}
// 更新类，这个类被定时器每帧调用
Player.prototype.update = function(){
    // 向上
    if(this.isMoving){
        // 当自己处于运动状态（这个运动状态是玩家通过键盘更改的）
        if(this.direction == 0){
            // 要判断是不是真的能更改这个状态值
            // 要去把没走完的走完
            if(this.check8point().T1 == 0 && this.check8point().T2 == 0){
                this.isMoving = true;
            }else{
                if(this.y > 16 * this.row){
                    this.isMoving = true;
                }else{
                    this.isMoving = false;
                    return;
                }
            }
        }else if(this.direction == 1){
            // 要去把没走完的走完
            if(this.check8point().R1 == 0 && this.check8point().R2 == 0){
                this.isMoving = true;
            }else{
                if(this.x < 16 * this.col){
                    this.isMoving = true;
                }else{
                    this.isMoving = false;
                    return;
                }
            }
        }else if(this.direction == 2){
            // 要去把没走完的走完
            if(this.check8point().B1 == 0 && this.check8point().B2 == 0){
                this.isMoving = true;
            }else{
                if(this.y < 16 * this.row){
                    this.isMoving = true;
                }else{
                    this.isMoving = false;
                    return;
                }
            }
        }else if(this.direction == 3){
            // 要去把没走完的走完
            if(this.check8point().L1 == 0 && this.check8point().L2 == 0){
                this.isMoving = true;
            }else{
                if(this.x > 16 * this.col){
                    this.isMoving = true;
                }else{
                    this.isMoving = false;
                    return;
                }
            }
        }

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
// 动
Player.prototype.dong = function(){
    this.isMoving = true;
}
// 探测八点
Player.prototype.check8point = function(){
    // 返回一个八点对象
    return {
        "T1" : this.row - 1 >= 0 ? this.game.map.code[this.row - 1][this.col] : 9,
        "T2" : this.row - 1 >= 0 ? this.game.map.code[this.row - 1][this.col + 1] : 9,
        "R1" : this.col + 2 <= 19 ? this.game.map.code[this.row][this.col + 2] : 9,
        "R2" : this.col + 2 <= 19 && this.row + 1 <= 19 ? this.game.map.code[this.row + 1][this.col + 2] : 9,
        "B1" : this.row + 2 <= 19 ? this.game.map.code[this.row + 2][this.col] : 9,
        "B2" : this.row + 2 <= 19 && this.col + 1 <= 19 ? this.game.map.code[this.row + 2][this.col + 1] : 9,
        "L1" : this.col - 1 >= 0 ? this.game.map.code[this.row][this.col - 1] : 9,
        "L2" : this.row - 1 >= 0 && this.col - 1 >= 0 ? this.game.map.code[this.row + 1][this.col - 1] : 9
    }
}