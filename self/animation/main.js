var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k === 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            // blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    // document.querySelector('#id-input-speed').addEventListener('input', function(event) {
    //     var input = event.target
    //     window.fps = Number(input.value)
    // })
}

var __main = function() {
    var images = {
        bullet: 'img/bullet.png',
        player: 'img/player.gif',
        cloud: 'img/cloud1.png',
        sky: 'img/sky.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.gif',
        enemy3: 'img/enemy3.png',
        fire: 'img/fire.png',
        donghua1: 'img/donghua1.jpg',
        donghua2: 'img/donghua2.jpg',
        w1: 'img/run/w1.png',
        w2: 'img/run/w2.png',
        w3: 'img/run/w3.png',
        w4: 'img/run/w4.png',
        w5: 'img/run/w5.png',
        w6: 'img/run/w6.png',
        idle1: 'img/idle/idle1.png',
        idle2: 'img/idle/idle2.png',
        idle3: 'img/idle/idle3.png',
        idle4: 'img/idle/idle4.png',
        idle5: 'img/idle/idle5.png',
        idle6: 'img/idle/idle6.png',

    }

    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    // enableDebugMode(game, true)
}

__main()
