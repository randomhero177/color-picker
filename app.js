console.log('working');


const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', event => {
    if (event.code.toLowerCase() === 'space') {
        setRandomColors();
    }
})

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type;

    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i'
            ? event.target
            : event.target.children[0];
        const button = event.target.tagName.toLowerCase() === 'i'
            ? event.target.parentNode
            : event.target;
        console.log(event);
        console.log(button);
        console.log('lock');
        node.classList = 'fa-solid fa-lock';
        node.dataset.type = button.dataset.type = 'open';
    } else if(type === 'open') {
        console.log('open')
    } else if (type === 'copy') {
        console.log('open')
        copyToClipboard(event.target.textContent);
    }
})

function setRandomColors() {
    cols.forEach((item) => {
        console.log(item);
        const isLocked = item.querySelector('i').classList.contains('fa-lock');
        if (isLocked) return

        const color = generateRandomColors();
        const h2 = item.querySelector('h2');
        const button = item.querySelector('button');
        h2.textContent = color;
        setTextColor(h2, color);
        setTextColor(button, color);
        item.style.background = color;
    });
}

setRandomColors();

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