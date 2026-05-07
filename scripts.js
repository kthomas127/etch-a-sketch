const container = document.getElementById('container');
const GRID_SIZE_PX = 320;
let isMouseDown = false;
let activeTool = 'pen';
const colorPicker = document.getElementById('colorPicker');
const toolButtons = document.querySelectorAll("#controls button[data-tool]");

function setActiveTool(tool) {
    toolButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-tool="${tool}"]`).classList.add('active');
    activeTool = tool;
}

function createGrid(size = 16){
    const squareSize = GRID_SIZE_PX / size;
    container.innerHTML = '';
    container.style.width = GRID_SIZE_PX + 'px';
    container.style.height = GRID_SIZE_PX + 'px';
    for (let i = 0; i < size; i++){
        for (let j = 0; j< size; j++){
            const square = document.createElement('div');
            square.classList.add('grid-square');
            square.style.width = squareSize + 'px';
            square.style.height = squareSize + 'px';
            container.append(square);
        }
    }
}

function colorCell(cell) {
    if (activeTool === 'rainbow') {
        cell.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
    } else if (activeTool === 'pen') {
        cell.style.backgroundColor = colorPicker.value;
    } else if (activeTool === 'eraser') {
        cell.style.backgroundColor = '';
    } else if (activeTool === 'fill') {
        document.querySelectorAll('.grid-square').forEach(square => {
            square.style.backgroundColor = colorPicker.value;
        });
    }
    cell.classList.add('hovered');
}

toolButtons.forEach(btn => {
  btn.addEventListener('click', () => setActiveTool(btn.dataset.tool));
});

colorPicker.addEventListener('input', () => setActiveTool('pen'));

document.getElementById('submitBtn').addEventListener('click', () => {
    let input = parseInt(document.getElementById("dimension").value);
    if (!input || input < 1 || input > 100) {
        alert('Please enter a number between 1 and 100');
        return;
    }
    createGrid(input);
});

document.getElementById('reset').addEventListener('click', () => {
    createGrid();
    document.getElementById('dimension').value = "";
    colorPicker.value = '#000000';
})

document.addEventListener('mousedown', () => isMouseDown = true);
document.addEventListener('mouseup', () => isMouseDown = false);

container.addEventListener('click', e => {
    const cell = e.target.closest('.grid-square');
    if (!cell) return;
    colorCell(cell);
});

container.addEventListener('mouseover', e => {
    if (!isMouseDown) return;
    const cell = e.target.closest('.grid-square');
    if (!cell) return;
    colorCell(cell);
});

createGrid();