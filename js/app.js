window.addEventListener('load', function () {
  //header background images
  let imageIndex = 3;
  const background = document.getElementById('background');

  setInterval(function () {
    if (imageIndex === 1) {
      background.style.backgroundPosition = "center";
    } else {
      background.style.backgroundPosition = "bottom";
    }

    background.style.backgroundImage = `url("../img/header${imageIndex}.jpg")`;

    imageIndex++;
    if (imageIndex > 3) {
      imageIndex = 1;
    }
  }, 10000);
  //skills progress bars
  const skills = Array.from(document.querySelectorAll('#skills progress'));

  skills.forEach(progress => {
    let div = document.createElement('div'),
      width = progress.getAttribute('value') + "%";
    div.className = "c-progress";
    div.appendChild(document.createTextNode(width));
    div.setAttribute('aria-hidden', "true");

    progress.parentElement.appendChild(div);
  });

  if (window.scrollY >= (document.getElementById('skills').offsetTop) / 2) {
    skills.forEach(progress => {
      progress.nextElementSibling.style.width = progress.getAttribute('value') + "%";
    });
  }

  window.addEventListener('scroll', function () {
    if (window.scrollY >= (document.getElementById('skills').offsetTop) / 2) {
      skills.forEach(progress => {
        progress.nextElementSibling.style.width = progress.getAttribute('value') + "%";
      });
    } else {
      skills.forEach(progress => {
        progress.nextElementSibling.style.width = "0";
      });
    }
  });

  //navigation menu
  const navBtn = document.getElementById('nav-btn');
  navBtn.addEventListener('click', function () {
    this.parentElement.nextElementSibling.classList.add('menu');
    document.body.classList.add('menu-open');
  });
  const navClose = document.getElementById('nav-close');
  navClose.addEventListener("click", function () {
    this.parentElement.parentElement.parentElement.classList.remove('menu');
    document.body.classList.remove('menu-open');
  })
  //portfolio
  const workImage = Array.from(document.querySelectorAll('.app-work-img img')),
    modal = document.getElementById('modal'),
    closeModal = document.getElementById('close-modal'),
    techButtons = Array.from(document.querySelectorAll('.app-work-btn button'));

  techButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      workImage.forEach(img => {
        if (btn.getAttribute('data-btn') === "all") {
          img.style.display = "block";
        } else {
          if (img.getAttribute('data-type') === this.getAttribute('data-btn')) {
            img.style.display = "block";
          } else {
            img.style.display = "none";
          }
        }
      });
    });
  });
  closeModal.addEventListener('click', function () {
    document.body.classList.remove('modal-open');
  });

  workImage.forEach(img => {
    img.addEventListener('click', function () {
      let largeImage = document.createElement('img');
      document.body.classList.add('modal-open');
      largeImage.src = this.src;
      modal.appendChild(largeImage);
    });
  });

  const repos = document.getElementById('repos')
  fetch('https://api.github.com/users/AkliYalaoui/repos?sort=created&direction=desc&per_page=5')
    .then(res => res.json())
    .then(data => {
      console.clear();
      data.forEach(repo => createGithubRepos(repo));
    })
    .catch(err => console.log(err));

  const year = document.getElementById('year');
  year.textContent = new Date().getFullYear();
});

function createGithubRepos(repo) {
  const card = document.createElement('div'),
    cardTitle = document.createElement('h3'),
    cardDesc = document.createElement('p'),
    cardLink = document.createElement('a'),
    cardTime = document.createElement('time'),
    div = document.createElement('div'),
    cardstarts = document.createElement('span'),
    cardLang = document.createElement('span');

  cardTitle.appendChild(document.createTextNode(repo.name));
  cardDesc.appendChild(document.createTextNode(repo.description))
  cardLink.href = repo.html_url;
  cardLink.target = "_blank";
  cardLink.appendChild(document.createTextNode("see repo"));
  cardTime.dateTime = repo.created_at;
  cardTime.appendChild(document.createTextNode('created at : ' + new Date(repo.created_at).toDateString()));
  cardstarts.appendChild(document.createTextNode("stars: " + repo.stargazers_count));
  cardLang.appendChild(document.createTextNode("Language: " + repo.language));

  div.appendChild(cardLang);
  div.appendChild(cardstarts);

  card.appendChild(cardTitle);
  card.appendChild(cardDesc);
  card.appendChild(cardTime);
  card.appendChild(div);
  card.appendChild(cardLink);
  card.className = "repo";
  repos.appendChild(card);
}