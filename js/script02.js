
/////////
// Basic functionality
/////////

function getCell(row, col){
    const cell = sheet.cells[row][col];
    return cell;
}

function getCells(sr, sc, er, ec){
    const cells = [];
    for (let r = sr; r < er + 1; r += 1){
        for (let c = sc; c < ec + 1; c += 1){
            cells.push(getCell(r, c));
        }
    }
    return cells;
}

function getSelectedCell(){
    const sr = sheet.selection.sr;
    const sc = sheet.selection.sc;
    const cell = getCell(sr, sc);
    return cell;
}

function getSelectedCells(){
    const sr = sheet.selection.sr;
    const sc = sheet.selection.sc;
    const er = sheet.selection.er;
    const ec = sheet.selection.ec;
    const cells = [];
    for (r = sr; r < er + 1; r += 1){
        for (c = sc; c < ec + 1; c += 1){
            cells.push(getCell(r, c));
        }
    }
    return cells;
}

/////////////
// Values 
////////////

function getValue (row, col){
    const cell = sheet.cells[row][col];
    const value = cell.value;
    return value;
}

function setValue (row, col, value, render_ = true){
    const cell = sheet.cells[row][col];
    if (value === undefined || value === null) value = "";
    cell.value = value;
    if (render_ === true) render();
    return value;
}

function getValues(sr, sc, er, ec){
    const values = [];
    for (let r = sr; r < er + 1; r += 1){
        for (let c = sc; c < ec + 1; c += 1){
            const value = getCell(r, c).value;
            if (value === undefined || value === null) value = "";
            values.push(value);
        }
    }
    return values;
}

function setValues(sr, sc, er, ec, values, render_){
    const iValues = -1;
    for (let r = sr; r < er + 1; r += 1){
        for (let c = sc; c < ec + 1; c += 1){
            iValues += 1;
            const value = values[iValue];
            if (value === undefined || value === null) value = "";
            getCell(r, c).value = value;
        }
    }
    if (render_ === true) render();
    return values;
}

//////
// Selected values
//////


function getSelectedValue() {
    const sr = sheet.selection.sr;
    const sc = sheet.selection.sc;
            const value = getCell(sr, sc).value ;
            if (value === undefined || value === null) value = "";
            values.push(value);
    return values;
}

function setSelectedValue(value, render_ = true) {
    const sr = sheet.selection.sr;
    const sc = sheet.selection.sc;
    if (value === undefined || value === null) value = "";
    getCell(sr, sc).value = value;
    if (render_ === true) render();
    return value;
}

function getSelectedValues() {
    const sr = sheet.selection.sr;
    const sc = sheet.selection.sc;
    const er = sheet.selection.er;
    const ec = sheet.selection.ec;
    const values = []
    for (r = sr; r < er + 1; r += 1){
        for (c = sc; c < ec + 1; c += 1) {
            const value = getCell(r, c).value ;
            if (value === undefined || value === null) value = "";
            values.push(value);
        }
    }
    return values;
}

function setSelectedValues(values, render_ = true) {
    const sr = sheet.selection.sr;
    const sc = sheet.selection.sc;
    const er = sheet.selection.er;
    const ec = sheet.selection.ec;
    let iValues = -1;
    for (let r = sr; r < er + 1; r += 1){
        for (let c = sc; c < ec + 1; c += 1) {
            iValues += 1;
            let value = values[iValues];
            if (value === undefined || value === null) value = "";
            getCell(r, c).value = value;
        }
    }
    if (render_ === true) render();
    return values;
}

//////////
// Resize cols and rows
//////////

// BUG: To do ===>>> Resize canvas acordingly!!!
function resizeCol(c, width, render_ = true){
    const col = sheet.cols[c];
    col.width = width;
    if (render_ === true) render();
    canvas.width = 1 + window.sheet.cols.reduce((total, col) => total + col.width, 0);
    canvas.height = 1 + window.sheet.rows.reduce((total, row) => total + row.height, 0);
    canvasSel.width = 1 + window.sheet.cols.reduce((total, col) => total + col.width, 0);
    canvasSel.height = 1 + window.sheet.rows.reduce((total, row) => total + row.height, 0);
    render();
}

function resizeRow(r, height, render_ = true){
    const row = sheet.rows[r];
    row.height = height;
    if (render_ === true) render();
    canvas.width = 1 + window.sheet.cols.reduce((total, col) => total + col.width, 0);
    canvas.height = 1 + window.sheet.rows.reduce((total, row) => total + row.height, 0);
    canvasSel.width = 1 + window.sheet.cols.reduce((total, col) => total + col.width, 0);
    canvasSel.height = 1 + window.sheet.rows.reduce((total, row) => total + row.height, 0);
    render();



}