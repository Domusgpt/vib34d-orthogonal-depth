/**
 * ORTHOGONAL DEPTH PROGRESSION SYSTEM
 * Professional avant-garde card progression through Z-axis depth
 * Cards emerge from screen depths with portal-style text visualizers
 * A Paul Phillips Manifestation - Paul@clearseassolutions.com
 */

class OrthogonalDepthProgression {
    constructor() {
        this.cards = [];
        this.currentIndex = 0;
        this.isAutoProgressing = false;
        this.autoProgressInterval = null;
        this.progressionStates = ['far-depth', 'approaching', 'focused', 'exiting', 'destroyed'];

        // Progression timing
        this.timings = {
            cardTransition: 800,
            autoProgressDelay: 4000,
            destructionDelay: 1200,
            portalActivation: 300,
            choreographyPhase: 1500
        };

        // Scroll-to-progress system
        this.scrollAccumulator = 0;
        this.scrollThreshold = 100;
        this.isScrollProgression = true;

        // Choreographed movement system
        this.choreography = {
            scrollVelocity: 0,
            scrollMomentum: 0,
            depthMomentum: 0,
            isChoreographing: false,
            choreographyIntensity: 0
        };

        // VIB34D parameter mapping for choreography
        this.vib34dMappings = {
            scrollToGridDensity: { min: 8, max: 45, current: 20 },
            depthToMorphFactor: { min: 0.5, max: 2.5, current: 1.0 },
            velocityToChaos: { min: 0.1, max: 0.8, current: 0.3 },
            momentumToIntensity: { min: 0.3, max: 1.2, current: 0.7 }
        };

        this.backgroundVisualizer = null;

        this.init();
    }

    init() {
        console.log('🎯 Initializing Orthogonal Depth Progression System...');

        this.findProgressionCards();
        this.setupScrollProgression();
        this.setupKeyboardControls();
        this.initializePortalVisualizers();
        this.initializeBackgroundVisualizer();
        this.setInitialPositions();

        console.log('✅ Orthogonal Depth Progression initialized - Professional Avant-garde Mode');
    }

    initializeBackgroundVisualizer() {
        const backgroundCanvas = document.getElementById('backgroundVisualizer');
        if (backgroundCanvas && window.BackgroundVisualizerReactions) {
            this.backgroundVisualizer = new BackgroundVisualizerReactions(backgroundCanvas);
            this.backgroundVisualizer.activate();
            console.log('🌌 Background Visualizer integrated with choreography system');
        }
    }

    findProgressionCards() {
        this.cards = Array.from(document.querySelectorAll('.progression-card'));
        console.log(`🎨 Found ${this.cards.length} progression cards`);
    }

    setupScrollProgression() {
        // Enhanced scroll system with choreographed movements
        let scrollTimeout;
        let lastScrollTime = Date.now();
        let lastScrollDelta = 0;

        window.addEventListener('wheel', (event) => {
            event.preventDefault(); // Block traditional scrolling

            const currentTime = Date.now();
            const deltaTime = currentTime - lastScrollTime;
            const deltaY = event.deltaY;

            // Calculate scroll velocity for choreography
            this.choreography.scrollVelocity = Math.abs(deltaY) / Math.max(deltaTime, 1);
            this.choreography.scrollMomentum += this.choreography.scrollVelocity * 0.1;
            this.choreography.scrollMomentum *= 0.95; // Decay

            this.scrollAccumulator += deltaY;
            this.triggerChoreographedMovement(deltaY, this.choreography.scrollVelocity);

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScrollProgression();
                this.endChoreographyPhase();
            }, 50);

            lastScrollTime = currentTime;
            lastScrollDelta = deltaY;

        }, { passive: false });

        // Touch support for mobile with choreography
        this.setupTouchProgression();

        // Choreography animation loop
        this.startChoreographyLoop();
    }

    setupTouchProgression() {
        let startY = 0;
        let currentY = 0;
        let touchVelocity = 0;
        let lastTouchTime = Date.now();

        document.addEventListener('touchstart', (event) => {
            startY = event.touches[0].clientY;
            lastTouchTime = Date.now();
        });

        document.addEventListener('touchmove', (event) => {
            event.preventDefault(); // Block traditional scrolling
            currentY = event.touches[0].clientY;
            const deltaY = startY - currentY;
            const currentTime = Date.now();

            // Calculate touch velocity for choreography
            touchVelocity = Math.abs(deltaY) / Math.max(currentTime - lastTouchTime, 1);
            this.triggerChoreographedMovement(deltaY, touchVelocity);

            if (Math.abs(deltaY) > 30) {
                if (deltaY > 0) {
                    this.nextCard();
                } else {
                    this.previousCard();
                }
                startY = currentY;
            }

            lastTouchTime = currentTime;
        }, { passive: false });
    }

    triggerChoreographedMovement(deltaY, velocity) {
        // Start choreography phase
        this.choreography.isChoreographing = true;
        this.choreography.choreographyIntensity = Math.min(velocity / 2, 1.0);

        // Update depth momentum based on scroll direction and velocity
        this.choreography.depthMomentum += (deltaY > 0 ? 1 : -1) * velocity * 0.01;
        this.choreography.depthMomentum = Math.max(-2, Math.min(2, this.choreography.depthMomentum));

        // Update VIB34D parameters based on movement
        this.updateVIB34DParametersFromChoreography();

        // Apply choreographed transforms to all cards
        this.applyChoreographedTransforms();

        // Update background visualizer with choreography data
        this.updateBackgroundVisualizerReactions();
    }

    startChoreographyLoop() {
        const choreographyTick = () => {
            if (this.choreography.isChoreographing) {
                // Update choreography parameters
                this.choreography.choreographyIntensity *= 0.98; // Decay
                this.choreography.depthMomentum *= 0.96; // Decay
                this.choreography.scrollMomentum *= 0.95; // Decay

                // Continue choreographed transforms
                this.applyChoreographedTransforms();

                // Update VIB34D parameters
                this.updateVIB34DParametersFromChoreography();

                // Update background visualizer
                this.updateBackgroundVisualizerReactions();

                // End choreography when intensity is low
                if (this.choreography.choreographyIntensity < 0.05) {
                    this.endChoreographyPhase();
                }
            }

            requestAnimationFrame(choreographyTick);
        };

        choreographyTick();
    }

    updateVIB34DParametersFromChoreography() {
        const intensity = this.choreography.choreographyIntensity;
        const momentum = Math.abs(this.choreography.scrollMomentum);
        const depth = Math.abs(this.choreography.depthMomentum);
        const velocity = this.choreography.scrollVelocity;

        // Map choreography values to VIB34D parameter ranges
        const gridDensity = this.mapRange(momentum, 0, 2,
            this.vib34dMappings.scrollToGridDensity.min,
            this.vib34dMappings.scrollToGridDensity.max);

        const morphFactor = this.mapRange(depth, 0, 2,
            this.vib34dMappings.depthToMorphFactor.min,
            this.vib34dMappings.depthToMorphFactor.max);

        const chaos = this.mapRange(velocity, 0, 5,
            this.vib34dMappings.velocityToChaos.min,
            this.vib34dMappings.velocityToChaos.max);

        const visualIntensity = this.mapRange(intensity, 0, 1,
            this.vib34dMappings.momentumToIntensity.min,
            this.vib34dMappings.momentumToIntensity.max);

        // Update VIB34D systems with choreographed parameters
        if (window.geometricTiltSystem && window.geometricTiltSystem.visualizers) {
            window.geometricTiltSystem.visualizers.forEach(visualizer => {
                if (visualizer.updateChoreographyParameters) {
                    visualizer.updateChoreographyParameters({
                        gridDensity,
                        morphFactor,
                        chaos,
                        intensity: visualIntensity
                    });
                }
            });
        }

        // Update global VIB34D parameters if available
        if (window.updateParameter) {
            window.updateParameter('gridDensity', gridDensity);
            window.updateParameter('morphFactor', morphFactor);
            window.updateParameter('chaos', chaos);
            window.updateParameter('intensity', visualIntensity);
        }
    }

    applyChoreographedTransforms() {
        const intensity = this.choreography.choreographyIntensity;
        const depthMomentum = this.choreography.depthMomentum;

        this.cards.forEach((card, index) => {
            if (card.classList.contains('focused')) {
                // Focused card gets subtle choreographed movement
                const choreographedScale = 1.0 + (intensity * 0.05);
                const choreographedRotation = depthMomentum * 2;
                const choreographedZ = depthMomentum * 20;

                card.style.transform = `
                    translate(-50%, -50%)
                    translateZ(${choreographedZ}px)
                    scale(${choreographedScale})
                    rotateY(${choreographedRotation}deg)
                `;

                // Add dynamic border glow based on intensity
                const glowIntensity = intensity * 0.5;
                card.style.boxShadow = `
                    0 0 ${30 + intensity * 50}px rgba(0, 255, 255, ${0.3 + glowIntensity}),
                    0 0 ${60 + intensity * 100}px rgba(0, 255, 255, ${0.1 + glowIntensity * 0.5})
                `;

            } else if (card.classList.contains('approaching') || card.classList.contains('exiting')) {
                // Transitioning cards get enhanced choreography
                const choreographedScale = card.classList.contains('approaching') ?
                    0.6 + (intensity * 0.2) : 1.5 + (intensity * 0.3);
                const choreographedRotation = depthMomentum * 5;

                const baseZ = card.classList.contains('approaching') ? -400 : 400;
                const choreographedZ = baseZ + (depthMomentum * 50);

                card.style.transform = `
                    translate(-50%, -50%)
                    translateZ(${choreographedZ}px)
                    scale(${choreographedScale})
                    rotateY(${choreographedRotation}deg)
                `;
            }
        });
    }

    endChoreographyPhase() {
        this.choreography.isChoreographing = false;
        this.choreography.choreographyIntensity = 0;

        // Reset card transforms to their base states
        this.cards.forEach(card => {
            card.style.boxShadow = '';
            this.setCardState(card, this.getCardCurrentState(card));
        });
    }

    mapRange(value, inMin, inMax, outMin, outMax) {
        return outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin);
    }

    getCardCurrentState(card) {
        for (const state of this.progressionStates) {
            if (card.classList.contains(state)) {
                return state;
            }
        }
        return 'far-depth';
    }

    updateBackgroundVisualizerReactions() {
        if (this.backgroundVisualizer) {
            this.backgroundVisualizer.updateChoreographyReaction({
                intensity: this.choreography.choreographyIntensity,
                momentum: Math.abs(this.choreography.scrollMomentum),
                depth: Math.abs(this.choreography.depthMomentum),
                velocity: this.choreography.scrollVelocity
            });
        }
    }

    handleScrollProgression() {
        if (Math.abs(this.scrollAccumulator) > this.scrollThreshold) {
            if (this.scrollAccumulator > 0) {
                this.nextCard();
            } else {
                this.previousCard();
            }
            this.scrollAccumulator = 0;
        } else {
            // Decay scroll accumulator
            this.scrollAccumulator *= 0.9;
        }
    }

    setupKeyboardControls() {
        document.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'ArrowDown':
                case 'Space':
                    event.preventDefault();
                    this.nextCard();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    this.previousCard();
                    break;
                case 'Home':
                    event.preventDefault();
                    this.goToCard(0);
                    break;
                case 'End':
                    event.preventDefault();
                    this.goToCard(this.cards.length - 1);
                    break;
            }
        });
    }

    initializePortalVisualizers() {
        this.cards.forEach((card, index) => {
            const portalElement = card.querySelector('.portal-text-visualizer');
            if (portalElement) {
                this.createPortalVisualizer(portalElement, card.dataset.vib34d, index);
            }
        });
    }

    createPortalVisualizer(portalElement, systemType, cardIndex) {
        // Create canvas for portal visualization
        const canvas = document.createElement('canvas');
        canvas.className = 'portal-canvas';
        canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            pointer-events: none;
        `;

        portalElement.appendChild(canvas);

        // Create portal visualizer instance
        const portalVisualizer = new PortalTextVisualizer(canvas, systemType, cardIndex);

        // Store reference on card
        portalElement.portalVisualizer = portalVisualizer;
    }

    setInitialPositions() {
        this.cards.forEach((card, index) => {
            card.style.zIndex = this.cards.length - index;

            if (index === 0) {
                this.setCardState(card, 'focused');
            } else {
                this.setCardState(card, 'far-depth');
            }
        });

        this.activatePortalForCard(this.cards[0]);
    }

    nextCard() {
        if (this.currentIndex >= this.cards.length - 1) {
            // Loop to beginning with destruction animation
            this.destroyCurrentCard(() => {
                this.currentIndex = 0;
                this.progressToCurrentCard();
            });
            return;
        }

        this.progressToCard(this.currentIndex + 1);
    }

    previousCard() {
        if (this.currentIndex <= 0) {
            this.currentIndex = this.cards.length - 1;
        } else {
            this.currentIndex--;
        }
        this.progressToCurrentCard();
    }

    goToCard(index) {
        if (index >= 0 && index < this.cards.length && index !== this.currentIndex) {
            this.currentIndex = index;
            this.progressToCurrentCard();
        }
    }

    progressToCard(newIndex) {
        const currentCard = this.cards[this.currentIndex];
        const newCard = this.cards[newIndex];

        // Deactivate current card portal
        this.deactivatePortalForCard(currentCard);

        // Exit current card
        this.setCardState(currentCard, 'exiting');

        // Bring new card forward through progression states
        setTimeout(() => {
            this.setCardState(newCard, 'approaching');

            setTimeout(() => {
                this.setCardState(newCard, 'focused');
                this.currentIndex = newIndex;
                this.activatePortalForCard(newCard);

                // Move old card to far depth
                setTimeout(() => {
                    this.setCardState(currentCard, 'far-depth');
                }, this.timings.cardTransition);

            }, this.timings.cardTransition / 2);

        }, this.timings.cardTransition / 4);
    }

    progressToCurrentCard() {
        this.cards.forEach((card, index) => {
            if (index === this.currentIndex) {
                this.setCardState(card, 'focused');
                this.activatePortalForCard(card);
            } else if (index < this.currentIndex) {
                this.setCardState(card, 'far-depth');
                this.deactivatePortalForCard(card);
            } else {
                this.setCardState(card, 'far-depth');
                this.deactivatePortalForCard(card);
            }
        });
    }

    setCardState(card, state) {
        // Remove all progression state classes
        this.progressionStates.forEach(s => card.classList.remove(s));

        // Add new state
        card.classList.add(state);

        // Update card z-index based on state
        switch (state) {
            case 'focused':
                card.style.zIndex = 1000;
                break;
            case 'approaching':
                card.style.zIndex = 900;
                break;
            case 'exiting':
                card.style.zIndex = 800;
                break;
            case 'far-depth':
                card.style.zIndex = 100;
                break;
            case 'destroyed':
                card.style.zIndex = 50;
                break;
        }
    }

    activatePortalForCard(card) {
        const portal = card.querySelector('.portal-text-visualizer');
        if (portal && portal.portalVisualizer) {
            portal.portalVisualizer.activate();
        }

        // Add glow effect to card title
        const title = card.querySelector('.card-title');
        if (title) {
            title.style.textShadow = '0 0 20px var(--clear-seas-primary), 0 0 40px var(--clear-seas-primary)';
            title.style.transform = 'scale(1.05)';
        }
    }

    deactivatePortalForCard(card) {
        const portal = card.querySelector('.portal-text-visualizer');
        if (portal && portal.portalVisualizer) {
            portal.portalVisualizer.deactivate();
        }

        // Remove glow effect from card title
        const title = card.querySelector('.card-title');
        if (title) {
            title.style.textShadow = '';
            title.style.transform = '';
        }
    }

    destroyCurrentCard(callback) {
        const currentCard = this.cards[this.currentIndex];
        const destructionType = currentCard.dataset.destruction || 'quantum';

        console.log(`💥 Initiating ${destructionType} destruction flourish...`);

        // Trigger pre-destruction VIB34D parameter flourish
        this.triggerDestructionFlourish(currentCard, destructionType);

        // Apply unique destruction animation
        this.setCardState(currentCard, 'destroyed');
        currentCard.classList.add(`destruction-${destructionType}`);

        // Deactivate portal with flourish
        this.deactivatePortalForCard(currentCard);

        // Enhanced background reaction to destruction
        if (this.backgroundVisualizer) {
            this.backgroundVisualizer.updateChoreographyReaction({
                intensity: 1.0,
                momentum: 0.8,
                depth: 1.2,
                velocity: 2.0,
                event: 'destruction',
                destructionType: destructionType
            });
        }

        // Reset card after destruction animation
        setTimeout(() => {
            currentCard.classList.remove(`destruction-${destructionType}`);
            this.setCardState(currentCard, 'far-depth');
            this.triggerBirthFlourish(currentCard, destructionType);
            if (callback) callback();
        }, this.timings.destructionDelay);
    }

    triggerDestructionFlourish(card, destructionType) {
        // Map destruction types to VIB34D parameter flourishes
        const flourishParams = this.getDestructionFlourish(destructionType);

        // Apply destruction-specific VIB34D modulation
        if (window.updateParameter) {
            Object.keys(flourishParams).forEach(param => {
                window.updateParameter(param, flourishParams[param]);
            });
        }

        // Update card visualizers with destruction parameters
        const cardVisualizers = card.querySelectorAll('.vib34d-tilt-canvas');
        cardVisualizers.forEach(canvas => {
            if (window.geometricTiltSystem && window.geometricTiltSystem.visualizers.has(canvas.id)) {
                const visualizer = window.geometricTiltSystem.visualizers.get(canvas.id);
                if (visualizer.updateChoreographyParameters) {
                    visualizer.updateChoreographyParameters(flourishParams);
                }
            }
        });

        // Add destruction flourish visual effects to card
        this.addDestructionEffects(card, destructionType);
    }

    triggerBirthFlourish(card, systemType) {
        console.log(`✨ Initiating ${systemType} birth flourish...`);

        // Map system types to birth VIB34D parameter flourishes
        const birthParams = this.getBirthFlourish(systemType);

        // Apply birth-specific VIB34D modulation
        if (window.updateParameter) {
            Object.keys(birthParams).forEach(param => {
                // Gradually transition to birth parameters
                setTimeout(() => {
                    window.updateParameter(param, birthParams[param]);
                }, Math.random() * 500);
            });
        }

        // Enhanced background reaction to birth
        if (this.backgroundVisualizer) {
            setTimeout(() => {
                this.backgroundVisualizer.updateChoreographyReaction({
                    intensity: 0.7,
                    momentum: 0.5,
                    depth: 0.8,
                    velocity: 1.0,
                    event: 'birth',
                    systemType: systemType
                });
            }, 200);
        }

        // Add birth flourish visual effects
        this.addBirthEffects(card, systemType);
    }

    getDestructionFlourish(destructionType) {
        const flourishes = {
            quantum: {
                gridDensity: 60,
                morphFactor: 3.0,
                chaos: 0.9,
                intensity: 1.5,
                hue: 320,
                saturation: 90
            },
            holographic: {
                gridDensity: 45,
                morphFactor: 2.5,
                chaos: 0.7,
                intensity: 1.8,
                hue: 350,
                saturation: 85
            },
            faceted: {
                gridDensity: 35,
                morphFactor: 2.0,
                chaos: 0.5,
                intensity: 1.2,
                hue: 280,
                saturation: 80
            }
        };
        return flourishes[destructionType] || flourishes.quantum;
    }

    getBirthFlourish(systemType) {
        const flourishes = {
            quantum: {
                gridDensity: 25,
                morphFactor: 1.2,
                chaos: 0.3,
                intensity: 0.9,
                hue: 280,
                saturation: 70
            },
            holographic: {
                gridDensity: 30,
                morphFactor: 1.5,
                chaos: 0.4,
                intensity: 1.0,
                hue: 330,
                saturation: 75
            },
            faceted: {
                gridDensity: 20,
                morphFactor: 1.0,
                chaos: 0.2,
                intensity: 0.8,
                hue: 200,
                saturation: 65
            }
        };
        return flourishes[systemType] || flourishes.faceted;
    }

    addDestructionEffects(card, destructionType) {
        // Create temporary destruction effect overlay
        const destructionOverlay = document.createElement('div');
        destructionOverlay.className = 'destruction-overlay';
        destructionOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            pointer-events: none;
            z-index: 1000;
        `;

        // Apply destruction-specific effects
        switch (destructionType) {
            case 'quantum':
                destructionOverlay.style.background = `
                    radial-gradient(circle at center,
                        rgba(138, 43, 226, 0.8) 0%,
                        rgba(255, 0, 255, 0.4) 50%,
                        transparent 100%)
                `;
                destructionOverlay.style.animation = 'quantumDestruction 1.2s ease-out forwards';
                break;
            case 'holographic':
                destructionOverlay.style.background = `
                    conic-gradient(from 0deg at center,
                        rgba(255, 20, 147, 0.6),
                        rgba(0, 255, 255, 0.6),
                        rgba(255, 20, 147, 0.6))
                `;
                destructionOverlay.style.animation = 'holographicDestruction 1.5s ease-out forwards';
                break;
            case 'faceted':
                destructionOverlay.style.background = `
                    linear-gradient(45deg,
                        rgba(0, 212, 255, 0.7) 0%,
                        rgba(255, 255, 255, 0.3) 50%,
                        rgba(0, 212, 255, 0.7) 100%)
                `;
                destructionOverlay.style.animation = 'facetedDestruction 1.0s ease-out forwards';
                break;
        }

        card.appendChild(destructionOverlay);

        // Remove overlay after animation
        setTimeout(() => {
            if (destructionOverlay.parentNode) {
                destructionOverlay.parentNode.removeChild(destructionOverlay);
            }
        }, this.timings.destructionDelay);
    }

    addBirthEffects(card, systemType) {
        // Create temporary birth effect overlay
        const birthOverlay = document.createElement('div');
        birthOverlay.className = 'birth-overlay';
        birthOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            pointer-events: none;
            z-index: 999;
            opacity: 0;
        `;

        // Apply birth-specific effects
        switch (systemType) {
            case 'quantum':
                birthOverlay.style.background = `
                    radial-gradient(circle at center,
                        rgba(138, 43, 226, 0.4) 0%,
                        rgba(0, 255, 255, 0.2) 60%,
                        transparent 100%)
                `;
                break;
            case 'holographic':
                birthOverlay.style.background = `
                    radial-gradient(ellipse at center,
                        rgba(255, 20, 147, 0.3) 0%,
                        rgba(255, 255, 255, 0.1) 70%,
                        transparent 100%)
                `;
                break;
            case 'faceted':
                birthOverlay.style.background = `
                    linear-gradient(135deg,
                        rgba(0, 212, 255, 0.3) 0%,
                        transparent 50%,
                        rgba(0, 212, 255, 0.3) 100%)
                `;
                break;
        }

        card.appendChild(birthOverlay);

        // Animate birth effect
        setTimeout(() => {
            birthOverlay.style.transition = 'opacity 0.8s ease-out';
            birthOverlay.style.opacity = '1';

            setTimeout(() => {
                birthOverlay.style.opacity = '0';

                setTimeout(() => {
                    if (birthOverlay.parentNode) {
                        birthOverlay.parentNode.removeChild(birthOverlay);
                    }
                }, 800);
            }, 400);
        }, 100);
    }

    toggleAutoProgress() {
        if (this.isAutoProgressing) {
            this.stopAutoProgress();
        } else {
            this.startAutoProgress();
        }
    }

    startAutoProgress() {
        this.isAutoProgressing = true;
        this.autoProgressInterval = setInterval(() => {
            this.nextCard();
        }, this.timings.autoProgressDelay);

        console.log('▶️ Auto progression started');
    }

    stopAutoProgress() {
        this.isAutoProgressing = false;
        if (this.autoProgressInterval) {
            clearInterval(this.autoProgressInterval);
            this.autoProgressInterval = null;
        }

        console.log('⏸️ Auto progression stopped');
    }

    destroy() {
        this.stopAutoProgress();

        this.cards.forEach(card => {
            const portal = card.querySelector('.portal-text-visualizer');
            if (portal && portal.portalVisualizer) {
                portal.portalVisualizer.destroy();
            }
        });

        console.log('🗑️ Orthogonal Depth Progression destroyed');
    }
}

/**
 * PORTAL TEXT VISUALIZER
 * Creates portal-style visualizations within focused card text
 */
class PortalTextVisualizer {
    constructor(canvas, systemType, cardIndex) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.systemType = systemType;
        this.cardIndex = cardIndex;
        this.isActive = false;
        this.animationFrame = null;

        // Portal parameters
        this.portalDepth = 0;
        this.targetDepth = 0;
        this.portalRotation = 0;
        this.portalPulse = 0;

        this.init();
    }

    init() {
        this.setupCanvas();
    }

    setupCanvas() {
        const resizeCanvas = () => {
            const rect = this.canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            this.canvas.width = rect.width * dpr;
            this.canvas.height = rect.height * dpr;
            this.context.scale(dpr, dpr);
        };

        resizeCanvas();

        const resizeObserver = new ResizeObserver(resizeCanvas);
        resizeObserver.observe(this.canvas);
    }

    activate() {
        this.isActive = true;
        this.targetDepth = 1.0;
        this.startRenderLoop();
        console.log(`🌀 Portal activated for ${this.systemType} system`);
    }

    deactivate() {
        this.isActive = false;
        this.targetDepth = 0;
        setTimeout(() => {
            this.stopRenderLoop();
        }, 500);
    }

    startRenderLoop() {
        if (this.animationFrame) return;

        const render = () => {
            this.update();
            this.renderPortal();

            if (this.isActive || this.portalDepth > 0.01) {
                this.animationFrame = requestAnimationFrame(render);
            } else {
                this.animationFrame = null;
            }
        };

        this.animationFrame = requestAnimationFrame(render);
    }

    stopRenderLoop() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }

    update() {
        // Smooth portal depth transition
        this.portalDepth += (this.targetDepth - this.portalDepth) * 0.08;

        // Portal animation
        this.portalRotation += 0.02;
        this.portalPulse = Math.sin(Date.now() * 0.003) * 0.5 + 0.5;
    }

    renderPortal() {
        const ctx = this.context;
        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        if (this.portalDepth < 0.01) return;

        const centerX = width / 2;
        const centerY = height / 2;
        const intensity = this.portalDepth;

        // Render portal based on system type
        switch (this.systemType) {
            case 'quantum':
                this.renderQuantumPortal(ctx, centerX, centerY, intensity);
                break;
            case 'holographic':
                this.renderHolographicPortal(ctx, centerX, centerY, intensity);
                break;
            case 'faceted':
                this.renderFacetedPortal(ctx, centerX, centerY, intensity);
                break;
        }
    }

    renderQuantumPortal(ctx, centerX, centerY, intensity) {
        const rings = 8;
        const maxRadius = Math.min(centerX, centerY) * 0.8;

        for (let i = 0; i < rings; i++) {
            const progress = i / rings;
            const radius = maxRadius * (1 - progress) * intensity;
            const alpha = intensity * (1 - progress) * this.portalPulse;

            if (alpha > 0.05) {
                ctx.strokeStyle = `hsla(280, 70%, ${60 + progress * 20}%, ${alpha})`;
                ctx.lineWidth = 2 + progress * 3;

                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.stroke();
            }
        }

        // Central quantum glow
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 50 * intensity);
        gradient.addColorStop(0, `rgba(138, 43, 226, ${intensity * 0.5})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, centerX * 2, centerY * 2);
    }

    renderHolographicPortal(ctx, centerX, centerY, intensity) {
        const layers = 6;
        const maxRadius = Math.min(centerX, centerY) * 0.9;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(this.portalRotation);

        for (let i = 0; i < layers; i++) {
            const progress = i / layers;
            const radius = maxRadius * (1 - progress * 0.8) * intensity;
            const alpha = intensity * (1 - progress) * 0.6;

            ctx.strokeStyle = `hsla(${330 + i * 15}, 80%, 70%, ${alpha})`;
            ctx.lineWidth = 1 + progress * 2;

            // Create holographic interference pattern
            const sides = 8 + i * 2;
            ctx.beginPath();
            for (let j = 0; j <= sides; j++) {
                const angle = (j / sides) * Math.PI * 2;
                const x = Math.cos(angle) * radius * (1 + Math.sin(angle * 3) * 0.1);
                const y = Math.sin(angle) * radius * (1 + Math.cos(angle * 3) * 0.1);

                if (j === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }

        ctx.restore();
    }

    renderFacetedPortal(ctx, centerX, centerY, intensity) {
        const facets = 12;
        const maxRadius = Math.min(centerX, centerY) * 0.7;

        ctx.save();
        ctx.translate(centerX, centerY);

        for (let i = 0; i < facets; i++) {
            const angle = (i / facets) * Math.PI * 2 + this.portalRotation;
            const radius = maxRadius * intensity * (0.5 + this.portalPulse * 0.3);

            ctx.strokeStyle = `hsla(200, 70%, 60%, ${intensity * 0.8})`;
            ctx.fillStyle = `hsla(200, 70%, 60%, ${intensity * 0.2})`;
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius
            );
            ctx.lineTo(
                Math.cos(angle + Math.PI / facets) * radius,
                Math.sin(angle + Math.PI / facets) * radius
            );
            ctx.closePath();

            ctx.fill();
            ctx.stroke();
        }

        ctx.restore();
    }

    destroy() {
        this.stopRenderLoop();
        this.context = null;
    }
}

// Export for global use
window.OrthogonalDepthProgression = OrthogonalDepthProgression;
window.PortalTextVisualizer = PortalTextVisualizer;