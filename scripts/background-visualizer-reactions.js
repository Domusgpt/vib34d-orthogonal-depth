/**
 * BACKGROUND VISUALIZER REACTION SYSTEM
 * Complementary background visualizations that react to choreographed movements
 * Creates immersive ambient VIB34D environment responding to user interactions
 * A Paul Phillips Manifestation - Paul@clearseassolutions.com
 */

class BackgroundVisualizerReactions {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.isActive = false;

        // Choreography reaction state
        this.reactionState = {
            intensity: 0,
            momentum: 0,
            depth: 0,
            velocity: 0,
            choreographyPhase: 'idle' // idle, building, peak, decay
        };

        // VIB34D background parameters
        this.backgroundParams = {
            gridDensity: 12,
            morphFactor: 0.8,
            chaos: 0.2,
            hue: 200,
            saturation: 60,
            lightness: 40,
            alpha: 0.4
        };

        // Particle system for reactive elements
        this.particles = [];
        this.maxParticles = 150;

        // Wave field system
        this.waveField = {
            nodes: [],
            nodeCount: 20,
            amplitude: 30,
            frequency: 0.02,
            phase: 0
        };

        this.init();
    }

    init() {
        console.log('🌌 Initializing Background Visualizer Reaction System...');

        this.setupCanvas();
        this.initializeWaveField();
        this.initializeParticleSystem();
        this.startRenderLoop();

        console.log('✅ Background Visualizer Reactions initialized');
    }

    setupCanvas() {
        const resizeCanvas = () => {
            this.canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
            this.canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
            this.context.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }

    initializeWaveField() {
        // Create wave field nodes for ambient geometry
        this.waveField.nodes = [];
        const width = window.innerWidth;
        const height = window.innerHeight;
        const spacing = 80;

        for (let x = 0; x < width + spacing; x += spacing) {
            for (let y = 0; y < height + spacing; y += spacing) {
                this.waveField.nodes.push({
                    x: x,
                    y: y,
                    baseX: x,
                    baseY: y,
                    wave: Math.random() * Math.PI * 2,
                    intensity: 0
                });
            }
        }
    }

    initializeParticleSystem() {
        // Create reactive particles
        this.particles = [];

        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            baseX: 0,
            baseY: 0,
            velocityX: (Math.random() - 0.5) * 0.5,
            velocityY: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            alpha: Math.random() * 0.5 + 0.1,
            hue: this.backgroundParams.hue + (Math.random() - 0.5) * 60,
            life: 1.0,
            maxLife: Math.random() * 200 + 100,
            reactionSensitivity: Math.random() * 0.5 + 0.5
        };
    }

    // Called by OrthogonalDepthProgression during choreography
    updateChoreographyReaction(choreographyData) {
        // Update reaction state from choreography system
        this.reactionState.intensity = choreographyData.intensity || 0;
        this.reactionState.momentum = choreographyData.momentum || 0;
        this.reactionState.depth = choreographyData.depth || 0;
        this.reactionState.velocity = choreographyData.velocity || 0;

        // Determine choreography phase
        if (this.reactionState.intensity > 0.7) {
            this.reactionState.choreographyPhase = 'peak';
        } else if (this.reactionState.intensity > 0.3) {
            this.reactionState.choreographyPhase = 'building';
        } else if (this.reactionState.intensity > 0.05) {
            this.reactionState.choreographyPhase = 'decay';
        } else {
            this.reactionState.choreographyPhase = 'idle';
        }

        // Update background parameters based on choreography
        this.updateBackgroundParameters();
    }

    updateBackgroundParameters() {
        const { intensity, momentum, depth, velocity } = this.reactionState;

        // Map choreography to background parameters
        this.backgroundParams.gridDensity = 12 + (momentum * 15);
        this.backgroundParams.morphFactor = 0.8 + (depth * 1.2);
        this.backgroundParams.chaos = 0.2 + (velocity * 0.4);

        // Handle special events
        if (choreographyData.event === 'destruction') {
            this.handleDestructionEvent(choreographyData);
        } else if (choreographyData.event === 'birth') {
            this.handleBirthEvent(choreographyData);
        } else {
            // Dynamic color shifts based on choreography phase
            switch (this.reactionState.choreographyPhase) {
                case 'peak':
                    this.backgroundParams.hue = 280 + (intensity * 40); // Purple to magenta
                    this.backgroundParams.saturation = 80;
                    this.backgroundParams.alpha = 0.6 + (intensity * 0.3);
                    break;
                case 'building':
                    this.backgroundParams.hue = 200 + (momentum * 60); // Cyan to blue
                    this.backgroundParams.saturation = 70;
                    this.backgroundParams.alpha = 0.4 + (momentum * 0.2);
                    break;
                case 'decay':
                    this.backgroundParams.hue = 240 - (intensity * 20); // Blue to cyan
                    this.backgroundParams.saturation = 60;
                    this.backgroundParams.alpha = 0.3 + (intensity * 0.1);
                    break;
                default: // idle
                    this.backgroundParams.hue = 200;
                    this.backgroundParams.saturation = 60;
                    this.backgroundParams.alpha = 0.4;
            }
        }
    }

    handleDestructionEvent(eventData) {
        const { destructionType } = eventData;
        console.log(`🌌💥 Background reacting to ${destructionType} destruction`);

        // Destruction-specific background responses
        switch (destructionType) {
            case 'quantum':
                this.backgroundParams.hue = 320;
                this.backgroundParams.saturation = 95;
                this.backgroundParams.alpha = 0.9;
                this.backgroundParams.chaos = 0.8;
                this.triggerDestructionWave('quantum');
                break;
            case 'holographic':
                this.backgroundParams.hue = 350;
                this.backgroundParams.saturation = 90;
                this.backgroundParams.alpha = 0.8;
                this.backgroundParams.chaos = 0.7;
                this.triggerDestructionWave('holographic');
                break;
            case 'faceted':
                this.backgroundParams.hue = 280;
                this.backgroundParams.saturation = 85;
                this.backgroundParams.alpha = 0.7;
                this.backgroundParams.chaos = 0.6;
                this.triggerDestructionWave('faceted');
                break;
        }

        // Add destruction particles
        this.spawnDestructionParticles(destructionType);
    }

    handleBirthEvent(eventData) {
        const { systemType } = eventData;
        console.log(`🌌✨ Background reacting to ${systemType} birth`);

        // Birth-specific background responses
        switch (systemType) {
            case 'quantum':
                this.backgroundParams.hue = 280;
                this.backgroundParams.saturation = 75;
                this.backgroundParams.alpha = 0.6;
                this.backgroundParams.chaos = 0.3;
                break;
            case 'holographic':
                this.backgroundParams.hue = 330;
                this.backgroundParams.saturation = 80;
                this.backgroundParams.alpha = 0.7;
                this.backgroundParams.chaos = 0.4;
                break;
            case 'faceted':
                this.backgroundParams.hue = 200;
                this.backgroundParams.saturation = 70;
                this.backgroundParams.alpha = 0.5;
                this.backgroundParams.chaos = 0.2;
                break;
        }

        // Add birth particles
        this.spawnBirthParticles(systemType);
    }

    triggerDestructionWave(destructionType) {
        // Create expanding destruction wave effect
        this.waveField.nodes.forEach(node => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const distance = Math.hypot(node.x - centerX, node.y - centerY);
            const maxDistance = Math.hypot(centerX, centerY);
            const delay = (distance / maxDistance) * 1000; // Wave propagation delay

            setTimeout(() => {
                node.intensity = 1.0;
                node.wave += Math.PI * 2; // Phase shift
            }, delay);
        });
    }

    spawnDestructionParticles(destructionType) {
        const particleCount = 30;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const speed = 2 + Math.random() * 3;
            const hue = this.getDestructionHue(destructionType);

            this.particles.push({
                x: centerX,
                y: centerY,
                velocityX: Math.cos(angle) * speed,
                velocityY: Math.sin(angle) * speed,
                size: 3 + Math.random() * 4,
                alpha: 0.8,
                hue: hue + (Math.random() - 0.5) * 40,
                life: 150,
                maxLife: 150,
                reactionSensitivity: 1.0
            });
        }
    }

    spawnBirthParticles(systemType) {
        const particleCount = 20;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100;
            const hue = this.getBirthHue(systemType);

            this.particles.push({
                x: centerX + Math.cos(angle) * distance,
                y: centerY + Math.sin(angle) * distance,
                velocityX: (Math.random() - 0.5) * 1,
                velocityY: (Math.random() - 0.5) * 1,
                size: 2 + Math.random() * 3,
                alpha: 0.6,
                hue: hue + (Math.random() - 0.5) * 30,
                life: 200,
                maxLife: 200,
                reactionSensitivity: 0.8
            });
        }
    }

    getDestructionHue(destructionType) {
        const hues = {
            quantum: 320,
            holographic: 350,
            faceted: 280
        };
        return hues[destructionType] || 320;
    }

    getBirthHue(systemType) {
        const hues = {
            quantum: 280,
            holographic: 330,
            faceted: 200
        };
        return hues[systemType] || 280;
    }

    startRenderLoop() {
        const render = () => {
            this.update();
            this.render();
            requestAnimationFrame(render);
        };

        render();
    }

    update() {
        const time = Date.now() * 0.001;
        const { intensity, momentum, depth } = this.reactionState;

        // Update wave field
        this.waveField.phase += 0.02 + (momentum * 0.03);
        this.waveField.amplitude = 30 + (intensity * 50);

        this.waveField.nodes.forEach(node => {
            const waveX = Math.sin(node.wave + this.waveField.phase) * this.waveField.amplitude;
            const waveY = Math.cos(node.wave + this.waveField.phase + 1) * this.waveField.amplitude;

            node.x = node.baseX + waveX * (0.3 + depth * 0.7);
            node.y = node.baseY + waveY * (0.3 + depth * 0.7);
            node.intensity = intensity;
        });

        // Update particles with choreography reactions
        this.particles.forEach(particle => {
            // Base movement
            particle.x += particle.velocityX;
            particle.y += particle.velocityY;

            // Choreography reactions
            if (intensity > 0.1) {
                const reactionForce = intensity * particle.reactionSensitivity;
                particle.velocityX += (Math.random() - 0.5) * reactionForce * 2;
                particle.velocityY += (Math.random() - 0.5) * reactionForce * 2;

                // Increase particle energy during choreography
                particle.alpha = Math.min(1.0, particle.alpha + reactionForce * 0.1);
                particle.size = Math.min(8, particle.size + reactionForce);
            } else {
                // Decay when no choreography
                particle.alpha *= 0.99;
                particle.size *= 0.995;
            }

            // Velocity damping
            particle.velocityX *= 0.98;
            particle.velocityY *= 0.98;

            // Boundary wrapping
            if (particle.x < 0) particle.x = window.innerWidth;
            if (particle.x > window.innerWidth) particle.x = 0;
            if (particle.y < 0) particle.y = window.innerHeight;
            if (particle.y > window.innerHeight) particle.y = 0;

            // Life cycle
            particle.life--;
            if (particle.life <= 0) {
                Object.assign(particle, this.createParticle());
            }
        });
    }

    render() {
        const ctx = this.context;
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        const { intensity, momentum } = this.reactionState;

        // Render wave field connections
        this.renderWaveField(ctx);

        // Render reactive particles
        this.renderParticles(ctx);

        // Render ambient geometric patterns
        this.renderAmbientGeometry(ctx);

        // Render choreography energy field
        if (intensity > 0.1) {
            this.renderChoreographyField(ctx);
        }
    }

    renderWaveField(ctx) {
        const { hue, saturation, lightness, alpha } = this.backgroundParams;
        const nodeSpacing = 80;

        ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha * 0.3})`;
        ctx.lineWidth = 1;

        // Draw connections between nearby nodes
        for (let i = 0; i < this.waveField.nodes.length; i++) {
            const nodeA = this.waveField.nodes[i];

            for (let j = i + 1; j < this.waveField.nodes.length; j++) {
                const nodeB = this.waveField.nodes[j];
                const distance = Math.hypot(nodeB.x - nodeA.x, nodeB.y - nodeA.y);

                if (distance < nodeSpacing * 1.5) {
                    const alpha = (1 - distance / (nodeSpacing * 1.5)) * nodeA.intensity * 0.5;

                    if (alpha > 0.05) {
                        ctx.globalAlpha = alpha;
                        ctx.beginPath();
                        ctx.moveTo(nodeA.x, nodeA.y);
                        ctx.lineTo(nodeB.x, nodeB.y);
                        ctx.stroke();
                    }
                }
            }
        }

        ctx.globalAlpha = 1;
    }

    renderParticles(ctx) {
        const { hue } = this.backgroundParams;

        this.particles.forEach(particle => {
            if (particle.alpha > 0.01) {
                ctx.globalAlpha = particle.alpha;
                ctx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        ctx.globalAlpha = 1;
    }

    renderAmbientGeometry(ctx) {
        const { hue, saturation, lightness } = this.backgroundParams;
        const { intensity, depth } = this.reactionState;
        const time = Date.now() * 0.001;

        // Rotating geometric elements in corners
        const corners = [
            { x: 100, y: 100 },
            { x: window.innerWidth - 100, y: 100 },
            { x: 100, y: window.innerHeight - 100 },
            { x: window.innerWidth - 100, y: window.innerHeight - 100 }
        ];

        corners.forEach((corner, index) => {
            ctx.save();
            ctx.translate(corner.x, corner.y);
            ctx.rotate(time * 0.3 + index * Math.PI / 2 + depth * Math.PI);

            const size = 40 + intensity * 20;
            const alpha = 0.2 + intensity * 0.3;

            ctx.strokeStyle = `hsla(${hue + index * 30}, ${saturation}%, ${lightness}%, ${alpha})`;
            ctx.lineWidth = 2;

            // Draw rotating geometric pattern
            const sides = 6;
            ctx.beginPath();
            for (let i = 0; i <= sides; i++) {
                const angle = (i / sides) * Math.PI * 2;
                const x = Math.cos(angle) * size;
                const y = Math.sin(angle) * size;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();

            ctx.restore();
        });
    }

    renderChoreographyField(ctx) {
        const { intensity, momentum } = this.reactionState;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Pulsing energy field during choreography
        const radius = 200 + intensity * 300;
        const alpha = intensity * 0.3;

        const gradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, radius
        );

        gradient.addColorStop(0, `rgba(0, 255, 255, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(255, 0, 255, ${alpha * 0.5})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        // Concentric energy rings
        const rings = 5;
        for (let i = 0; i < rings; i++) {
            const ringRadius = (radius / rings) * (i + 1);
            const ringAlpha = alpha * (1 - i / rings) * momentum;

            if (ringAlpha > 0.05) {
                ctx.strokeStyle = `hsla(${280 + i * 20}, 80%, 70%, ${ringAlpha})`;
                ctx.lineWidth = 2 + intensity * 3;

                ctx.beginPath();
                ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
    }

    activate() {
        this.isActive = true;
        console.log('🌌 Background Visualizer Reactions ACTIVATED');
    }

    deactivate() {
        this.isActive = false;
        this.reactionState.intensity = 0;
        this.reactionState.momentum = 0;
        this.reactionState.depth = 0;
        this.reactionState.velocity = 0;
        console.log('🌙 Background Visualizer Reactions DEACTIVATED');
    }

    destroy() {
        this.isActive = false;
        this.particles = [];
        this.waveField.nodes = [];
        console.log('🗑️ Background Visualizer Reactions destroyed');
    }
}

// Export for global use
window.BackgroundVisualizerReactions = BackgroundVisualizerReactions;