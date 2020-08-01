class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'fire')
        this.setup()
    }

    setup() {
        this.life = 60
    }

    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        let factor = 0.01
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }

    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }


}

class GuaParticleSystem {
    constructor(game,) {
        this.game = game
        this.setup()
    }

    static new(game) {
        return new this(game,)
    }

    setup() {
        this.duration = 50
        this.x = 150
        this.y = 200
        this.numberOfParticle = 120
        this.particles = []
    }

    update() {
        this.duration --
        if (this.duration < 0) {

        }
        if (this.particles.length < this.numberOfParticle) {
            let p = GuaParticle.new(this.game)
            let s = 2
            let vx = randomBetween(-s, s)
            let vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        for (let p of this.particles) {
            p.update()
        }
        //     删除
        this.particles = this.particles.filter(p => p.life > 0)
    }

    draw() {
        if (this.duration < 0) {

            // TODO  应该从element 中删除
            return
        }
        for (let p of this.particles) {
            p.draw()
        }
    }

}
