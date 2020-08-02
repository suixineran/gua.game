/*
每个 图块 8 * 8 像素
每个像素 2个bits
16个bytes 一个图块
每页8 * 8个图块 就是宽高 都是64个像素  然后每个像素放大10倍

 */
const e = sel => document.querySelector(sel)
const log = console.log.bind(console)
let config = {
    offset: 0,
}


const ajax = request => {
    let r = new XMLHttpRequest()
    r.open('GET', request.url, true)
    r.responseType = 'arraybuffer'
    r.onreadystatechange = event => {
        if (r.readyState === 4) {
            request.callback(r.response)
        }
    }
    r.send()
}


const actions = {
    change_offset(offset) {
        config.offset += offset
        e('h3').innerHTML = config.offset
        drawNes(window.bytes)
    }

}
const bindEvents = () => {
    e('.gua-controls').addEventListener('click', event => {
        let action = event.target.dataset.action
        let offset = Number(event.target.dataset.offset)
        actions[action] && actions[action](offset)
    })

}

const drawBlock = (context, data, x, y, pixeLWidth) => {
    let colors = [
        '#a4feb9',
        '#FE1000',
        '#FFB010',
        '#AA3030',
    ]
    let w = pixeLWidth
    let h = pixeLWidth
    for (let i = 0; i < 8; i++) {
        let p1 = data[i]
        let p2 = data[i + 8]
        for (let j = 0; j < 8; j++) {
            // 8 个 比特 一行  里面的循环 每次画出 一个像素
            let c1 = (p1 >> (7 - j) & 0b00000001)
            let c2 = (p2 >> (7 - j) & 0b00000001)
            let pixel = (c2 << 1) + c1
            let color = colors[pixel]
            log('c1',c1)
            log('c2',c2)
            log('pixel',pixel)
            log('color',color)
            context.fillStyle = color
            let px = x + j * w
            let py = y + i * h
            context.fillRect(px, py, w, h)
        }
    }

}
const drawNes = bytes => {
    // 第一个方块
    // 78  69
    // 0100 1110 0100 0101
    // 2个比特 产生 4种颜
    let canvas = e('#id-canvas')
    let context = canvas.getContext('2d')

    let blockSize = 8
    let pixelSize = 8
    let pixeLWidth = 10
    let numberOfBytesPerBlock = 16
    for (let i = 0; i < blockSize; i++) {
        for (let j = 0; j < blockSize; j++) {
          let x = j * pixelSize * pixeLWidth
          let y = i * pixelSize * pixeLWidth
            let index = config.offset + (i * 8 + j) * numberOfBytesPerBlock
            // log('x, y ,index,', x, y ,index, )
            drawBlock(context, bytes.slice(index), x, y, pixeLWidth)
        }
    }
}

const __main = () => {
    let request = {
        url: 'mario.nex',
        callback(r) {
            window.bytes = new Uint8Array(r)
            log('bytes', window.bytes)
            drawNes(window.bytes)
        }
    }
    ajax(request)
    bindEvents()
}

__main()