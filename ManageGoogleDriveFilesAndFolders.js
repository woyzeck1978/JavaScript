/*global DocsList: false */

// Manage Google Drive Folders.
// Check if the given folder name exists.
// If yes, return the folder object for the pre-existing folder.
// If not, create the folder using the given folder name.
// Return the folder object for the newly created folder with the given folder name.
function createFolder(folderName) {
    'use strict';
    var folder,
        errMsg = 'Cannot find folder';
    try {
        folder = DocsList.getFolder(folderName);
    } catch (Error) {
        if (Error.message.indexOf(errMsg) > -1) {
            folder = DocsList.createFolder(folderName);
        } else {
            throw {'name': Error,
                   'message': 'Unable to create folder ' + folderName};
        }
    }
    return folder;
}

// Manage Google Drive files in folders.
// Add files of file type 'spreadsheet' to folder called 'spreadsheets'
// Add files of file type 'document' to folder called 'documents'.
// Leave all other file types alone.
function arrangeDocsToFolders() {
    'use strict';
    var ssFolder = createFolder('spreadsheets'),
        docFolder = createFolder('documents'),
        allFiles = DocsList.getAllFiles(),
        allFilesCount = allFiles.length,
        i;
    for (i = 0; i < allFilesCount; i += 1) {
        if (allFiles[i].getFileType().toString() === 'spreadsheet') {
            allFiles[i].addToFolder(ssFolder);
        } else if (allFiles[i].getFileType().toString() === 'document') {
            allFiles[i].addToFolder(docFolder);
        }
    }
}