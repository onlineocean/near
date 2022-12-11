/* Create Card */
const cardItems = document.querySelectorAll('.create__group-item'),
      backLink = document.querySelectorAll('.create__inner-link');

animate(cardItems, 'animate__rubberBand');
animate(backLink, 'animate__fadeOutLeft');

function animate(animateEl, animateName) {
    animateEl.forEach(item => {
        item.querySelector('img').classList.add('animate__animated');

        item.addEventListener('mouseenter', () => {
            item.querySelector('img').classList.add(animateName);
        });
    
        item.addEventListener('mouseleave', () => {
            item.querySelector('img').classList.remove(animateName);
        });
    });
}

let nameOfCard = '';
const inputTitle = document.querySelector('.input-title');
const createImg = document.querySelector('.create__box-flexbox img');

cardItems.forEach(item => {
    item.addEventListener('click', () => {
        nameOfCard = item.querySelector('.create__group-title').innerText
        localStorage.setItem('nameOfCard', nameOfCard);
    });
});