const projects = [
  {
    url: "https://wittikay.github.io/se_project_spots/",
    imgSrc: "./images/spots.svg",
    alt: "",
  },
  {
    url: "https://wittikay.github.io/se_project_library_updated/",
    imgSrc: "./images/library.svg",
    alt: "",
  },
  {
    url: "https://wittikay.github.io/se_project_coffeeshop/",
    imgSrc: "./images/logo_coffeeshop_dark.svg",
    alt: "",
  },
];

const socials = [
  {
    url: "https://soundcloud.com/wittikay",
    imgSrc: "./images/soundcloud.svg",
    alt: "The SoundCloud logo in front of orange clouds.",
  },
  {
    url: "https://github.com/wittikay",
    imgSrc: "./images/github-mark.svg",
    alt: "GitHub's mascot cat illustrated as a simple logo.",
  },
  {
    url: "https://stackoverflow.com/users/21637883/wittikay",
    imgSrc: "./images/stackoverflow.png",
    alt: "The logo for stackoverflow. It appears to be a bin with multiple orange sheets tipping over it.",
  },
  {
    url: "https://www.linkedin.com/in/karl-wilson-673289191/",
    imgSrc: "./images/LI-In-Bug.png",
    alt: "LinkedIn's logo. It appears to be a blue square with the letters 'in' in white.",
  },

  {
    url: "https://www.facebook.com/karl.wilson.754365",
    imgSrc: "./images/Facebook_Logo_Primary.png",
    alt: "",
  },

  {
    url: "https://www.codewars.com/users/wittikay",
    imgSrc:"./images/codewars.svg",
    alt: "",
  },
];

const renderProjects = () => {
  const projectContainer = document.getElementById("projects");
  projectContainer.className = "section__list";
  projects.forEach((project) => {
    const listItem = document.createElement("li");
    listItem.className = "section__list-item";
    const projectElement = document.createElement("a");
    projectElement.href = project.url;
    projectElement.target = "_blank";
    projectElement.className = "section__link";
    const img = document.createElement("img");
    img.src = project.imgSrc;
    img.alt = project.alt;
    img.className = "section__link-img section__link-project-img";
    projectElement.appendChild(img);
    projectContainer.appendChild(projectElement);
  });
};

const renderSocials = () => {
  const socialContainer = document.getElementById("socials");
  socials.forEach((social) => {
    socialContainer.className = "section__list";
    const listItem = document.createElement("li");
    listItem.className = "section__list-item";
    const socialElement = document.createElement("a");
    socialElement.href = social.url;
    socialElement.target = "_blank";
    socialElement.className = "section__link";
    const img = document.createElement("img");
    img.src = social.imgSrc;
    img.alt = social.alt;
    img.className = "section__link-img section__link-social-img";
    socialElement.appendChild(img);
    socialContainer.appendChild(socialElement);
  });
};

renderProjects();
renderSocials();
