import p5 from "p5";
import { Easing } from "./easings";

const HOLD_TIME = 60;
const FADE_SPEED = 15;
const margin = 30;

export class EasingCell {
    private p: p5;
    public x: number;
    public y: number;
    public w: number;
    public h: number;
    public data: Easing;

    private t: number;
    public state: "MOVE" | "HOLD" | "FADEOUT" | "FADEIN";
    private holdCounter: number;
    private alpha: number;
    private speed: number;

    constructor(p: p5, x: number, y: number, w: number, h: number, data: Easing) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.data = data;

        this.t = 0;
        this.state = "MOVE";
        this.holdCounter = 0;
        this.alpha = 255;
        this.speed = 0.015;
    }

    update() {
        switch (this.state) {
            case "MOVE":
                this.t += this.speed;
                if (this.t >= 1) {
                    this.t = 1;
                    this.state = "HOLD";
                    this.holdCounter = 0;
                }
                break;
            case "HOLD":
                this.holdCounter++;
                if (this.holdCounter > HOLD_TIME) {
                    this.state = "FADEOUT";
                }
                break;
            case "FADEOUT":
                this.alpha -= FADE_SPEED;
                if (this.alpha <= 0) {
                    this.alpha = 0;
                    this.t = 0;
                    this.state = "FADEIN";
                }
                break;
            case "FADEIN":
                this.alpha += FADE_SPEED;
                if (this.alpha >= 255) {
                    this.alpha = 255;
                    this.state = "MOVE";
                }
                break;
        }
    }

    draw() {
        const p = this.p;
        p.push();
        p.translate(this.x, this.y);

        // Draw Cell Background
        p.noFill();
        p.noStroke();
        p.rect(0, 0, this.w, this.h);

        // Define Graph Area
        const gx = margin;
        const gy = margin;
        const gw = this.w - margin * 2;
        const gh = this.h - margin * 2 - 20;
        const gyBottom = gy + gh;

        // Draw Grid/Axes
        p.stroke(220);
        p.strokeWeight(1);
        p.line(gx, gyBottom, gx + gw, gyBottom);
        p.line(gx, gy, gx, gyBottom);

        // Top line (target)
        p.stroke(235);
        if (p.drawingContext && typeof (p.drawingContext as any).setLineDash === "function") {
            (p.drawingContext as any).setLineDash([4, 4]);
        }
        p.line(gx, gy, gx + gw, gy);
        if (p.drawingContext && typeof (p.drawingContext as any).setLineDash === "function") {
            (p.drawingContext as any).setLineDash([]);
        }

        // Draw Curve
        p.noFill();
        p.stroke(0, 119, 190); // Cerulean Blue
        p.strokeWeight(2);
        p.beginShape();
        for (let i = 0; i <= 100; i++) {
            const tv = i / 100;
            const val = this.data.func(tv);
            const px = gx + tv * gw;
            const py = gyBottom - val * gh;
            p.vertex(px, py);
        }
        p.endShape();

        // Calculate current animated point
        const currentVal = this.data.func(this.t);
        const ax = gx + this.t * gw;
        const ay = gyBottom - currentVal * gh;

        // Draw Animated Point on Curve
        if (this.alpha > 0) {
            p.noStroke();
            p.fill(0, 119, 190, this.alpha);
            p.circle(ax, ay, 8);

            p.fill(255, 100, 100, this.alpha); // Reddish for contrast
            const yIndicatorX = gx;
            p.circle(yIndicatorX, ay, 6);
        }

        // Draw Label
        p.noStroke();
        p.fill(80);
        p.textAlign(p.CENTER, p.TOP);
        p.textSize(12);
        p.text(this.data.name, this.w / 2, this.h - 20);

        p.pop();
    }

    checkHover(mx: number, my: number): boolean {
        return (
            mx > this.x &&
            mx < this.x + this.w &&
            my > this.y &&
            my < this.y + this.h
        );
    }

    copyCode() {
        const code = `function ${this.data.name}(t) {\n    ${this.data.formulaStr}\n}`;

        const textarea = document.createElement("textarea");
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand("copy");
            this.showToast();
        } catch (err) {
            console.error("Failed to copy", err);
        }
        document.body.removeChild(textarea);
    }

    showToast() {
        const toast = document.getElementById("toast");
        if (toast) {
            toast.classList.add("show");
            setTimeout(() => {
                toast.classList.remove("show");
            }, 2000);
        }
    }
}
