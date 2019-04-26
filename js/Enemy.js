// 玩家类
function Enemy(game){
    this.game = game;
    // 自己所在的列、行
    this.col = 0;
    this.row = 0;
    // 自己的位置
    this.x = this.col * 16;
    this.y = this.row * 16;
    // 速度，这个值必须要能够整除16，否则容易插墙里
    this.speed = 1;
    // 有限状态，自己的方向，0上1右2下3左
    this.direction = 2;

    // 发射子弹的CD
    this.cd = parseInt(Math.random() * 200) + 50;

    // 把自己放入数组
    this.game.enemyArr.push(this);
}
// 更新类，这个类被定时器每帧调用
Enemy.prototype.update = function(){
 
    if(this.game.f % this.cd == 0){
        new Bullet(this.game,this.direction ,this.y ,this.x, false);
        // console.log(1)
    }
    // 当自己处于运动状态（这个运动状态是玩家通过键盘更改的）
    // 当向上的时候
    if(this.direction == 0){
        // ★★★★★★★★★★★★★★★★★★★★★★★★★
        if(this.check8point().R1 == 0 && this.check8point().R2 == 0){
            // 判断右边有路
            if(Math.random() < 0.1){
                this.changeDirection(1);
                return;
            }
        }else if(this.check8point().L1 == 0 && this.check8point().L2 == 0){
            // 判断左边有路
            if(Math.random() < 0.3){
                this.changeDirection(3);
                return;
            }
        }
        // ★★★★★★★★★★★★★★★★★★★★★★★★★

        // 要判断是不是真的能更改这个状态值
        // 或者要去把没走完的走完
        if(this.check8point().T1 == 0 && this.check8point().T2 == 0 || this.y > 16 * this.row){
            this.y -= this.speed;
            // 同时改一下row
            this.row = parseInt(this.y / 16);
        }else{
            // 向右走没路
            // 随机改一个方向
            this.changeDirection(~~(Math.random() * 4));
        }
    }else if(this.direction == 1){
        // ★★★★★★★★★★★★★★★★★★★★★★★★★
        if(this.check8point().T1 == 0 && this.check8point().T2 == 0){
            // 判断上边有路
            if(Math.random() < 0.1){
                this.changeDirection(0);
                return;
            }
        }else if(this.check8point().B1 == 0 && this.check8point().B2 == 0){
            // 判断下边有路
            if(Math.random() < 0.1){
                this.changeDirection(2);
                return;
            }
        }
        // ★★★★★★★★★★★★★★★★★★★★★★★★★

        if(this.check8point().R1 == 0 && this.check8point().R2 == 0 || this.x < 16 * this.col){
            this.x += this.speed;
            // 同时改一下col
            this.col = parseInt(this.x / 16);
        }else{
            // 向右走没路
            // 随机改一个方向
            this.changeDirection(~~(Math.random() * 4));
        }
    }else if(this.direction == 2){
        // ★★★★★★★★★★★★★★★★★★★★★★★★★
        if(this.check8point().R1 == 0 && this.check8point().R2 == 0){
            // 判断右边有路
            if(Math.random() < 0.1){
                this.changeDirection(1);
                return;
            }
        }else if(this.check8point().L1 == 0 && this.check8point().L2 == 0){
            // 判断左边有路
            if(Math.random() < 0.1){
                this.changeDirection(3);
                return;
            }
        }
        // ★★★★★★★★★★★★★★★★★★★★★★★★★

        if(this.check8point().B1 == 0 && this.check8point().B2 == 0 || this.y < 16 * this.row){
            this.y += this.speed;
            // 同时改一下row
            this.row = parseInt(this.y / 16);
        }else{
            // 向右走没路
            // 随机改一个方向
            this.changeDirection(~~(Math.random() * 4));
        }
    }else if(this.direction == 3){
        // ★★★★★★★★★★★★★★★★★★★★★★★★★
        if(this.check8point().T1 == 0 && this.check8point().T2 == 0){
            // 判断上边有路
            if(Math.random() < 0.1){
                this.changeDirection(0);
                return;
            }
        }else if(this.check8point().B1 == 0 && this.check8point().B2 == 0){
            // 判断下边有路
            if(Math.random() < 0.1){
                this.changeDirection(2);
                return;
            }
        }
        // ★★★★★★★★★★★★★★★★★★★★★★★★★

        if(this.check8point().L1 == 0 && this.check8point().L2 == 0 || this.x > 16 * this.col){
            this.x -= this.speed;
            // 同时改一下col
            this.col = parseInt(this.x / 16);
        }else{
            // 向右走没路
            // 随机改一个方向
            this.changeDirection(~~(Math.random() * 4));
        }
    }
}
// 渲染类，这个类被定时器每帧调用
Enemy.prototype.render = function(){
    this.game.ctx.drawImage(this.game.R.enemy, 0, this.direction * 28, 28, 28, this.x + 2, this.y + 2, 28, 28);
}
// 改变方向
Enemy.prototype.changeDirection = function(n){
    // 每当改方向的时候，都要做16倍数的拉动。
    this.x = Math.round(this.x / 16) * 16;
    this.y = Math.round(this.y / 16) * 16;
    // 同时改一下col
    this.row = parseInt(this.y / 16);
    this.col = parseInt(this.x / 16);
    // 自己的方向改变
    this.direction = n;
}
 
// 探测八点
Enemy.prototype.check8point = function(){
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