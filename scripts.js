const container = document.getElementById('container');

createGrid();
function createGrid(size=16){
    container.innerHTML = '';
    container.style.width = (size * 20) + 'px';
    for (let i = 0; i < size; i++){
        for (let j = 0; j< size; j++){
            const square = document.createElement('div');
            square.classList.add('grid-square');
            container.append(square);
        }
    }
}
document.getElementById('submitBtn').addEventListener('click', () => {
    let input = parseInt(document.getElementById("dimension").value);
    if (!input || input < 1 || input > 100) {
        alert('Please enter a number between 1 and 100');
        return;
    }
    createGrid(input);
})

document.getElementById('reset').addEventListener('click', () => {
    createGrid();
    cell.classList.remove('hovered');
})

container.addEventListener('mouseover', e => {
    const cell = e.target.closest('.grid-square');
    if(!cell) return;

    const randomColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
    cell.style.backgroundColor = randomColor;
    cell.classList.add('hovered');
});