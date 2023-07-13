chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'downloadData') {
    const jsonData = request.jsonData;
    const csvData = request.csvData;

    chrome.downloads.download(
      { url: 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonData), filename: 'data.json' },
      function (downloadIdJson) {
        chrome.downloads.download(
          { url: 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvData), filename: 'data.csv' },
          function (downloadIdCsv) {
            if (downloadIdJson && downloadIdCsv) {
              sendResponse({ success: true });
            } else {
              sendResponse({ success: false });
            }
          },
        );
      },
    );

    return true;
  }
});

chrome.commands.onCommand.addListener(shortcut => {
  console.log('Reloading');
  if (shortcut.includes('+M')) {
    chrome.runtime.reload();
  }
});
