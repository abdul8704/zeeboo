import { useEffect, useRef } from "react";

import { createNoise3D } from "simplex-noise";
import { useState } from "react";


const ParticleBackground = () => {
    const canvasRef = useRef(null);
    const particleCount = 700;
    const particlePropCount = 9;
    const particlePropsLength = particleCount * particlePropCount;
    const rangeY = 100;
    const baseTTL = 50;
    const rangeTTL = 150;
    const baseSpeed = 0.1;
    const rangeSpeed = 2;
    const baseRadius = 1;
    const rangeRadius = 4;
    const baseHue = 220;
    const rangeHue = 100;
    const noiseSteps = 8;
    const xOff = 0.00125;
    const yOff = 0.00125;
    const zOff = 0.0005;
    const backgroundColor = "hsla(260,40%,5%,1)";

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let tick = 0;
        const noise3D = createNoise3D();


        let particleProps = new Float32Array(particlePropsLength);
        let center = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            center[0] = canvas.width * 0.5;
            center[1] = canvas.height * 0.5;
        };

        const rand = (n) => Math.random() * n;
        const randRange = (n) => n - Math.random() * n * 2;
        const lerp = (a, b, t) => (1 - t) * a + t * b;

        const initParticle = (i) => {
            let x = rand(canvas.width);
            let y = center[1] + randRange(rangeY);
            let vx = 0;
            let vy = 0;
            let life = 0;
            let ttl = baseTTL + rand(rangeTTL);
            let speed = baseSpeed + rand(rangeSpeed);
            let radius = baseRadius + rand(rangeRadius);
            let hue = baseHue + rand(rangeHue);

            particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
        };

        const initParticles = () => {
            for (let i = 0; i < particlePropsLength; i += particlePropCount) {
                initParticle(i);
            }
        };

        const checkBounds = (x, y) => x > canvas.width || x < 0 || y > canvas.height || y < 0;

        const fadeInOut = (life, ttl) => {
            let halfTTL = ttl / 2;
            return Math.abs((life % ttl) - halfTTL) / halfTTL;
        };

        const drawParticle = (x, y, x2, y2, life, ttl, radius, hue) => {
            ctx.save();
            ctx.lineCap = "round";
            ctx.lineWidth = radius;
            ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        };

        const updateParticle = (i) => {
            let i2 = i + 1,
                i3 = i + 2,
                i4 = i + 3,
                i5 = i + 4,
                i6 = i + 5,
                i7 = i + 6,
                i8 = i + 7,
                i9 = i + 8;
            let x = particleProps[i];
            let y = particleProps[i2];
            let n = noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * Math.PI * 2;

            let vx = lerp(particleProps[i3], Math.cos(n), 0.5);
            let vy = lerp(particleProps[i4], Math.sin(n), 0.5);
            let life = particleProps[i5];
            let ttl = particleProps[i6];
            let speed = particleProps[i7];
            let x2 = x + vx * speed;
            let y2 = y + vy * speed;
            let radius = particleProps[i8];
            let hue = particleProps[i9];

            drawParticle(x, y, x2, y2, life, ttl, radius, hue);

            life++;

            particleProps[i] = x2;
            particleProps[i2] = y2;
            particleProps[i3] = vx;
            particleProps[i4] = vy;
            particleProps[i5] = life;

            if (checkBounds(x, y) || life > ttl) {
                initParticle(i);
            }
        };

        const drawParticles = () => {
            for (let i = 0; i < particlePropsLength; i += particlePropCount) {
                updateParticle(i);
            }
        };

        const render = () => {
            tick++;

            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawParticles();

            requestAnimationFrame(render);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        initParticles();
        render();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -1,
            }}
        />
    );
};

export default ParticleBackground;
