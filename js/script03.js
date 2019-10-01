/////////////////////////////////////////////////////////////////////////////////
// Assign buttons callback                                   //
/////////////////////////////////////////////////////////////////////////////////
document.querySelector("#export > img").onclick = exportFile;
document.querySelector("#open > img").onclick = openFile;


/////////////////////////////////////////////////////////////////////////////////
// Open file: Drag & and Drop File on window                                   //
/////////////////////////////////////////////////////////////////////////////////
document.querySelector("*").addEventListener("drop", e => {
    e.preventDefault();
    let r = new FileReader();
    r.onload = e => {
        const strSheet = e.target.result;
        loadData (strSheet);
    };
    let f = e.dataTransfer.files[0];
    r.readAsText(f);
}, false);

//
function loadData (strSheet) {
    const objSheet = JSON.parse(strSheet);
    window.sheet = objSheet;
    window.render();
}


// Prevent default behaviour when dropping a file on the window
// To investigate: dragenter, drageleave, dragover: might be an overkill
document.querySelector("*").addEventListener("dragenter", e => {
    e.preventDefault();
}, false);
document.querySelector("*").addEventListener("dragleave", e => {
    e.preventDefault();
}, false);
document.querySelector("*").addEventListener("dragover", e => {
    e.preventDefault();
}, false);


/////////////////////////////////////////////////////////////////////////////////
// Save File                                                                   //
/////////////////////////////////////////////////////////////////////////////////
function showFile() {
    const reader = new FileReader()
    reader.onload = event => {
        const strFileContent = event.target.result;
        console.log(strFileContent);
        loadData (strFileContent);
        document.querySelector("#deleteme").remove();
    };
    const file = document.querySelector("#deleteme").files[0];
    console.log(file);
    reader.readAsText(file);
}

function openFile() {
    const html = "<input id=\"deleteme\" type=\"file\" style=\"display:none\" onchange=\"showFile()\">";
    document.body.insertAdjacentHTML("beforeend", html);
    document.querySelector("#deleteme").click()
}


/////////////////////////////////////////////////////////////////////////////////
// Download File                                                               //
/////////////////////////////////////////////////////////////////////////////////
function downloadTextFile (obj, fileName) {
    const str = JSON.stringify(obj);
    var bb = new Blob([str], {type: "text/plain"});
    var a = document.createElement("a");
    a.display = "none";
    a.download = fileName;
    a.href = window.URL.createObjectURL(bb);
    a.textContent = "Download ready";
    a.dataset.downloadurl = ["text/plain", a.download, a.href].join(":");
    a.click();
}

function downloadFile(fileName){
    if (fileName === undefined) fileName = "fileName.json";
    const data = window.sheet;
    downloadTextFile (data, fileName);
}

function exportFile () {
    downloadFile("spreadsheet.xson");
}