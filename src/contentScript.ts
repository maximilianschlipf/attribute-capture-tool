chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === 'startExtraction') {
    console.log('Start extraction');

    const { types, attribute } = request;

    // Extract data
    let elements = [];

    for (let i = 0; i < types.length; i++) {
      elements.push(...document.querySelectorAll(`[type=${types[i]}][${attribute}]`));
    }

    let data = [];

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      console.log('Element ' + element)
      const attributeValue = element.getAttribute(attribute);
      const elementType = element.tagName;

      data.push({ elementType: elementType, attribute: attributeValue });
    }

    const jsonData = JSON.stringify(data);
    let csvData = 'Element,Attribute\n';

    for (let j = 0; j < data.length; j++) {
      const rowData = data[j];
      csvData += rowData.elementType + ',' + rowData.attribute + '\n';
    }

    // Send the extracted data to the background script
    chrome.runtime.sendMessage({ action: 'downloadData', jsonData: jsonData, csvData: csvData });

    return true;
  }
});
