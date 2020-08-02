class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // let label = GuaLabel.new(game, 'hello hello hello')
        // this.addElement(label)

        // let bg = GuaImage.new(game, 'bg')
        // this.addElement(bg)
        this.grounds = []
        for (let i = 0; i < 40; i++) {
            // const gameElement = game[i];
            let g =  GuaImage.new(game, 'ground')
            g.x = i*19
            g.y = 510
            this.addElement(g)
            this.grounds.push(g)
        }

        this.skipCount = 4

        let anim = GuaAnimation.new(game)
        anim.x = 100
        anim.y = 0
        this.anim = anim
        this.addElement(anim)
        this.setupInputs()
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
        self.game.registerAction('a', function(keyStatus){
            self.anim.move(-10, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus){
            self.anim.move(10, keyStatus)
        })
        self.game.registerAction('j', function(keyStatus){
            self.anim.jump()
        })
    }
}
