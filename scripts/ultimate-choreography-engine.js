/**
 * ULTIMATE CHOREOGRAPHY ENGINE
 * Based on actual VIB34D viewer.html implementation
 * Professional avant-garde system with exact parameter mapping
 *
 * A Paul Phillips Manifestation
 */

class UltimateChoreographyEngine {
    constructor() {
        // VIB34D System State
        this.systemState = {
            // Base 4D rotation parameters (matching viewer.html)
            baseRotations: {
                rot4dXW: 0,
                rot4dYW: 0,
                rot4dZW: 0
            },

            // Mouse-based 4D perspective
            mouse4DPerspective: {
                rot4dXW: 0,
                rot4dYW: 0,
                rot4dZW: 0
            },

            // Device orientation tracking
            deviceOrientation: {
                alpha: 0,  // Z-axis (compass)
                beta: 0,   // X-axis (front-back tilt)
                gamma: 0   // Y-axis (left-right tilt)
            },

            // Interactive state
            interactivityState: {
                tilt: true,
                mouse: true,
                scroll: true
            },

            // Choreography parameters
            globalEnergy: 0.0,
            sectionFocus: 0,
            portalIntensity: 0.0,
            microChaos: 0.0,
            gridVibrance: 1.0,
            transitionPhase: 0.0,
            morphFactor: 1.0,
            glitchIntensity: 0.0
        };

        // Card management
        this.cards = new Map();
        this.backgroundVisualizer = null;
        this.scrollPosition = 0;
        this.mousePosition = { x: 0.5, y: 0.5 };

        // Performance tracking
        this.lastUpdateTime = 0;
        this.updateThrottle = 33; // 30fps for smooth performance

        this.init();
    }

    async init() {
        console.log('🎭 Initializing Ultimate Choreography Engine...');
        console.log('📱 Setting up VIB34D tilt system...');

        this.setupDOMReferences();
        this.initializeCards();
        this.initializeBackgroundVisualizer();
        this.setupDeviceOrientation();
        this.setupMouseTracking();
        this.setupScrollChoreography();
        this.startRenderLoop();

        console.log('✨ Choreography Engine initialized');
    }

    setupDOMReferences() {
        this.universe = document.getElementById('contentUniverse');
        this.constellation = document.getElementById('cardConstellation');
        this.bgCanvas = document.getElementById('background-visualizer');
        this.paramDisplay = document.querySelector('.parameter-display');
    }

    initializeCards() {
        const cardElements = document.querySelectorAll('.floating-card');

        cardElements.forEach((card, index) => {
            const cardId = card.dataset.cardId;
            const vib34dType = card.dataset.vib34d;
            const canvas = card.querySelector('.card-visualizer');

            // Create card data object
            const cardData = {
                element: card,
                canvas: canvas,
                visualizer: null,
                index: index,
                type: vib34dType,
                depth: 0,
                scrollProgress: 0,
                choreographyPhase: index * (Math.PI / 3),

                // VIB34D parameters (matching viewer.html ranges)
                parameters: {
                    geometryType: 2,
                    density: 30 + (index * 10),
                    speed: 0.8,
                    chaos: 0.3 + (index * 0.1),
                    morph: 1.0,
                    hue: (index * 60) % 360,
                    saturation: 0.76,
                    intensity: 0.8,
                    rot4dXW: 0,
                    rot4dYW: 0,
                    rot4dZW: 0,
                    dimension: 3.5
                }
            };

            // Initialize VIB34D visualizer
            if (canvas) {
                cardData.visualizer = new VIB34DCardVisualizer(canvas, vib34dType, cardData.parameters);
            }

            this.cards.set(cardId, cardData);

            // Set CSS custom property for choreography
            card.style.setProperty('--card-index', index);
        });

        console.log(`🎨 Initialized ${this.cards.size} VIB34D card visualizers`);
    }

    initializeBackgroundVisualizer() {
        if (!this.bgCanvas) return;

        this.backgroundVisualizer = new VIB34DBackgroundVisualizer(this.bgCanvas, {
            scale: 2.5,
            opacity: 0.4,
            complementaryMode: true
        });
    }

    // EXACT VIB34D DEVICE ORIENTATION IMPLEMENTATION
    setupDeviceOrientation() {
        // Request permission for iOS 13+
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        this.enableDeviceOrientation();
                    }
                })
                .catch(console.error);
        } else if (window.DeviceOrientationEvent) {
            this.enableDeviceOrientation();
        }
    }

    enableDeviceOrientation() {
        window.addEventListener('deviceorientation', (event) => {
            if (this.systemState.interactivityState.tilt) {
                this.handleDeviceOrientation(event);
            }
        });

        console.log('📱 Device orientation tracking enabled');
    }

    // EXACT IMPLEMENTATION FROM VIEWER.HTML
    handleDeviceOrientation(event) {
        const now = Date.now();
        if (now - this.lastUpdateTime < this.updateThrottle) return;
        this.lastUpdateTime = now;

        // Update device orientation tracking (exact from viewer.html)
        this.systemState.deviceOrientation.alpha = event.alpha || 0; // Z-axis (compass)
        this.systemState.deviceOrientation.beta = event.beta || 0;   // X-axis (front-back tilt)
        this.systemState.deviceOrientation.gamma = event.gamma || 0; // Y-axis (left-right tilt)

        // Map device orientation to 4D perspective changes (exact mapping)
        this.update4DPerspective(
            this.systemState.deviceOrientation.alpha,
            this.systemState.deviceOrientation.beta,
            this.systemState.deviceOrientation.gamma
        );

        // Update parameter display
        this.updateParameterDisplay();
    }

    // EXACT 4D PERSPECTIVE MAPPING FROM VIEWER.HTML
    update4DPerspective(alpha, beta, gamma) {
        // Normalize device orientation values
        const alphaNorm = alpha * Math.PI / 180;
        const betaNorm = Math.max(-60, Math.min(60, beta)) / 60; // Clamp beta to ±60 degrees
        const gammaNorm = Math.max(-60, Math.min(60, gamma)) / 60; // Clamp gamma to ±60 degrees

        // Map to 4D rotation parameters (exact from viewer.html)
        this.systemState.mouse4DPerspective = {
            rot4dXW: this.systemState.baseRotations.rot4dXW + (betaNorm * Math.PI * 0.3),
            rot4dYW: this.systemState.baseRotations.rot4dYW + (gammaNorm * Math.PI * 0.3),
            rot4dZW: this.systemState.baseRotations.rot4dZW + (alphaNorm * 0.1)
        };

        // Calculate tilt intensity for additional effects
        const tiltIntensity = Math.sqrt(betaNorm * betaNorm + gammaNorm * gammaNorm);

        // Update global energy based on tilt intensity
        this.systemState.globalEnergy = Math.min(1.0, tiltIntensity * 2);

        // Apply to all cards with choreographed variations
        this.applyChoreographedTilt(tiltIntensity);

        // Apply complementary background reactions
        this.applyBackgroundReactions(alphaNorm, betaNorm, gammaNorm);
    }

    setupMouseTracking() {
        document.addEventListener('mousemove', (event) => {
            // Map mouse position to normalized coordinates
            this.mousePosition.x = event.clientX / window.innerWidth;
            this.mousePosition.y = event.clientY / window.innerHeight;

            // Calculate distance from center for horizontal tilt
            const centerX = 0.5;
            const centerY = 0.5;
            const distanceFromCenter = Math.hypot(
                this.mousePosition.x - centerX,
                this.mousePosition.y - centerY
            );

            // Apply mouse-based tilt (more effect further from center)
            this.applyMouseBasedTilt(distanceFromCenter);

            // Update CSS custom properties
            document.documentElement.style.setProperty('--mouse-distance-x',
                Math.abs(this.mousePosition.x - centerX) * 2);
            document.documentElement.style.setProperty('--mouse-distance-y',
                Math.abs(this.mousePosition.y - centerY) * 2);
        });
    }

    applyMouseBasedTilt(distanceFromCenter) {
        // Horizontal tilt based on mouse distance from center
        const mouseInfluence = distanceFromCenter * 0.5;
        const mouseTiltX = (this.mousePosition.x - 0.5) * mouseInfluence * Math.PI * 0.2;
        const mouseTiltY = (this.mousePosition.y - 0.5) * mouseInfluence * Math.PI * 0.2;

        // Apply to cards with individual variations
        this.cards.forEach((cardData, cardId) => {
            if (cardData.visualizer) {
                // Each card gets slightly different mouse response based on position
                const cardVariation = cardData.choreographyPhase;

                cardData.parameters.rot4dXW = this.systemState.mouse4DPerspective.rot4dXW +
                    (mouseTiltX * Math.cos(cardVariation));
                cardData.parameters.rot4dYW = this.systemState.mouse4DPerspective.rot4dYW +
                    (mouseTiltY * Math.sin(cardVariation));

                cardData.visualizer.updateParameters(cardData.parameters);
            }
        });
    }

    setupScrollChoreography() {
        let lastScrollTime = 0;
        const scrollThrottle = 16; // 60fps for smooth scroll

        window.addEventListener('scroll', (event) => {
            const now = Date.now();
            if (now - lastScrollTime < scrollThrottle) return;
            lastScrollTime = now;

            this.scrollPosition = window.pageYOffset;
            this.updateScrollChoreography();
        });

        // Smooth scroll animation
        window.addEventListener('wheel', (event) => {
            event.preventDefault();

            // Smooth scroll with momentum
            const delta = event.deltaY * 0.5;
            const targetScroll = Math.max(0, this.scrollPosition + delta);

            this.animateScrollTo(targetScroll);
        }, { passive: false });
    }

    updateScrollChoreography() {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = maxScroll > 0 ? this.scrollPosition / maxScroll : 0;

        // Update cards with choreographed depth progression
        this.cards.forEach((cardData, cardId) => {
            const cardElement = cardData.element;
            const rect = cardElement.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;

            // Calculate card's position relative to viewport center
            const distanceFromCenter = (cardCenter - viewportCenter) / viewportCenter;
            const depthFactor = Math.max(0, 1 - Math.abs(distanceFromCenter));

            // Update card depth and Z-axis rotation based on scroll
            cardData.depth = distanceFromCenter;
            cardData.scrollProgress = depthFactor;

            // Apply vertical scroll to ZW rotation (choreographed pattern)
            cardData.parameters.rot4dZW = this.systemState.mouse4DPerspective.rot4dZW +
                (scrollProgress * Math.PI * 0.5 * Math.sin(cardData.choreographyPhase));

            // Update visual parameters based on depth
            this.updateCardDepthParameters(cardData, depthFactor);

            // Apply CSS transforms for card positioning
            this.applyCardTransforms(cardData, distanceFromCenter, depthFactor);
        });

        // Update background choreography
        if (this.backgroundVisualizer) {
            this.backgroundVisualizer.updateScrollChoreography(scrollProgress);
        }
    }

    applyChoreographedTilt(tiltIntensity) {
        // Apply tilt to cards with choreographed variations
        this.cards.forEach((cardData, cardId) => {
            if (!cardData.visualizer) return;

            // Each card responds differently based on its choreography phase
            const phaseOffset = cardData.choreographyPhase;
            const cardTiltMultiplier = 0.7 + (Math.sin(phaseOffset) * 0.3);

            // Apply 4D rotations with individual variations
            cardData.parameters.rot4dXW = this.systemState.mouse4DPerspective.rot4dXW * cardTiltMultiplier;
            cardData.parameters.rot4dYW = this.systemState.mouse4DPerspective.rot4dYW * cardTiltMultiplier;
            cardData.parameters.rot4dZW = this.systemState.mouse4DPerspective.rot4dZW +
                (Math.cos(phaseOffset) * tiltIntensity * 0.2);

            // Update other parameters based on tilt intensity
            cardData.parameters.chaos = Math.min(1.0, 0.3 + (tiltIntensity * 0.5));
            cardData.parameters.morph = 1.0 + (tiltIntensity * 0.5);
            cardData.parameters.intensity = 0.8 + (tiltIntensity * 0.2);

            // Apply parameters to visualizer
            cardData.visualizer.updateParameters(cardData.parameters);
        });
    }

    applyBackgroundReactions(alphaNorm, betaNorm, gammaNorm) {
        if (!this.backgroundVisualizer) return;

        // Complementary reactions (opposite direction for framing effect)
        const complementaryParams = {
            rot4dXW: -betaNorm * Math.PI * 0.1, // Opposite X rotation
            rot4dYW: -gammaNorm * Math.PI * 0.1, // Opposite Y rotation
            rot4dZW: alphaNorm * 0.2, // Enhanced Z rotation
            intensity: 0.4 + (Math.abs(betaNorm + gammaNorm) * 0.2),
            morphFactor: 1.0 + (Math.abs(alphaNorm) * 0.3)
        };

        this.backgroundVisualizer.updateTiltParameters(complementaryParams);
    }

    updateCardDepthParameters(cardData, depthFactor) {
        // Scale parameters based on depth (cards closer to center are more intense)
        const focusMultiplier = depthFactor;

        cardData.parameters.density = Math.round(20 + (focusMultiplier * 40));
        cardData.parameters.speed = 0.5 + (focusMultiplier * 0.5);
        cardData.parameters.saturation = 0.6 + (focusMultiplier * 0.4);

        // Apply to visualizer
        if (cardData.visualizer) {
            cardData.visualizer.updateParameters(cardData.parameters);
        }
    }

    applyCardTransforms(cardData, distanceFromCenter, depthFactor) {
        const cardElement = cardData.element;

        // Calculate Z-translation based on distance from center
        const zTranslation = -Math.abs(distanceFromCenter) * 300;
        const scale = 0.7 + (depthFactor * 0.3);
        const opacity = 0.4 + (depthFactor * 0.6);

        // Apply transform
        cardElement.style.transform = `translateZ(${zTranslation}px) scale(${scale})`;
        cardElement.style.opacity = opacity;

        // Update blur based on depth
        const blur = Math.abs(distanceFromCenter) * 3;
        cardElement.style.filter = `blur(${blur}px)`;
    }

    animateScrollTo(targetScroll) {
        const startScroll = this.scrollPosition;
        const distance = targetScroll - startScroll;
        const duration = 500;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Smooth easing
            const eased = 1 - Math.pow(1 - progress, 3);

            this.scrollPosition = startScroll + (distance * eased);
            window.scrollTo(0, this.scrollPosition);

            this.updateScrollChoreography();

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    updateParameterDisplay() {
        if (!this.paramDisplay) return;

        // Update parameter display with current values
        document.getElementById('param-xw').textContent =
            this.systemState.mouse4DPerspective.rot4dXW.toFixed(2);
        document.getElementById('param-yw').textContent =
            this.systemState.mouse4DPerspective.rot4dYW.toFixed(2);
        document.getElementById('param-zw').textContent =
            this.systemState.mouse4DPerspective.rot4dZW.toFixed(2);
        document.getElementById('param-energy').textContent =
            this.systemState.globalEnergy.toFixed(2);
    }

    // CARD BIRTH AND DEATH FLOURISHES
    triggerCardBirth(cardId) {
        const cardData = this.cards.get(cardId);
        if (!cardData) return;

        const card = cardData.element;

        // Birth flourish animation
        card.style.opacity = '0';
        card.style.transform = 'translateZ(-800px) rotateX(-90deg) scale(0.3)';

        if (cardData.visualizer) {
            // Birth parameter flourish
            cardData.visualizer.triggerBirthFlourish();
        }

        // Animate to normal state
        setTimeout(() => {
            card.style.transition = 'all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            card.style.opacity = '1';
            card.style.transform = 'translateZ(0) rotateX(0) scale(1)';
        }, 100);
    }

    triggerCardDeath(cardId) {
        const cardData = this.cards.get(cardId);
        if (!cardData) return;

        const card = cardData.element;

        if (cardData.visualizer) {
            // Death parameter flourish
            cardData.visualizer.triggerDeathFlourish();
        }

        // Death animation
        card.style.transition = 'all 1s cubic-bezier(0.95, 0.05, 0.795, 0.035)';
        card.style.transform = 'translateZ(800px) rotateX(180deg) rotateY(720deg) scale(0)';
        card.style.opacity = '0';
        card.style.filter = 'blur(20px) saturate(0) hue-rotate(360deg)';
    }

    startRenderLoop() {
        const render = () => {
            // Update global CSS variables
            document.documentElement.style.setProperty('--global-energy', this.systemState.globalEnergy);
            document.documentElement.style.setProperty('--tilt-x', this.systemState.mouse4DPerspective.rot4dXW);
            document.documentElement.style.setProperty('--tilt-y', this.systemState.mouse4DPerspective.rot4dYW);

            // Render background visualizer
            if (this.backgroundVisualizer) {
                this.backgroundVisualizer.render();
            }

            // Render all card visualizers
            this.cards.forEach(cardData => {
                if (cardData.visualizer) {
                    cardData.visualizer.render();
                }
            });

            requestAnimationFrame(render);
        };

        render();
    }

    // PUBLIC API
    enableTilt() {
        this.systemState.interactivityState.tilt = true;
        console.log('📱 Device tilt enabled');
    }

    disableTilt() {
        this.systemState.interactivityState.tilt = false;
        console.log('📱 Device tilt disabled');
    }

    updateBaseRotations(rotations) {
        Object.assign(this.systemState.baseRotations, rotations);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.ultimateChoreography = new UltimateChoreographyEngine();
});