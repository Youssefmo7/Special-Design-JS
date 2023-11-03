// start local storage

// check if there's a color in the local storage
let mainColor = localStorage.getItem("color-option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.querySelectorAll(".color-list li").forEach((color) => {
    if (color.dataset.color === mainColor) {
      color.classList.add("clicked");
    }
  });
}
// end

// end local storage

// start switching landing page background Image

let page = document.querySelector(".landing-page");
let images = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
let firstButton = document.querySelector("#first-button");
let secondButton = document.querySelector("#second-button");

let backgroundrandomize;
function randomize() {
  backgroundrandomize = setInterval(() => {
    let random = Math.floor(Math.random() * images.length);
    page.style.backgroundImage = `url("images/${images[random]}")`;
  }, 10000);
  secondButton.style.setProperty("opacity", ".6");
  firstButton.style.setProperty("opacity", "1");
}
// controlling switching backgrounds with buttons in settings box
firstButton.onclick = function () {
  randomize();
  localStorage.setItem("switch backgrounds", "yes");
};

secondButton.onclick = function () {
  clearInterval(backgroundrandomize);
  secondButton.style.setProperty("opacity", "1");
  firstButton.style.setProperty("opacity", ".6");
  localStorage.setItem("switch backgrounds", "no");
};

// controlling background switching with local storage
let switchBackgrounds = localStorage.getItem("switch backgrounds");
if (switchBackgrounds === "yes" || switchBackgrounds === null) {
  randomize();
  firstButton.style.setProperty("opacity", "1");
} else {
  secondButton.style.setProperty("opacity", "1");
}
// end

// end switching landing page background Image

// start links at media queries
let but = document.querySelector(".toggle-menu");
but.onclick = function () {
  document.querySelector(".links-container ul").classList.toggle("open");
}
// end links at media queries

// start scrolling with bullets and links
// bullets
let bullets = document.querySelectorAll(".nav-bullets .bullet");
bullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document
      .querySelector(e.target.dataset.section)
      .scrollIntoView({ behavior: "smooth" });
  });
});

// links
let navigationLinks = document.querySelectorAll(".links-container ul li a");
navigationLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(e.target.dataset.section).scrollIntoView({ behavior: "smooth"})
  })
})
// end scrolling with bullets and links

//  start hide bullets
let thirdButton = document.querySelector("#third-button");
let fourthButton = document.querySelector("#fourth-button");
thirdButton.onclick = function () {
  thirdButton.style.setProperty("opacity", "1");
  fourthButton.style.setProperty("opacity", ".6");
  document.querySelector(".nav-bullets").style.removeProperty("display");
  localStorage.setItem("hide bullets", "yes");
};
fourthButton.onclick = function () {
  fourthButton.style.setProperty("opacity", "1");
  thirdButton.style.setProperty("opacity", ".6");
  document.querySelector(".nav-bullets").style.setProperty("display", "none");
  localStorage.setItem("hide bullets", "no");
};

// controlling bullets with local storage
let hideBullets = localStorage.getItem("hide bullets");
if (hideBullets === "yes" || hideBullets === null) {
  thirdButton.style.setProperty("opacity", "1");
  fourthButton.style.setProperty("opacity", ".6");
  document.querySelector(".nav-bullets").style.removeProperty("display");
  localStorage.setItem("hide bullets", "yes");
} else {
  fourthButton.style.setProperty("opacity", "1");
  thirdButton.style.setProperty("opacity", ".6");
  document.querySelector(".nav-bullets").style.setProperty("display", "none");
}
//  end hide bullets

// start adjusting progress
// selecting our skills section
let ourSkills = document.querySelector(".our-skills");

window.onscroll = () => {
  // selecting height above our skills section
  let ourSkillsOboveHeight = ourSkills.offsetTop;

  // selecting height of our skills section
  let ourSkillsHeight = ourSkills.offsetHeight;

  let windowHeight = this.innerHeight;
  let windowscroll = this.scrollY;

  if (
    windowscroll >=
    ourSkillsOboveHeight + ourSkillsHeight / 2 - windowHeight
  ) {
    let skillsBoxes = document.querySelectorAll(".level span");
    skillsBoxes.forEach((box) => {
      box.style.width = box.dataset.progress;
    });
  }


  // start home button
  let landingPageHeight = page.offsetHeight;
  let home = document.querySelector(".home");
  if (window.scrollY >= landingPageHeight) {
    home.style.setProperty("display", "block");
    home.onclick = function () {
      page.scrollIntoView({ behavior: "smooth" });
    };
  } else {
    home.style.setProperty("display", "none");
  }
  // end home button
};
// end adjusting progress
// start settings box
let gear = document.querySelector(".hideBox");
let settingsBox = document.querySelector(".settings-box");

gear.addEventListener("click", (e) => {
  settingsBox.classList.toggle("open");
});

// switching colors
let coloricons = document.querySelectorAll(".color-list li");

coloricons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color-option", e.target.dataset.color);
    e.target.classList.toggle("clicked");
    coloricons.forEach((icon) => {
      if (icon != e.target) icon.classList.remove("clicked");
    });
  });
});

// reset button
let resetButton = document.querySelector(".resetButton");
resetButton.onclick = function () {
  localStorage.clear();
  document.documentElement.style.setProperty("--main-color", "#03A9F4");
  document.querySelectorAll(".color-list li").forEach((color) => {
    if (color.dataset.color === "#4CAF50") {
      color.classList.add("clicked");
    }
  });
  randomize();
  thirdButton.style.setProperty("opacity", "1");
  fourthButton.style.setProperty("opacity", ".6");
  document.querySelector(".nav-bullets").style.removeProperty("display");
  coloricons.forEach((icon) => {
    if (icon.classList.contains("clicked")) icon.classList.remove("clicked");
  });
};
// end settings box

// start gallery
let galleryImages = document.querySelectorAll(".our-gallery img");

galleryImages.forEach((image) => {
  image.addEventListener("click", (e) => {
    let imagediv = document.createElement("div");
    let overlay = document.createElement("div");
    overlay.classList.add("gallery-overlay");
    imagediv.classList.add("opened-image-box");
    let imageNum = document.createElement("h3");
    imageNum.textContent = image.getAttribute("alt");
    let exit = document.createElement("span");
    exit.textContent = "X";
    imagediv.appendChild(imageNum);
    let clone = image.cloneNode(true);
    imagediv.appendChild(clone);
    imagediv.appendChild(exit);
    document.body.appendChild(overlay);
    document.body.appendChild(imagediv);

    // exit button
    exit.addEventListener("click", (e) => {
      imagediv.removeChild(imageNum);
      imagediv.removeChild(exit);
      imagediv.removeChild(clone);
      document.body.style.removeProperty("background-color");
      document.body.removeChild(imagediv);
      document.body.removeChild(overlay);
    });
  });
});
// end gallery
 

