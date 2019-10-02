

function giveStyleBttnOnclick(n) {
    document.querySelector(`#bttn-01-0${n}`).onclick = function(){
        const cells = getSelectedCells();
        cells.map(cell => {
            cell.style = `${n}`
        })
        render();
    }
}

giveStyleBttnOnclick(1);
giveStyleBttnOnclick(2);
giveStyleBttnOnclick(3);
giveStyleBttnOnclick(4);
giveStyleBttnOnclick(5);
giveStyleBttnOnclick(6);
giveStyleBttnOnclick(7);
giveStyleBttnOnclick(8);
giveStyleBttnOnclick(9);



sheet.styles[1] = {
    border: {
      color: "gray",
      width: "1",
    },
    background: {
        color: "white"
    }
};

sheet.styles[2] = {
    border: {
      color: "black",
      width: "1",
    },
    background: {
        color: "#D1F2EB"
    }
};

sheet.styles[3] = {
    border: {
      color: "green",
      width: "1",
    },
    background: {
        color: "#D1F2EB"
    }
};

sheet.styles[4] = {
    border: {
      color: "red",
      width: "1",
    },
    background: {
        color: "#D1F2EB"
    }
};

sheet.styles[5] = {
    border: {
      color: "red",
      width: "1",
    },
    background: {
        color: "#D1F2EB"
    }
};

sheet.styles[6] = {
    border: {
      color: "red",
      width: "1",
    },
    background: {
        color: "#D1F2EB"
    }
};

sheet.styles[7] = {
    border: {
      color: "red",
      width: "1",
    },
    background: {
        color: "#D1F2EB"
    }
};

sheet.styles[8] = {
    border: {
      color: "red",
      width: "1",
    },
    background: {
        color: "#D1F2EB"
    }
};

sheet.styles[9] = {
    border: {
      color: "red",
      width: "1",
    },
    background: {
        color: "#D1F2EB"
    }
};