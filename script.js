let images = [

  {
    src: "./images/armchair.png",
    title: "Rostov-on-Don, Admiral"
  },
  {
    src: "./images/table.png",
    title: "Sochi Thieves"
  },
  {
    src: "./images/tv.png",
    title: "Rostov-on-Don Patriotic"
  },
]


function initSlider(options) {

  if (!images || !images.length) return;

  //  если опшнс неопределено тогда запишем обьект
  options = options || {
    autoplay: false
  };

  let sliderImages = document.querySelector(".myImages");
  let sliderArrows = document.querySelectorAll(".arrow");
  let sliderDots = document.querySelector(".points");
  let sliderMenu = document.querySelector(".page2-navigation");

  initImages();
  initArrows();
  initMenu();
  initDots();
  // в зависимости от опций показываю или нет проигрывание
  if (options.autoplay) {
    initAutoplay();
  }

  // инициация
  function initImages() {
    images.forEach((callBack, index) => {
      let imageDiv = `<div class="page2-img1 n${index} ${index === 0 ? "active" : ""}" style="background-image:url(${images[index].src});" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }
  // инициация
  function initArrows() {
    sliderArrows.forEach(arrow => {
      arrow.addEventListener("click", function () {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = (curNumber === 0) ? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = (curNumber === images.length - 1) ? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }
  // инициация
  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="point n${index} ${index === 0 ? "active-white" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });

    sliderDots.querySelectorAll(".point").forEach(dot => {
      dot.addEventListener("click", function () {
        moveSlider(this.dataset.index);
        sliderDots.querySelector(".active-white").classList.remove("active-white");
        sliderDots.querySelector(".n" + this.dataset.index).classList.add("active-white");
      })
    })
  }
  // инициация
  function initMenu() {
    images.forEach((callBack, index) => {
      let titleDiv = `<li class="page2-navigation__item Yesev14 n${index} ${index === 0 ? "active" : ""}" data-index="${index}"><a href="#22">${images[index].title}</a></li>`;
      sliderMenu.innerHTML += titleDiv;
    });

    sliderMenu.querySelectorAll(".page2-navigation__item").forEach(menu => {
      menu.addEventListener("click", function () {
        // console.log(this);
        moveSlider(this.dataset.index);
        sliderMenu.querySelector(".active").classList.remove("active");
        sliderMenu.querySelector(".n" + this.dataset.index).classList.add("active");
      })
    })
  }

  //  движение
  function moveSlider(num) {
    //  num это индекс картинки в коллекции
    //  находим активный класс и убираем его
    //  приписываем актив тоиу номеру куда передали
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");

    sliderDots.querySelector(".active-white").classList.remove("active-white");
    sliderDots.querySelector(".n" + num).classList.add("active-white");

    sliderMenu.querySelector(".active").classList.remove("active");
    sliderMenu.querySelector(".n" + num).classList.add("active");
  }

  // автопроигрывание
  function initAutoplay() {
    setInterval(() => {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }
}

let sliderOptions = {
  autoplay: true,
  autoplayInterval: 5000
};

document.addEventListener("DOMContentLoaded", function () {
  initSlider(sliderOptions);
});

