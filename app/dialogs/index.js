const fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
const { dialog } = require('electron').remote;

export const showSaveDialog = content => {
  // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
  dialog.showSaveDialog(
    {
      title: 'Salva la tua scheda concorrente',
      defaultPath: 'scheda_concorrente.csv',
      filters: [{ name: 'CSV File', extensions: ['csv'] }]
    },
    fileName => {
      if (fileName === undefined) {
        console.log("You didn't save the file");
        return;
      }

      // fileName is a string that contains the path and filename created in the save file dialog.
      fs.writeFile(fileName, content, err => {
        if (err) {
          dialog.showErrorBox(
            'File Creation Error',
            `An error ocurred creating the file ${err.message}`
          );
        }
        dialog.showMessageBox({
          message: 'The file has been saved!',
          buttons: ['OK']
        });
      });
    }
  );
};

export const showOpenDialog = callback => {
  dialog.showOpenDialog(
    {
      filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }],
      properties: ['openFile', 'multiSelections']
    },
    fileNames => {
      // fileNames is an array that contains all the selected
      if (fileNames === undefined) {
        console.log('No file selected');
        return;
      }
      return callback(fileNames);
      // fileNames.map(fileName => (
      //   fs.readFile(fileName, (err, data) => {
      //     if (err) {
      //       dialog.showErrorBox('File Reading Error', `An error ocurred reading the file :${err.message}`)
      //       return
      //     }
      //     // Change how to handle the file content
      //     console.log(`The file content is : ${data}`)
      //   })
      // ))
    }
  );
};
