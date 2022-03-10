const stdout = document.querySelector('.stdout');
const field = document.querySelector('#field');
const container = document.querySelector('.container');

function run(cmd) {
    if (cmd.toString().toUpperCase() === 'HELP') {
        return 'WORK IN PROGRESS';
    }
}

function scrollToBottom() {
    stdout.scrollTo(0, stdout.scrollHeight);
}

function scrollByKey(ratio) {
    stdout.scrollTop = stdout.scrollTop + ratio * 30;
}

function setEndOfContenteditable(contentEditableElement)  {
    let range,selection;
    if (document.createRange) {
        range = document.createRange();
        range.selectNodeContents(contentEditableElement);
        range.collapse(false);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    } else if (document.selection) {
        range = document.body.createTextRange();
        range.moveToElementText(contentEditableElement);
        range.collapse(false);
        range.select();
    }
}

function focus() {
    field.focus();
    setEndOfContenteditable(field);
}

function addLine(text, withPrefix) {
    const line = document.createElement('div');
    line.innerText = `${withPrefix ? '> ' : ''}${text}`;
    line.classList.add('line');

    stdout.append(line);
    field.innerHTML = '';

    scrollToBottom();
}

container.addEventListener('click', () => {
    focus();
});

field.addEventListener('keydown', async (e) => {
    const value = field.innerText.trim();
    const key = e.which || e.keyCode;

    switch (key) {
        case 13:
            e.preventDefault();

            if (value) {
                addLine(value, true);
            const res = run(value);
            if (res)
                addLine(res);
            }
            break;

        case 38:
        case 40:
            e.preventDefault();

            scrollByKey(key === 38 ? -1 : 1);
            break;
    }
}, true);

focus();
