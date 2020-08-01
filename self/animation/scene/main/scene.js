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
        this.speed = config.enemy_speed
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
        let ps = GuaParticleSystem.new(this.game)
        this.addElement(ps)
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

