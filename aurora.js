/**
 * @license
 *
 * DESIGNAuroraGradient: a dynamic gradient animation library
 *
 * Copyright (c) 2024 Caden grunge
 * https://github.com/Caden0002/DESIGNAuroraGradient/
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

class Aurora {
    constructor(canvas, color = [
        [66, 134, 244],
        [50, 226, 156],
        [236, 52, 52],
        [242, 144, 54]
    ]) {
        this.canvas = canvas;
        this.color = color;
        this.step = 0;
        this.gradient = null;
        this.vertices = [];
        this.init();
    }

    init() {
        this.ctx = this.canvas.getContext('2d');
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        this.gradient = this.ctx.createLinearGradient(0, 0, this.w, this.h);
        // Fix: Convert RGB array to 'rgb()' string format
        this.gradient.addColorStop(0, `rgb(${this.color[0][0]}, ${this.color[0][1]}, ${this.color[0][2]})`);
        this.gradient.addColorStop(1, `rgb(${this.color[1][0]}, ${this.color[1][1]}, ${this.color[1][2]})`);
        this.ctx.fillStyle = this.gradient;
        this.ctx.fillRect(0, 0, this.w, this.h);
        this.render();
        window.addEventListener('resize', this.resize.bind(this));
    }

    resize() {
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.canvas.width = this.w;
        this.canvas.height = this.h;
    }

    render() {
        this.step++;
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.vertices = [];
        for (let i = 0; i < this.color.length; i++) {
            const color = this.color[i];
            const x = Math.cos((this.step + i * 360 / this.color.length) * Math.PI / 180) * 200 + this.w / 2;
            const y = Math.sin((this.step + i * 360 / this.color.length) * Math.PI / 180) * 200 + this.h / 2;
            const radius = (Math.cos(this.step / 2 * Math.PI / 180) + 1) / 2 * 200 + 200;
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`);
            gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.w, this.h);
        }
        requestAnimationFrame(this.render.bind(this));
    }
}
