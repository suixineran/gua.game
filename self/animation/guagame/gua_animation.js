class GuaAnimation {
    constructor(game) {
        this.game = game
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
        // for (let i = 1; i < 7; i++) {
        //     let name = `idle${i}`
        //     let t = game.textureByName(name)
        //     this.animations['run'].push(t)
        // }

        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.y = 400
        this.frameIndex = 0
        // 不明白这个属性
        this.frameCount = 3

        // 左右反转
        this.flipx = false
        // 设置角度
        this.rotation = 0
    //     透明度
        this.alpha = 1
    //     重力 加速度
        this.gy = 10
        this.vy = 0



    }

    static new(game) {
        var i = new this(game)
        return i
    }

    frames() {
        return  this.animations[this.animationName]
    }
    update() {
        // 透明度
        if (this.alpha > 0) {
            this.alpha -= 0.05
        }
        // 重力
        this.y += this.vy
        this.vy += this.gy * 0.2
        let h = 438
        if (this.y > h) {
            this.y = h
        }
        //角度
        if (this.rotation < 45) {
            this.rotation += 5
        }
        this.frameCount--
        if (this.frameCount === 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) %  this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    jump() {
        this.vy =  -10
        this.rotation = -45
    }
    draw() {
        //  图片的反转
        let context = this.game.context
        // if (this.flipx) {
        //     context.save()
        //     let x = this.x + this.w / 2
        //     context.translate(x, 0)
        //     context.scale(-1, 1)
        //     context.translate(-x, 0)
        //     context.drawImage(this.texture, 0, 0)
        //     context.restore()
        // } else {
        //     context.drawImage(this.texture, this.x, this.y)
        // }
    //     转角度
        context.save()
        let w2 = this.w / 2
        let h2 = this.h / 2
        context.translate(this.x + w2 , this.y + h2)
        if(this.flipx) {
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, h2)
        context.drawImage(this.texture, 0, 0)
        context.restore()

    }
    move(x, keyStatus) {
        // 这个写法 很简洁、很赞
        this.flipx = x < 0

        this.x += x
        // 为啥像左移动的时候 y 的位置 会变 到顶部？？？
        // log('this.y', this.y)
        // this.animationName = {
        //     down: 'run',
        //     up: 'idle',
        // }
        // let name = this.animationName[keyStatus]
        // this.changeAnimation(name)


    }
    changeAnimation(name) {
        this.animationName = name
    }

}
