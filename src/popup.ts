let typeSelectNum: number = 1;

document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startButton');
  const addButton = document.getElementById('addButton');

  startButton.addEventListener('click', e => handleSubmit(e));
  addButton.addEventListener('click', e => addInput(e));
});

const handleSubmit = e => {
  e.preventDefault();

  let types: string[] = [];

  for (let i = 1; i <= typeSelectNum; i++) {
    const typeValue = (<HTMLInputElement>document.getElementById(`input-type-${i}`)).value;
    types.push(typeValue);
  }

  const attributeValue = (<HTMLInputElement>document.getElementById('attribute')).value.toLowerCase();

  if (types.length !== 0 && attributeValue !== '') {
    extract(types, attributeValue);
  }
};

const extract = (types, attributeValue) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'startExtraction',
      types: types,
      attribute: attributeValue,
    });
  });
};

const addInput = e => {
  e.preventDefault()

  const typeContainer = document.getElementById('input-type-container-1');
  const attributeContainer = document.getElementById('attribute-container');

  typeSelectNum += 1;

  // Clone type container and insert before attribute container
  let clone = typeContainer.cloneNode(true) as HTMLElement;
  clone.setAttribute('id', `input-type-container-${typeSelectNum}`);
  (clone.childNodes[3] as HTMLElement).setAttribute('id', `input-type-${typeSelectNum}`);

  // Create remove button
  const removeButton = document.createElement('button');
  removeButton.classList.add('inline-block');
  removeButton.setAttribute('id', `remove-input-type-container-${typeSelectNum}`)

  // Add event listener to button
  removeButton.addEventListener('click', (e) => removeInput(e))

  // Add image to button
  const buttonImage = document.createElement('img');
  buttonImage.setAttribute('src', './assets/recycle-bin.png');
  removeButton.appendChild(buttonImage);

  clone.appendChild(removeButton);

  attributeContainer.before(clone);
};

const removeInput = e => {
  e.preventDefault()

  const buttonId = e.currentTarget.getAttribute('id')
  const inputContainer = document.getElementById(buttonId.slice(7))

  inputContainer.remove()
}