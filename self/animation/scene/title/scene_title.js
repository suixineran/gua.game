class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        let label = GuaLabel.new(game, 'hello hello hello')
        this.addElement(label)

        let w = GuaAnimation.new(game)
        w.x = 100
        w.y = 300
        this.w = w
        this.addElement(w)
        this.setupInputs()
    }

    draw() {
        super.draw()
    }

    setupInputs() {
        let self = this
        self.game.registerAction('a', function(keyStatus){
            self.w.move(-10, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus){
            self.w.move(10, keyStatus)
        })
    }
}
