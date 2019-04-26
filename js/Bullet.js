// 子弹类
function Bullet(game, direction ,y ,x, isGood){
    // 中介者
    this.game = game;
    // 自己所在的列、行
    this.col = parseInt(x / 16);
    this.row = parseInt(y / 16);
    // 自己的位置
    this.x = x;
    this.y = y;
    // 这个子弹是不是正义的子弹
    this.isGood = isGood;
    // 速度，这个值必须要能够整除16，否则容易插墙里
    this.speed = 2;
    // 有限状态，自己的方向，0上1右2下3左
    this.direction = direction;

    // 把自己放入数组
    game.bulletArr.push(this);
}
// 更新类，这个类被定时器每帧调用
Bullet.prototype.update = function(){
    // 当自己处于运动状态（这个运动状态是玩家通过键盘更改的）
    // 当向上的时候
    if(this.direction == 0){
        // 要判断是不是真的能更改这个状态值
        // 或者要去把没走完的走完
        if(this.check8point().T1 == 0 && this.check8point().T2 == 0 || this.check8point().T1 == 4 && this.check8point().T2 == 4 || this.y > 16 * this.row){
            this.y -= this.speed;
            // 同时改一下row
            this.row = parseInt(this.y / 16);
        }else{
            if(this.check8point().T1 == 1){
                this.game.map.code[this.row - 1][this.col] = 0;
            }
            if(this.check8point().T2 == 1){
                this.game.map.code[this.row - 1][this.col + 1] = 0;
            }
            this.godie();
        }
    }else if(this.direction == 1){
        if(this.check8point().R1 == 0 && this.check8point().R2 == 0 || this.check8point().R1 == 4 && this.check8point().R2 == 4 || this.x < 16 * this.col){
            this.x += this.speed;
            // 同时改一下col
            this.col = parseInt(this.x / 16);
        } else{
            if(this.check8point().R1 == 1){
                this.game.map.code[this.row][this.col + 2] = 0;
            }
            if(this.check8point().R2 == 1){
                this.game.map.code[this.row + 1][this.col + 2] = 0;
            }
            this.godie();
        }
    }else if(this.direction == 2){
        if(this.check8point().B1 == 0 && this.check8point().B2 == 0 || this.check8point().B1 == 4 && this.check8point().B2 == 4 || this.y < 16 * this.row){
            this.y += this.speed;
            // 同时改一下row
            this.row = parseInt(this.y / 16);
        }else{
            if(this.check8point().B1 == 1){
                this.game.map.code[this.row + 2][this.col] = 0;
            }
            if(this.check8point().B2 == 1){
                this.game.map.code[this.row + 2][this.col + 1] = 0;
            }
            this.godie();
        }
    }else if(this.direction == 3){
        if(this.check8point().L1 == 0 && this.check8point().L2 == 0 || this.check8point().L1 == 4 && this.check8point().L2 == 4 || this.x > 16 * this.col){
            this.x -= this.speed;
            // 同时改一下col
            this.col = parseInt(this.x / 16);
        }else{
            if(this.check8point().L1 == 1){
                this.game.map.code[this.row][this.col - 1] = 0;
            }
            if(this.check8point().L2 == 1){
                this.game.map.code[this.row + 1][this.col - 1] = 0;
            }
            this.godie();
        }
    }

    // 判定玩家
    if(!this.isGood && this.row == this.game.player.row && this.col == this.game.player.col){
        clearInterval(this.game.timer);
    }
    // 判定是否达到敌人
    if(this.isGood){
        for(var i = 0 ; i < this.game.enemyArr.length ; i++){
            if(this.game.enemyArr[i].row == this.row && this.game.enemyArr[i].col == this.col){
                this.game.enemyArr.splice(i, 1);
            }
        }
    }
}
// 渲染类，这个类被定时器每帧调用
Bullet.prototype.render = function(){
    if(this.direction == 0){
        this.game.ctx.drawImage(this.game.R.bullet, this.direction * 8, 0, 8, 8, this.x + 12, this.y, 8, 8);
    }else if(this.direction == 1){
        this.game.ctx.drawImage(this.game.R.bullet, this.direction * 8, 0, 8, 8, this.x + 24, this.y + 12, 8, 8);
    }else if(this.direction == 2){
        this.game.ctx.drawImage(this.game.R.bullet, this.direction * 8, 0, 8, 8, this.x + 12, this.y + 24, 8, 8);
    }else if(this.direction == 3){
        this.game.ctx.drawImage(this.game.R.bullet, this.direction * 8, 0, 8, 8, this.x , this.y + 12, 8, 8);
    }
}
// 探测八点
Bullet.prototype.check8point = function(){
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
// 去死方法
Bullet.prototype.godie = function(){
    for(var i = 0 ; i < this.game.bulletArr.length ; i++){
        if(this.game.bulletArr[i] == this){
            this.game.bulletArr.splice(i, 1);
        }
    }
}