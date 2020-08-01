let config = {
    player_speed: 10,
    cloud_speed: 10,
    enemy_speed: 10,
    bullet_speed: 10,
    fire_cooldown: 10,
}

class Bullet extends GuaImage {
    constructor(game) {
        // log('====初始化子弹game', game)
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        // this.speed = 3
        this.speed = config.bullet_speed
    }
    update() {
        // this.speed = config.bullet_speed
        this.y -=this.speed

    }


}


class Player extends GuaImage {
    constructor(game) {
        // log('Player.game', game)
        super(game, 'player')
        this.setup()
        this.game = game
    }
    setup() {
        this.speed = 10
        this.cooldown = 0
    }
    update() {
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown --
        }
    }
    fire() {
        if (this.cooldown === 0) {
            this.cooldown = config.fire_cooldown
            let x = this.x + this.w / 2
            let y = this.y
            // log('fire  this.game', this)
            let b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }

    }
    moveLeft(){
        this.x -= this.speed
    }
    moveRight(){
        this.x += this.speed
    }
    moveUp(){
        this.y -= this.speed
    }
    moveDown(){
        this.y += this.speed
    }

}


class Enemy extends GuaImage {
    constructor(game) {
        let type = randomBetween(1, 3)
        let name = 'enemy' + type
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 600)
        this.y = -randomBetween(50, 100)
    }
    update() {
        this.y += this.speed
        if (this.y > 550) {
            this.setup()
        }
    }

}

class Cloud extends GuaImage {
    constructor(game) {
        super(game, 'cloud')
        this.setup()
    }
    setup() {
        this.speed = 1
        this.x = randomBetween(0, 600)
        this.y = randomBetween(0, 50)
    }
    update() {

        this.y += this.speed
        if (this.y > 550) {
            this.setup()
        }
    }
    debug(){
        this.speed = config.cloud_speed
    }
}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        let game = this.game
        this.numberOfEnemies = 3
        this.bg = GuaImage.new(game, 'sky')
        // this.cloud = GuaImage.new(game, 'cloud')
        // this.player = GuaImage.new(game, 'player')
        this.player =  Player.new(game)
        this.cloud =  Cloud.new(game)
        this.player.x = 100
        this.player.y = 150

        // this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        this.addEnemies()
    }

    addEnemies() {
        let es = []
        for (let i = 0; i < this.numberOfEnemies; i++) {
           let e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    setupInputs() {
     let g = this.game
     let s = this
     g.registerAction('a', function(){
        s.player.moveLeft()
    })
    g.registerAction('d', function(){
        s.player.moveRight()
    })
        g.registerAction('w', function(){
            s.player.moveUp()
        })
        g.registerAction('s', function(){
            s.player.moveDown()
        })
        g.registerAction('j', function(){
            s.player.fire()
        })

    }
    update() {
        super.update()
        this.cloud.y += 1
    }
    // draw() {
    //     // draw labels
    //     // this.game.context.fillText('按 k 开始游戏', 100, 190)
    //
    //     this.game.drawImage(this.bg)
    //     this.game.drawImage(this.player)
    // }
}


//
// var Scene = function(game) {
//     var s = {
//         game: game,
//     }
//     // 初始化
//     // var paddle = Paddle(game)
//     // var ball = Ball(game)
//
//     var score = 0
//
//     var blocks = loadLevel(game, 1)
//
//     game.registerAction('a', function(){
//         paddle.moveLeft()
//     })
//     game.registerAction('d', function(){
//         paddle.moveRight()
//     })
//     game.registerAction('f', function(){
//         ball.fire()
//     })
//
//     s.draw = function() {
//         // draw 背景
//         game.context.fillStyle = "#554"
//         game.context.fillRect(0, 0, 400, 300)
//         // draw
//         game.drawImage(paddle)
//         game.drawImage(ball)
//         // draw blocks
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//         // draw labels
//         game.context.fillText('分数: ' + score, 10, 290)
//     }
//     s.update = function() {
//         if (window.paused) {
//             return
//         }
//
//         ball.move()
//         // 判断游戏结束
//         if (ball.y > paddle.y) {
//             // 跳转到 游戏结束 的场景
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//         }
//         // 判断相撞
//         if (paddle.collide(ball)) {
//             // 这里应该调用一个 ball.反弹() 来实现
//             ball.反弹()
//         }
//         // 判断 ball 和 blocks 相撞
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 // log('block 相撞')
//                 block.kill()
//                 ball.反弹()
//                 // 更新分数
//                 score += 100
//             }
//         }
//     }
//
//     // mouse event
//     var enableDrag = false
//     game.canvas.addEventListener('mousedown', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         // log(x, y, event)
//         // 检查是否点中了 ball
//         if (ball.hasPoint(x, y)) {
//             // 设置拖拽状态
//             enableDrag = true
//         }
//     })
//     game.canvas.addEventListener('mousemove', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         // log(x, y, 'move')
//         if (enableDrag) {
//             log(x, y, 'drag')
//             ball.x = x
//             ball.y = y
//         }
//     })
//     game.canvas.addEventListener('mouseup', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         log(x, y, 'up')
//         enableDrag = false
//     })
//
//     return s
// }
