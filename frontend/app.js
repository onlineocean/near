let notification = document.querySelector('#notification');
let blockchain = document.querySelector('#blockchain');
let NotModal = document.querySelector('#NotModal');
let NotModal2 = document.querySelector('#NotModal2');
let flexContent = document.querySelector("#flexContent");

let clickCount = 0;
function checkClick() {
  if ( clickCount % 2 == 0 ) {
    setTimeout(function() {
        NotModal.classList.add('notification-active');
    }, 1);
    NotModal.classList.remove('nonee');
  } else {
    setTimeout(function() {
        NotModal.classList.add('nonee');
    }, 200);
    NotModal.classList.remove('notification-active');
  }

  clickCount++;
}

let clickCount2 = 0;
function checkClick2() {
  if ( clickCount2 % 2 == 0 ) {
    setTimeout(function() {
        NotModal2.classList.add('notification-active');
    }, 1);
    NotModal2.classList.remove('nonee');
}   else  {
        setTimeout(function() {
            NotModal2.classList.add('nonee');
        }, 200);
        NotModal2.classList.remove('notification-active');
    }

  clickCount2++;
}

const mediaQuery = window.matchMedia('(max-width: 992px)');
function handleTabletChange(e) {
    if (e.matches) {
        let not = document.getElementsByClassName("ddd");
        let mod = document.getElementsByClassName('notification-active');
        for (i = 0; not.length > i; i++) {
            not[i].onclick = function() {
                let current = mod[0];
                if (current) {
                    setTimeout(function() {
                        current.classList.remove("notification-active");
                    }, 1);
                
                setTimeout(function() {
                    current.classList.remove("notification-active");
                    current.classList.add('nonee');
                }, 200);
            }
            };
        }
    }
  }
mediaQuery.addListener(handleTabletChange);
handleTabletChange(mediaQuery);

let clickCount5 = 0;
        function checkClick5() {
        if ( clickCount5 % 2 == 0 ) {
            setTimeout(function() {
                NotModal2.classList.add('notification-active');
            }, 1);
            NotModal2.classList.remove('nonee');
        }

clickCount5+=2;
}

let clickCount4 = 0;
        function checkClick4() {
        if ( clickCount4 % 2 == 0 ) {
            setTimeout(function() {
                NotModal.classList.add('notification-active');
            }, 1);
            NotModal.classList.remove('nonee');
        }

clickCount4+=2;
}



let modalItem = document.getElementsByClassName("modal__inner-item");
let borderColor = document.getElementsByClassName('borderColor');
for (i = 0; modalItem.length > i; i++) {
    modalItem[i].onclick = function() {
    let currentActive = borderColor[0];
    if (currentActive)
      currentActive.classList.remove("borderColor");

    if (currentActive !== this)
      this.classList.add("borderColor");
    };
}

let navToggle = document.querySelector("#navToggle");

navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('burger-active');

    flexContent.classList.toggle('show');
});

navToggle.addEventListener('click', function () {
    NotModal.classList.remove('notification-active');
    NotModal2.classList.remove('notification-active');
});

let clickCount3 = 0;
function checkClick3() {
  if ( clickCount3 % 2 == 0 ) {
}   else  {
        clickCount++;
        clickCount2++;
    }

    clickCount3++;
}

new Splide( '#projectSlider', {
    perPage: 2,
    perMove: 1,
    arrows : true,
    gap    : '20px',
    pagination : false,
    breakpoints: {
        800: {
          perPage: 1,
        }
    }

} ).mount();

new Splide( '#productSlider', {
    perPage: 4,
    perMove: 1,
    arrows : true,
    gap    : '20px',
    pagination : false,
    breakpoints: {
        800: {
          perPage: 2,
        },
        540: {
            perPage: 1,
        }
    }

} ).mount();

new Splide( '#productSlider1', {
    perPage: 4,
    perMove: 1,
    arrows : true,
    gap    : '20px',
    pagination : false,
    breakpoints: {
        800: {
          perPage: 2,
        },
        540: {
            perPage: 1,
        }
    }

} ).mount();

new Splide( '#productSlider2', {
    perPage: 4,
    perMove: 1,
    arrows : true,
    gap    : '20px',
    pagination : false,
    breakpoints: {
        800: {
          perPage: 2,
        },
        540: {
            perPage: 1,
        }
    }

} ).mount();