const main = document.querySelector('#main');
const emsadData = './emsad.json';

const getData = async (dataFile) => {
  const resp = await fetch(dataFile);
  const data = await resp.json();
  dataOut(data);
};

const dataOut = (data) => {
  // for (let i in data) {
  //   var div = document.createElement('div');
  //   div.innerHTML = data[i];
  //   main.appendChild(div);
  // }

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

  var article = document.createElement('article');
  article.innerHTML = `
  <h1 style='text-align: center; text-transform: uppercase'>Profil card created fetching data from JSON file</h1>
  <img src=${data.image} style="width: 200px"/>
  <h2>${data.name} ${data.lastName}</h2>
  <p>${data.birthDay} ${data.birthPlace}</p>
  <p>${data.livingPlace}</p>
  <p>${data.contact.email}</p>
  <p>A bit about me:</p>
  <div>${paragraphs(data.bio)}</div>
  <p>Hobbies:</p>
  <ul>${listElems(data.hobbies)}</ul>
  `;

  main.appendChild(article);
};

getData(emsadData);
