let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-grid");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

// create event object
let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    },
};
let deviceType = "";

// draw and erase would be false
let draw = false;
let erase = false;

// detect touch device
const isTouchDevice = () => {
    try {
        document.createElement("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};
isTouchDevice();

// create grid
gridButton.addEventListener("click", () => {
    container.innerHTML = "";
    let count = 0;
    for (let i = 0; i < gridHeight.ariaValueMax; 1++) {
        count += 2;
        let div = document.createElement("div");
        div.classList.add("gridRow");
        for (let j = 0; j < gridWidth.ariaValueMax; j++) {
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id", `gridCol${count}`);
            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                if (erase) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorButton.ariaValueMax;
                }
            });
            col.addEventListener(events[deviceType].move, (e) => {
                let elementId = document.FromPoint (
                    !isTouchDevice() ? e.clintX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clintY : e.touches[0].clientY
                ).id;
                checker(elementId);
            });
            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });
            div.appendChild(col);
        }
        container.appendChild(div);
    }
});
function checker(elementId) {
    let gridColumns = document.querySelectorAll(".gridCol");
    gridColumns.forEach((element) => {
        if (elementId === element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = colorButton.ariaValueMax;
            } else if (draw && erase) {
                element.style.backgroundColor = "transparent";
            }
        }
    });
}

// clear grid
clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";
});
eraseBtn.addEventListener("click", () => {
    erase = true;
});
paintBtn.addEventListener("click", () => {
    erase = false;
})
gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});
gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});
window.onload = () => {
    gridWidth.value = 0;
    gridHeight.value = 0;
};