const main = document.querySelector('#main');
const emsadData = './emsad.json';
const githubApi = 'https://api.github.com/users/emsad87/repos';

const getData = async (dataFile) => {
  try {
    const resp = await fetch(dataFile);
    const data = await resp.json();
    dataOut(data);
  } catch (err) {
    console.log(err);
  }
};

const getGithub = async (githubApi) => {
  try {
    const resp = await fetch(githubApi);
    const data = await resp.json();
    githubData(data);
  } catch (err) {
    console.log(err);
  }
};

const fetchMulti = async (data1, data2) => {
  try {
    [data1, data2] = await Promise.all([fetch(data1), fetch(data2)]);
    [data1, data2] = await Promise.all([data1.json(), data2.json()]);

    dataOut(data1);
    githubData(data2);
  } catch (err) {
    console.log(err);
  }
};

const githubData = (data) => {
  const repoList = (repos) => {
    let repo = '';
    for (let i in repos) {
      repo += `
      <a href=${data[i].html_url}>
      <article>
      <h4>${data[i].name}</h4>
      <p>${data[i].description}</p>
      </article>
      </a>
      `;
    }
    return repo;
  };

  var article = document.createElement('article');
  article.className = 'github';
  article.innerHTML = `
  <h4>Github:</h4>
  <main>
  ${repoList(data)}
  </main>
  `;
  main.appendChild(article);
};

const dataOut = (data) => {
  const paragraphs = (parags) => {
    let paragraph = '';
    for (let i in parags) {
      paragraph += `<p>${parags[i]}</p>`;
    }
    return paragraph;
  };

  const listElems = (elements) => {
    let listElems = '';
    for (let i in elements) {
      listElems += `<li>${elements[i]}</li>`;
    }
    return listElems;
  };

  const contactIcon = (data) => {
    let contactIcon = '';
    for (let i in data) {
      contactIcon += `<a href=${data[i].url}><img class="icon" src=${data[i].icon} /></a>`;
    }
    return contactIcon;
  };

  const {
    image,
    name,
    lastName,
    birthday,
    birthPlace,
    livingPlace,
    bio,
    hobbies,
    website,
    skills,
  } = data;

  const { email } = data.contact;

  var article = document.createElement('article');
  article.className = 'info';
  article.innerHTML = `
  <h1>Profil card created fetching data from JSON file</h1>
  <article class="card">
    <img src=${image} class="card__img" />
    <article class="card__info">
      <h2>${name} ${lastName}</h2>
      <p>${birthday} ${birthPlace}</p>
      <p>${livingPlace}</p>
      <p>${email.username}</p>
    </article>
    <article class="card__contact">
        <a href=${website.url}><img class="icon" src=${website.icon} /></a>
        ${contactIcon(data.contact)}
      </article>
    <article class="card__skills">
        <h4>Skills:</h4>
        <ul>${listElems(skills)}</ul>
      </article>
    <article class="card__bio">
      <h4>A bit about me:</h4>
      <div>${paragraphs(bio)}</div>
    </article>
     <article class="card__hobbies">
      <h4>Hobbies:</h4>
      <ul>${listElems(hobbies)}</ul>
    </article>
  </article>
  `;

  main.appendChild(article);
};

getData(emsadData);
getGithub(githubApi);

// fetchMulti(emsadData, githubApi);
