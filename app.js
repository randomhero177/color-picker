const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', event => {
    if (event.code.toLowerCase() === 'space') {
        event.preventDefault();
        setRandomColors();
    }
})

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type;
    const node = event.target.tagName.toLowerCase() === 'i'
        ? event.target
        : event.target.children[0];
    const button = event.target.tagName.toLowerCase() === 'i'
        ? event.target.parentNode
        : event.target;
    if (type === 'lock') {
        node.classList = 'fa-solid fa-lock';
        node.dataset.type = button.dataset.type = 'open';
    } else if(type === 'open') {
        node.classList = 'fa-solid fa-lock-open';
        node.dataset.type = button.dataset.type = 'lock';
    } else if (type === 'copy') {
        copyToClipboard(event.target.textContent);
    }
})

function setRandomColors(hashedColors = []) {
    let colorsArr = '';
    cols.forEach((item, i) => {
        const isLocked = item.querySelector('i').classList.contains('fa-lock');
        const color = hashedColors[i] || generateRandomColors();
        const h2 = item.querySelector('h2');
        colorsArr += `${isLocked ? h2.textContent.substring(1) : color.substring(1)}${cols.length - 1 > i ? '-' : ''}`;

        if (isLocked) return

        const button = item.querySelector('button');
        h2.textContent = color;
        setTextColor(h2, color);
        setTextColor(button, color);
        item.style.background = color;
    });
    window.location.hash = colorsArr;
}



function generateRandomColors() {
    const hexCodes = '0123456789ABCDEF';
    let color = '';

    for (let i =0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    }
    return `#${color}`;
}

function setTextColor(elem, color) {
    const luminance = chroma(color).luminance();
    elem.style.color = luminance > 0.5 ? 'black' : 'white';
}

function copyToClipboard(text) {
    return navigator.clipboard.writeText(text);
}

function getColorsFromHash() {
    const hash = window.location.hash;
    const data = hash ? hash.substring(1).split('-').map(color => `#${color}`) : [];
    setRandomColors(data);
}

getColorsFromHash();