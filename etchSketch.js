const color = document.querySelector('#color')
const colorBtn = document.querySelector('.color')
const rainbowBtn = document.querySelector('.rainbow')
const resetBtn = document.querySelector('.reset')
const grid = document.querySelector('.grid')
const rangeText = document.querySelector('.rangeValue')
const slider = document.querySelector('#gridSize')


const defaultGrid = 16
const defaultColor = '#000'
const defaultMode = 'color'

let currentSize = defaultGrid
let currentColor = defaultColor
let currentMode = defaultMode


color.oninput = (e) => changeColor(e.target.value)
colorBtn.onclick = () => changeMode('color')
rainbowBtn.onclick = () => changeMode('rainbow')
resetBtn.onclick = () => reloadGrid()
slider.onmousemove = (e) => update(e.target.value)
slider.onchange = (e) => sizeValue(e.target.value)

window.onload = () => {
    setUp(defaultGrid)
    buttonCheck(defaultMode)
}

let clickHold = false
document.body.onmousedown = () => (clickHold = true)
document.body.onmouseup = () => (clickHold = false)

function changeSize(newSize) {
    currentSize = newSize
}
function changeColor(newColor) {
    currentColor = newColor
}
function changeMode(newMode) {
    buttonCheck(newMode)
    currentMode = newMode 
}

function sizeValue(value) {
    changeSize(value)
    update(value)
    reloadGrid()
}

function update(value) {
    rangeText.innerHTML = `${value} x ${value}`
}

function setUp(size) {
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridBox = document.createElement('div')
        gridBox.classList.add('grid-box')
        gridBox.addEventListener('mouseover', backColor)
        gridBox.addEventListener('mousedown', backColor)
        grid.appendChild(gridBox)
    }
}

function backColor(e) {
    if (e.type === 'mouseover' && !clickHold) return
    if (currentMode === 'rainbow') {
      const R = Math.floor(Math.random() * 256)
      const G = Math.floor(Math.random() * 256)
      const B = Math.floor(Math.random() * 256)
      e.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`
    } else if (currentMode === 'color') {
      e.target.style.backgroundColor = currentColor
    }
}

function buttonCheck(newMode) {
    if (currentMode === 'color') { colorBtn.classList.remove('active') }
    else if (currentMode === 'rainbow') { rainbowBtn.classList.remove('active') }

    if (newMode === 'color') { colorBtn.classList.add('active') }
    else if (newMode === 'rainbow') { rainbowBtn.classList.add('active') }
}

function reloadGrid() {
    clearGrid()
    setUp(currentSize)
}

function clearGrid() {
    grid.innerHTML = ''
}