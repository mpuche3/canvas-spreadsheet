window.defaultSettings = { /*global*/
    numRows: 100,
    numCols: 20,
    colWidth: 120,
    rowHeight: 30,
};

window.position = {
    row: 0,
    col: 0,
    x: 0,
    y: 0,
    mousedClicked: false,
};


window.sheet = createSheet();
window.sheet.cols.reduce((total, width) => total + width, 0);


const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
//canvas.width = 1 + window.defaultSettings.numCols * window.defaultSettings.colWidth;
//canvas.height = 1 + window.defaultSettings.numRows * window.defaultSettings.rowHeight;
canvas.width = 1 + window.sheet.cols.reduce((total, col) => total + col.width, 0);
canvas.height = 1 + window.sheet.rows.reduce((total, row) => total + row.height, 0);

const canvasSel = document.querySelector("#canvas-sel");
const ctxSel = canvasSel.getContext("2d");
// canvasSel.width = 1 + window.defaultSettings.numCols * window.defaultSettings.colWidth;
// canvasSel.height = 1 + window.defaultSettings.numRows * window.defaultSettings.rowHeight;
canvasSel.width = 1 + window.sheet.cols.reduce((total, col) => total + col.width, 0);
canvasSel.height = 1 + window.sheet.rows.reduce((total, row) => total + row.height, 0);



function range(num) {
    const arr = [];
    for (let i = 0; i < num; i += 1) {
        arr.push(i);
    }
    return arr;
}

function createSheet(settings) {
    if (settings === undefined) settings = {};
    if (settings.numRows === undefined) settings.numRows = window.defaultSettings.numRows;
    if (settings.numCols === undefined) settings.numCols = window.defaultSettings.numCols;
    if (settings.colWidth === undefined) settings.colWidth = window.defaultSettings.colWidth;
    if (settings.rowHeight === undefined) settings.rowHeight = window.defaultSettings.rowHeight;
    const sheet = {
        selection: {
            sr: 0,
            sc: 0,
            er: 0,
            ec: 0
        },
        styles: [{
            border: {
                color: "",
                width: "",
            },
            background: {
                color: "",
            },
            font: {
                type: "",
                size: "",
                color: "",
                bold: "",
                italic: "",
            }
        }],
        cols: [],
        rows: [],
        cells: [],
    };

    range(settings.numRows).map(row => {
        sheet.rows[row] = {
            height: settings.rowHeight
        };
    });

    range(settings.numCols).map(col => {
        sheet.cols[col] = {
            width: settings.colWidth
        };
    });

    range(settings.numRows).map(row => {
        sheet.cells[row] = [];
        range(settings.numCols).map(col => {
            sheet.cells[row][col] = {
                value: "", //`row: ${row}, col: ${col}`,
                style: 0,
            };
        });
    });
    return sheet;
}

function renderCols(sheet) {
    if (sheet === undefined) sheet = window.sheet;
    let x = 0.5; // ALWAYS 
    ctx.lineWidth = "1"; // lineWidth ALWAYS an even number
    ctx.strokeStyle = "red";
    for (let col = 0; col < sheet.cols.length; col += 1) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, document.querySelector("#canvas").height);
        x += Number(sheet.cols[col].width);

    }
    ctx.stroke();
}

function renderRows(sheet) {
    if (sheet === undefined) sheet = window.sheet;
    let y = 0.5; ///
    ctx.lineWidth = "1"; // lineWidth ALWAYS an even number
    ctx.strokeStyle = "grey";
    for (let row = 0; row < sheet.rows.length; row += 1) {
        ctx.moveTo(0, y);
        ctx.lineTo(document.querySelector("#canvas").width, y);
        y += Number(sheet.rows[row].height);
    }
    ctx.stroke();
}

function renderSelection(sheet) {
    if (sheet === undefined) sheet = window.sheet;

    const sr_ = Number(sheet.selection.sr);
    const sc_ = Number(sheet.selection.sc);
    const er_ = Number(sheet.selection.er);
    const ec_ = Number(sheet.selection.ec);

    const sr = Math.min(sr_, er_);
    const sc = Math.min(sc_, ec_);
    const er = Math.max(sr_, er_);
    const ec = Math.max(sc_, ec_);

    const sx = getXFromCol(sc);
    const sy = getYFromRow(sr);
    const ex = getXFromCol(ec);
    const ey = getYFromRow(er);

    const width = sheet.cols[ec].width;
    const height = sheet.rows[er].height;

    const widthSelection = ex - sx + width;
    const heightSelection = ey - sy + height;


    ctxSel.clearRect(0, 0, canvasSel.width, canvasSel.height);

    ctxSel.lineWidth = "3"; // lineWidth ALWAYS an even number
    ctxSel.strokeStyle = "blue";
    ctxSel.beginPath();
    ctxSel.rect(sx + 0.5, sy + 0.5, widthSelection, heightSelection);
    ctxSel.stroke();
}

function renderCells(sheet) {
    if (sheet === undefined) sheet = window.sheet;
    for (let r = 0; r < sheet.rows.length; r += 1) {
        for (let c = 0; c < sheet.cols.length; c += 1) {
            ctx.beginPath();
            const x = getXFromCol(c);
            const y = getYFromRow(r);
            const width = sheet.cols[c].width;
            const height = sheet.rows[r].height;
            const iStyle = sheet.cells[r][c].style;

            // Ugly fixed.
            let t = 0;

            // Border Style
            const border = sheet.styles[iStyle].border;
            if (border.color !== "" || border.width !== "") {
                if (border.color === "") border.color = "grey";
                if (border.width === "") border.width = 1;
                t = (border.width - 1) / 2;
                ctx.lineWidth = border.width; // lineWidth ALWAYS an even number
                ctx.strokeStyle = border.color;
                ctx.rect(x + 0.5 + t, y + 0.5 + t, width - 2 * t, height - 2 * t);
                ctx.stroke();
            }

            // Background style
            const background = sheet.styles[iStyle].background;
            if (background.color !== "") {
                if (background.color === "") background.color = "white";
                ctx.fillStyle = background.color;
                ctx.fillRect(x + 1 + t, y + 1 + t, width - 1 - 2 * t, height - 1 - 2 * t);
                ctx.stroke();
            }

            // Character style
            ctx.fillStyle = "black";
            ctx.strokeStyle = "black"; // lineWidth ALWAYS an even number
            ctx.font = "15px Roboto";

            // Print value
            ctx.font="16px roboto mono";
            let text = ""; // This is the value that will actually be rendered.
            const value = String(sheet.cells[r][c].value);
            const valWidth = ctx.measureText(value).width;
            const colWidth = sheet.cols[c].width;
            if (valWidth + 10 < colWidth) {
                text = value;
            } else if (30 < colWidth) {
                const maxLen = (value.length/valWidth) * (colWidth - 10) - 4;
                text = value.substring(0, maxLen) + " ...";
            } else {
                text = "";
            }
            ctx.fillText(text, x + 8, y + 20);


        }
    }

}

function getRowFromY(y) {
    let y_tracker = 0;
    for (let row = 0; row < window.sheet.rows.length; row += 1) {
        y_tracker += Number(window.sheet.rows[row].height);
        if (y < y_tracker) return row;
    }
}

function getColFromX(x) {
    let x_tracker = 0;
    for (let col = 0; col < window.sheet.cols.length; col += 1) {
        x_tracker += Number(window.sheet.cols[col].width);
        if (x < x_tracker) return col;
    }
}

function getYFromRow(row) {
    let y = 0;
    for (let r = 0; r < row; r += 1) {
        y += Number(window.sheet.rows[r].height);
    }
    return y;
}

function getXFromCol(col) {
    let x = 0;
    for (let c = 0; c < col; c += 1) {
        x += Number(window.sheet.cols[c].width);
    }
    return x;
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderCols();
    renderRows();
    renderCells();
    renderSelection();
}

document.querySelector("#table").addEventListener("mousedown", function (e) {
    e.preventDefault();
    if (e.ctrlKey === true) {
        const x = e.offsetX;
        const y = e.offsetY;
        const er = getRowFromY(y);
        const ec = getColFromX(x);
        window.sheet.selection.er = er;
        window.sheet.selection.ec = ec;
        render();
    } else {
        window.position.mousedClicked = (e.buttons === undefined) ? e.which === 1 : e.buttons === 1;
        const x = e.offsetX;
        const y = e.offsetY;
        const row = getRowFromY(y);
        const col = getColFromX(x);
        window.sheet.selection.sr = row;
        window.sheet.selection.sc = col;
        window.sheet.selection.er = row;
        window.sheet.selection.ec = col;
        render();
    }
});

document.querySelector("#table").addEventListener("mouseup", function (e) {
    e.preventDefault();
    window.position.mousedClicked = e.buttons === undefined ? e.which === 1 : e.buttons === 1;
});

document.querySelector("#table").addEventListener("click", function (e) {
    e.preventDefault();
});

document.querySelector("#table").addEventListener("mousemove", e => {

    const x = e.offsetX;
    const y = e.offsetY;
    const col = getColFromX(x);
    const row = getRowFromY(y);
    window.position.x = x;
    window.position.y = y;
    window.position.row = row;
    window.position.col = col;

    window.position.mousedClicked = e.buttons === undefined ? e.which === 1 : e.buttons === 1;

    if (window.position.mousedClicked === true) {
        window.sheet.selection.er = row;
        window.sheet.selection.ec = col;
        renderSelection();
    }

});

document.querySelector("#table").addEventListener("dblclick", function (e) {
    const x = e.offsetX;
    const y = e.offsetY;
    const row = getRowFromY(y);
    const col = getColFromX(x);
    window.sheet.selection.sr = row;
    window.sheet.selection.sc = col;
    window.sheet.selection.er = row;
    window.sheet.selection.ec = col;
    render();

    //
    const clientX = e.clientX;
    const clientY = e.clientY;
    const coords = "X coords: " + clientX + ", Y coords: " + clientX;
    console.log(coords);

    //
    const input = document.querySelector('#inputCell');
    input.style.display = "block";
    input.innerText = getSelectedValues()[0];

    //
    const format = document.querySelector('#formatCell');
    format.style.display = "block";
    format.innerText = "style: #" + getSelectedCell().style;


});

/////
document.querySelector("#table").addEventListener("mousedown", hideInputBox);

function hideInputBox (){
    const input = document.querySelector('#inputCell');
    input.style.display = "none";
    input.innerText = "";
    const format = document.querySelector('#formatCell');
    format.style.display = "none";
    format.innerText = "";
}

////
document.querySelector("#inputCell").addEventListener("keydown", function (e) {
    //console.log(e);
    if (e.code === "Enter" || e.keyCode === 13){
        hideInputBox();
    }
});

////
document.querySelector("#formatCell").addEventListener("keydown", function (e) {
    //console.log(e);
    if (e.code === "Enter" || e.keyCode === 13){
        e.preventDefault();
    }
});


/////
const config = {characterData: true, subtree: true};
const observerInputCell = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation){
        //console.log(mutation.type); // <- It always detects changes
        const value = document.querySelector("#inputCell").innerText;
        setSelectedValues([value]);
        render();
    });    
});
observerInputCell.observe(document.querySelector("#inputCell"), config);

/////
const observerFormatCell = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation){
        //console.log(mutation.type); // <- It always detects changes
        const value = document.querySelector("#formatCell").innerText;
        let num = value.replace( /^\D+/g, '');
        if (sheet.styles[num] === undefined) num = 0;
        getSelectedCell().style = num;
        render();
        // setSelectedValues([value]);
        // render();
    });    
});
observerFormatCell.observe(document.querySelector("#formatCell"), config);




