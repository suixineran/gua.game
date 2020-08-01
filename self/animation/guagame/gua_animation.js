class GuaAnimation {
    constructor(game) {
        this.game = game
        // 单个动画的处理
        // this.frames = []
        // for (let i = 2; i < 3; i++) {
        //     let name = `donghua${i}`
        //     // let name = `donghua1`
        //     let t = game.textureByName(name)
        //     this.frames.push(t)
        // }

        // 多组动画
        this.animations = {
            idle: [],
            run: [],
        }
        for (let i = 1; i < 7; i++) {
            let name = `w${i}`
            let t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        for (let i = 1; i < 7; i++) {
            let name = `idle${i}`
            let t = game.textureByName(name)
            this.animations['run'].push(t)
        }

        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.y = 400
        this.frameIndex = 0
        // 不明白这个属性
        this.frameCount = 3

        this.flipx = false

    }

    static new(game) {
        var i = new this(game)
        return i
    }

    frames() {
        return  this.animations[this.animationName]
    }
    update() {
        this.frameCount--
        if (this.frameCount === 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) %  this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        //  图片的反转
        let context = this.game.context
        if (this.flipx) {
            context.save()
            let x = this.x + this.w / 2
            context.translate(x, 0)
            context.scale(-1, 1)
            context.translate(-x, 0)
            context.drawImage(this.texture, 0, 0)
            context.restore()
        } else {
            context.drawImage(this.texture, this.x, this.y)
        }
    }
    move(x, keyStatus) {
        // 这个写法 很简洁、很赞
        this.flipx = x < 0

        this.x += x
        // 为啥像左移动的时候 y 的位置 会变 到顶部？？？
        // log('this.y', this.y)
        this.animationName = {
            down: 'run',
            up: 'idle',
        }
        let name = this.animationName[keyStatus]
        this.changeAnimation(name)
    }
    changeAnimation(name) {
        this.animationName = name
    }

}
