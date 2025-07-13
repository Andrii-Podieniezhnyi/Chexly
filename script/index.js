const createdTabsBtns = document.querySelectorAll('.created-tabs-button');

console.log(createdTabsBtns);

createdTabsBtns.forEach(function (btn) {
    btn.addEventListener('click', () => {
        console.log('+');

        createdTabsBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
    })
})