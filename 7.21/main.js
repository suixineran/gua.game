var loadLevel = function(game, n) {
    log('loadlevel')
    n = n - 1
    var level = levels[n]
    var blocks = []
    // log('loadlevel 1')
    for (var i = 0; i < level.length; i++) {
        // log('loadlevel 2')
        var p = level[i]
        // log('loadlevel 3', game, p)
        var b = Block(game, p)
        blocks.push(b)
    }
    log('loadlevel blocks', blocks)
    return blocks
}

var enableDebugMode = function(game, enable) {
    log('enable')
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        // log('kkkkkk')
        if (k === 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            log('k is what', k)
            // 为了 debug 临时加的载入关卡功能
            blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var __main = function() {
    log('main')
    var images = {
        ball: 'img/ball.png',
        block: 'img/block.png',
        paddle: 'img/paddle.png',
    }

    // g是怎么传进去的，在 什么地方读取的，是全局的吗？
    // log('mainwenjian的g是什么',g)
    var game = GuaGame.instance(30, images, function(g){
        log('mainwenjian的g是什么',g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
