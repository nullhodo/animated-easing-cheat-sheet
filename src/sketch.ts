import p5 from "p5";
import { easings } from "./easings";
import { EasingCell } from "./easingCell";

const sketch = (p: p5) => {
    const cells: EasingCell[] = [];
    const cols = 5;
    const rows = 6;
    let cellW: number;
    let cellH: number;

    p.setup = () => {
        const c = p.createCanvas(p.windowWidth - 40, p.windowWidth * 0.8);
        c.parent("canvas-container");

        cellW = p.width / cols;
        cellH = cellW * 0.9;
        p.resizeCanvas(p.width, cellH * rows + 60);

        for (let i = 0; i < easings.length; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = col * cellW;
            const y = row * cellH + 60;
            cells.push(new EasingCell(p, x, y, cellW, cellH, easings[i]));
        }

        p.textFont("Segoe UI");
    };

    p.draw = () => {
        p.background(245, 245, 247);

        // Title
        p.noStroke();
        p.fill(30);
        p.textSize(28);
        p.textAlign(p.LEFT, p.TOP);
        p.text("Animated Easing Cheat Sheet", 20, 15);
        p.textSize(14);
        p.fill(100);
        p.text("30 Standard Easing Equations (In, Out, InOut)", 20, 48);

        let hovering = false;
        let hoverCell: EasingCell | null = null;

        for (const cell of cells) {
            cell.update();
            cell.draw();
            if (cell.checkHover(p.mouseX, p.mouseY)) {
                hovering = true;
                hoverCell = cell;
                p.cursor(p.HAND);
            }
        }

        const tooltip = document.getElementById("tooltip");
        if (!hovering) {
            p.cursor(p.ARROW);
            if (tooltip) {
                tooltip.style.display = "none";
            }
        } else if (hoverCell && tooltip) {
            const ttTitle = document.getElementById("tt-title");
            const ttCode = document.getElementById("tt-code");

            tooltip.style.display = "block";
            tooltip.style.left = p.winMouseX + 15 + "px";
            tooltip.style.top = p.winMouseY + 15 + "px";

            if (p.winMouseX > p.windowWidth - 300) {
                tooltip.style.left = p.winMouseX - 320 + "px";
            }

            if (ttTitle && ttCode && ttTitle.textContent !== hoverCell.data.name) {
                ttTitle.textContent = hoverCell.data.name;
                ttCode.textContent = `function ${hoverCell.data.name}(t) {\n    ${hoverCell.data.formulaStr}\n}`;
            }
        }
    };

    p.mousePressed = () => {
        for (const cell of cells) {
            if (cell.checkHover(p.mouseX, p.mouseY)) {
                cell.copyCode();
                break;
            }
        }
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth - 40, p.windowHeight);
        cellW = p.width / cols;
        cellH = cellW * 0.9;
        p.resizeCanvas(p.width, cellH * rows + 60);

        for (let i = 0; i < cells.length; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);
            cells[i].x = col * cellW;
            cells[i].y = row * cellH + 60;
            cells[i].w = cellW;
            cells[i].h = cellH;
        }
    };
};

new p5(sketch);
