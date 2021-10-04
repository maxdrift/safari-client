import fs from 'fs'; // Load the File System to execute our common tasks (CRUD)
import { remote } from 'electron';

const { dialog } = remote;

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
            'Error di salvataggio',
            `Si è verificato un errore durante il salvataggio del file: ${
              err.message
            }`
          );
        }
        dialog.showMessageBox({
          message: 'Il file è stato salvato!',
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
    }
  );
};
