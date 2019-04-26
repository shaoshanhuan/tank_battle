// 游戏类
function Game(){
    // 画布，现在是Game类的实例的属性
    this.canvas = document.getElementById("canvas");
    // 上下文也是属性
    this.ctx = this.canvas.getContext("2d");

    // 资源，现在也是属性
    this.R = {
        "tile" : "tile.bmp",
        "player1" : "player1.bmp"
    };

    // 备份this
    var self = this;
    // 图片总述
    var picAmount = Object.keys(this.R).length;
    // 已经加载完毕的图片数量
    var doneCount = 0;
    // 游戏资源加载，之前学习的没有变
    for(var k in this.R){
        // 做一个IIFE变为局部变量
        (function(k){
            var img = new Image();
            img.src = "images/" + self.R[k];
            img.onload = function(){
                // 加载完一个，计数器加1
                doneCount++;
                // 把这个图片对象写到R对象里面
                self.R[k] = img;
                // 如果加载完的数量，等于总数，说明加载完毕
                if(doneCount == picAmount){
                    // 开始游戏
                    self.start();
                    // 绑定监听
                    self.bindEvent();
                }
            }
        })(k)
    }
}
// 开始游戏
Game.prototype.start = function(){
    // 备份上下文
    var self = this;
    // 帧编号也是属性
    this.f = 0;
    // 实例化玩家，this是Game类的实例
    this.player = new Player(this);
    // 实例化地图
    this.map = new Map(this);

    // 游戏的唯一定时器
    setInterval(function(){
        // 清屏
        self.ctx.clearRect(0, 0, 320, 320);

        // 帧编号加1
        self.f++;
        // 打印帧编号
        self.ctx.fillStyle = "white";
        self.ctx.fillText(self.f, 10, 20);

        // 每帧都要更新玩家、渲染玩家
        self.player.update();
        self.player.render();

        // 每帧都要更新地图、渲染地图
        self.map.update();
        self.map.render();

        // 输出坦克
        // console.log(self.player)
    }, 20);
}
// 绑定监听
Game.prototype.bindEvent = function(){
    // 备份this
    var self = this;
    // 键盘按下
    document.onkeydown = function(e){
        if(e.keyCode == 37){
            // 按左键，如果坦克当前不是向左走
            if(self.player.direction != 3){
                // 命令坦克改变方向
                self.player.changeDirection(3);
            }
            // 动画
            self.player.dong();
        }else if(e.keyCode == 38){
           
            // 按上键，如果坦克当前不是向上走
            if(self.player.direction != 0){
                // 命令坦克改变方向
                self.player.changeDirection(0);
            }
            // 动画
            self.player.dong();
        }else if(e.keyCode == 39){
            // 按右键，如果坦克当前不是向上走
            if(self.player.direction != 1){
                // 命令坦克改变方向
                self.player.changeDirection(1);
            }
            // 动画
            self.player.dong();
        }else if(e.keyCode == 40){
            // 按右键，如果坦克当前不是向下走
            if(self.player.direction != 2){
                // 命令坦克改变方向
                self.player.changeDirection(2);
            }
            // 动画
            self.player.dong();
        }
    }
    document.onkeyup = function(e){
        if(e.keyCode >= 37 && e.keyCode <= 40){
            self.player.isMoving = false;
        }
    }
}