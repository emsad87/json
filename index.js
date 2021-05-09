const main = document.querySelector('#main');
const emsadData = './emsad.json';

const getData = async (dataFile) => {
  const resp = await fetch(dataFile);
  const data = await resp.json();
  dataOut(data);
};

const dataOut = (data) => {
  for (let i in data) {
    var div = document.createElement('div');
    div.innerHTML = data[i];
    main.appendChild(div);
  }
};

getData(emsadData);
