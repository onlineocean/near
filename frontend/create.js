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

inputTitle.textContent = localStorage.getItem('nameOfCard');
createImg.src = `assets/img/${localStorage.getItem('nameOfCard')}.png`;

const inputs = document.querySelectorAll('.line-chek'),
      btn = document.querySelector('.btn--non'),
      inputsArr = Array.from(inputs),
      price = document.querySelector('.line__price'),
      nameOfWork = document.querySelector('.name__work'),
      nameInput = document.querySelector('.line__name'),
      procent = document.querySelector('.procent'),
      priceCount = document.querySelector('.jsCount'),
      multipleInput = document.querySelector('.multip-input');

function limitedValue(nameOfValue, count) {
    if (nameOfValue.textContent.length > count) {
        nameOfValue.textContent = nameOfValue.textContent.slice(0, count) + '...'
    }
}

inputs.forEach(item => {
    
    let statusMessage = document.createElement('div');
    statusMessage.innerHTML = 'Invalid value'
                statusMessage.style.cssText = `
                    font-size: 12px;
                    line-height: 14px;
                    position: absolute;
                    left: 295px;
                `;
    item.addEventListener('input', () => {

        nameOfWork.textContent = nameInput.value

        if (item.value == '') {
            statusMessage.style.color = '#e85b67';
        } else {
            statusMessage.style.color = 'transparent';
        }
        limitedValue(nameOfWork, 16);

        if ((inputsArr.some(elem => elem.value == '') || (!isNaN(price.value)) == false || multipleInput.value < 2) ) {
            btn.disabled = true;
        } else {
            btn.disabled = false;
        }

        if (!isNaN(price.value) ) {
            priceCount.textContent = price.value;
            procent.textContent = price.value - price.value * 0.025;

            limitedValue(priceCount, 10);
            limitedValue(procent, 10);
        } else {
            price.value = price.value.replace(/[\D0]/, '');
        }

        item.insertAdjacentElement('afterend', statusMessage);
    });
});

let statusMessageCopies = document.createElement('div');
statusMessageCopies.innerHTML = 'Copies must be more than 1'
        statusMessageCopies.style.cssText = `
                    font-size: 12px;
                    line-height: 14px;
                    position: absolute;
                    left: 202px;
                `;

multipleInput.addEventListener('input', () => {
    if (!isNaN(multipleInput.value) ) {
    } else {
        multipleInput.value = multipleInput.value.replace(/[\D0]/, '');
    }

    if ((inputsArr.some(elem => elem.value == '') || (!isNaN(price.value)) == false || multipleInput.value < 2) ) {
        btn.disabled = true;
    } else {
        btn.disabled = false;
    }

    if (multipleInput.value < 2) {
        statusMessageCopies.style.color = '#e85b67';
    } else {
        statusMessageCopies.style.color = 'transparent';
    }

    multipleInput.insertAdjacentElement('afterend', statusMessageCopies);
});

if ((inputsArr.some(elem => elem.value == '') ) ) {
    btn.disabled = true;
} else {
    btn.disabled = false;
}

const multipleBlock = document.querySelector('.multiple');


if (localStorage.getItem('nameOfCard') == 'Multiple') {
    multipleBlock.classList.add('mulblock');
} else {
    multipleBlock.classList.remove('mulblock');
}



/* Tab */
let tab = document.querySelectorAll('.tab-header'),
    tabContent = document.querySelectorAll('.tab-content');

function hideTab() {
    tab.forEach((item) => {
        item.classList.remove('tab-header_show');
    });
    
    tabContent.forEach((item) => {
        item.classList.remove('tab-content_show');
    });
}

tab.forEach(function(tab, i) {
    tab.addEventListener('click', function() {
        hideTab();
        this.classList.add('tab-header_show');
        tabContent[i].classList.add('tab-content_show');
    });
});