class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 150
        this.guanziWSpace = 200
        this.columsOfPipe = 10
        for (let i = 0; i < this.columsOfPipe; i++) {
            let p1 = GuaImage.new(game, 'pipe')
            p1.flipy = true
            p1.x = 500 + i * this.guanziWSpace
            let p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)

        }
    }

    static new(game,) {
        var i = new this(game)
        return i
    }

    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-400, -300)
        p2.y = p1.y + p1.h + this.pipeSpace +200

    }
    debug() {
        this.guanziWSpace = config.guanziWSpace.value
        this.pipeSpace = config.pipeSpace.value

    }

    update() {
        for (let i = 0; i < this.pipes.length / 2; i +=2) {
            const argument = arguments[i];
            let p1 = this.pipes[i]
            let p2 = this.pipes[i + 1]
            p1.x -=5
            p2.x -=5
            if (p1.x < -100) {
                p1.x += this.guanziWSpace * this.columsOfPipe
            }
            if (p2.x < -100) {
                p2.x += this.guanziWSpace * this.columsOfPipe
                this.resetPipesPosition(p1, p2)
            }
        }

    }

    draw() {
        let context = this.game.context
        for (let p of this.pipes) {
            context.save()

            let w2 = p.w / 2
            let h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            let scaleX = p.flipx ? -1 : 1
            let scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.globalAlpha = p.alpha
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, h2)

            context.drawImage(p.texture, 0, 0)
            context.restore()
        }

    }

}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // let label = GuaLabel.new(game, 'hello hello hello')
        // this.addElement(label)

        //加背景
        // let bg = GuaImage.new(
        // game, 'bg')
        // this.addElement(bg)

        //加管子

        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)

        // 加地板砖
        this.grounds = []
        for (let i = 0; i < 40; i++) {
            // const gameElement = game[i];
            let g = GuaImage.new(game, 'ground')
            g.x = i * 19
            g.y = 510
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4

        // 加动画角色
        this.birdSpeed = 2
        let anim = GuaAnimation.new(game)
        anim.x = 100
        anim.y = 0
        this.anim = anim
        this.addElement(anim)
        this.setupInputs()
    }

    debug() {
        this.birdSpeed = config.brid_speed.value
    }
    update() {
        super.update()
        // 循环滚动
        this.skipCount--
        let offset = -5
        if (this.skipCount === 0) {
            this.skipCount = 4
            offset = 15
        }
        for (let i = 0; i < 40; i++) {
            // const gameElement = game[i];
            let g = this.grounds[i]
            g.x += offset
        }
    }

    draw() {
        super.draw()
    }

    setupInputs() {
        let self = this
        self.game.registerAction('a', function (keyStatus) {
            self.anim.move(-self.birdSpeed, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            self.anim.move(self.birdSpeed, keyStatus)
        })
        self.game.registerAction('j', function (keyStatus) {
            self.anim.jump()
        })
    }
}
