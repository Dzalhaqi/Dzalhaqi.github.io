// function expression dengan penulisan sintaks es6 untuk memilih elemen html
const selectElement = (s) => document.querySelector(s);
// membuka menu ketika diklik
selectElement('.open').addEventListener('click', () => {
    selectElement('.nav-list').classList.add('active');
});
// menutup menu ketika diklik
selectElement('.close').addEventListener('click', () => {
    selectElement('.nav-list').classList.remove('active');
});