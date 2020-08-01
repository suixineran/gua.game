class GuaScene {
    constructor(game) {
        this.game = game
        this.debugModeEnabled = true
        this.elements = []
    }
    static new(game) {
        var i = new this(game)
        return i
    }

    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }

    // 自动的
    draw() {
        for (let e of this.elements) {
            e.draw()
        }
    }
    update() {
        //  可以设置专门的调试代码
        if (this.debugModeEnabled) {
            for (let i = 0; i < this.elements.length; i++) {
                let e = this.elements[i]
                e.debug && e.debug()
            }
        }
        for (let i = 0; i < this.elements.length; i++) {
            let e = this.elements[i]
            e.update &&e.update()
        }
    }
}
