// Gestion du header et footer statiques
function toggleHeaderFooter() {
    const header = document.getElementById("header");
    const footer = document.getElementById("footer");
    const portfolioSectionHeader = document.getElementById("portfolio");
    const contactSection = document.getElementById("competences");

    const portfolioTop = portfolioSectionHeader.getBoundingClientRect().top;
    const contactTop = contactSection.getBoundingClientRect().top;

    if (portfolioTop <= 0) {
        header.style.display = "none";
        footer.style.display = "block";
    } 
    else if (contactTop > window.innerHeight) {
        header.style.display = "block";
        footer.style.display = "none";
    }
}

// Configuration des projets
const projectsConfig = {
    'villas-daumesnil': {
        title: 'Projet Villas Daumesnil',
        description: 'Un site web moderne pour un projet immobilier de prestige, mettant en valeur l\'architecture et le cadre de vie exceptionnel des Villas Daumesnil.',
        link: '#'
    },
    'villas-daumesnil-2': {
        title: 'Projet Villas Daumesnil',
        description: 'Une autre perspective du projet immobilier, présentant les aspects uniques et les caractéristiques distinctives des Villas Daumesnil.',
        link: '#'
    },
    'axione': {
        title: 'Motion Design Axione',
        description: 'Animation motion design créée pour Axione, illustrant leur expertise dans les infrastructures numériques et leur vision innovante.',
        link: '#'
    },
    'midjourney': {
        title: 'IA Midjourney Instagram',
        description: 'Création d\'images générées par l\'IA Midjourney, explorant les possibilités créatives de l\'intelligence artificielle pour Instagram.',
        link: '#'
    },
    'zebra': {
        title: 'Site Web Agence Zebra',
        description: 'Design et développement du site web pour l\'agence Zebra, mettant en avant leur expertise et leurs réalisations dans le domaine du design.',
        link: '#'
    },
    'autisme': {
        title: 'Site Web sur l\'autisme',
        description: 'Un site web informatif et accessible sur l\'autisme, conçu pour sensibiliser et éduquer le public sur ce sujet important.',
        link: '#'
    }
};

// Configuration de Lenis pour un défilement fluide
const lenis = new Lenis({
    duration: 2.5,
    easing: (t) => {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;
        return t < 0.5
            ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
            : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
    },
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.6,
    smoothTouch: true,
    touchMultiplier: 1.5,
    infinite: false,
    normalizeWheel: true,
    lerp: 0.05,
    syncTouch: true,
    syncTouchLerp: 0.05,
    touchInertiaMultiplier: 2,
    autoResize: true,
    smooth: true,
    smoothTouchMultiplier: 1.5,
    smoothWheelMultiplier: 0.6,
    smoothTouchDuration: 1.5,
    smoothWheelDuration: 2.5,
    smoothTouchEasing: (t) => {
        return t < 0.5
            ? 2 * t * t
            : -1 + (4 - 2 * t) * t;
    },
    smoothWheelEasing: (t) => {
        return t < 0.5
            ? 4 * t * t * t
            : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
});

// Synchroniser Lenis avec GSAP ScrollTrigger
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

// Configuration de GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger, TextPlugin);

ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
        if (arguments.length) {
            lenis.scrollTo(value, { 
                immediate: false,
                duration: 2.5,
                easing: (t) => {
                    const c1 = 1.70158;
                    const c2 = c1 * 1.525;
                    return t < 0.5
                        ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
                        : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
                }
            });
        }
        return lenis.scroll;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
});

// Initialisation au chargement du document
document.addEventListener('DOMContentLoaded', () => {
    // Initialisation du header/footer
    toggleHeaderFooter();
    document.addEventListener("scroll", toggleHeaderFooter);

    // Gestion de la modal
    const modalOverlay = document.querySelector('.modal-overlay');
    const polaroidCard = modalOverlay.querySelector('.polaroid-card');
    const polaroidImage = polaroidCard.querySelector('.polaroid-image');
    const polaroidContent = polaroidCard.querySelector('.polaroid-content');
    const closeButton = polaroidCard.querySelector('.close-modal');

    // Fonction pour ouvrir la modal
    function openModal(projectId, mediaElement) {
        const project = projectsConfig[projectId];
        const clonedMedia = mediaElement.cloneNode(true);
        
        // Mise à jour du contenu
        polaroidImage.innerHTML = '';
        polaroidImage.appendChild(clonedMedia);
        polaroidContent.querySelector('h2').textContent = project.title;
        polaroidContent.querySelector('p').textContent = project.description;
        polaroidContent.querySelector('.view-project').href = project.link;

        // Animation d'ouverture
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Si c'est une vidéo, on s'assure qu'elle joue
        if (clonedMedia.tagName.toLowerCase() === 'video') {
            clonedMedia.play();
        }
    }

    // Fonction pour fermer la modal
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Nettoyage après l'animation
        setTimeout(() => {
            polaroidImage.innerHTML = '';
            polaroidContent.querySelector('h2').textContent = '';
            polaroidContent.querySelector('p').textContent = '';
        }, 500);
    }

    // Event listeners pour la modal
    document.querySelectorAll('.case').forEach(project => {
        project.addEventListener('click', () => {
            const projectId = project.dataset.project;
            const mediaElement = project.querySelector('img, video');
            openModal(projectId, mediaElement);
        });
    });

    // Fermer avec le bouton
    closeButton.addEventListener('click', closeModal);

    // Fermer en cliquant sur l'overlay
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Fermer avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Animation du chemin avec GSAP
    const portfolioPath = document.querySelector('.portfolio-path path');
    const portfolioSectionPath = document.querySelector('.portfolio');

    if (portfolioPath && portfolioSectionPath) {
        const pathLength = portfolioPath.getTotalLength();
        
        gsap.set(portfolioPath, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
            opacity: 1
        });

        gsap.to(portfolioPath, {
            strokeDashoffset: 0,
            duration: 1,
            ease: "none",
            scrollTrigger: {
                trigger: portfolioSectionPath,
                start: "top center",
                end: "bottom center",
                scrub: 1
            }
        });
    }

    // Animation des compétences
    const skillsSection = document.querySelector('.competences');
    const skillsTitle = skillsSection.querySelector('h3');
    const skillLine = document.querySelector('.skill-line');
    const skillBlocks = document.querySelectorAll('.skill-block');

    if (skillsSection) {
        // Timeline pour l'animation des compétences
        const skillsTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: skillsSection,
                start: 'top center',
                end: 'center center',
                toggleActions: 'play none none reverse'
            }
        });

        // Animation du titre
        skillsTimeline.to(skillsTitle, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        });

        // Animation de la ligne liée au scroll
        gsap.fromTo(skillLine, 
            { 
                clipPath: "inset(0 0 0 100%)"
            },
            {
                clipPath: "inset(0 0 0 0%)",
                duration: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: skillsSection,
                    start: "top center",
                    end: "center center",
                    scrub: 1
                }
            }
        );

        // Animation des blocs liée au scroll
        const reversedBlocks = Array.from(skillBlocks).reverse();
        reversedBlocks.forEach((block, index) => {
            const progress = (index + 1) / reversedBlocks.length;
            
            // Animation du contour de la box
            gsap.fromTo(block,
                {
                    opacity: 0,
                    y: 50,
                    borderWidth: 0
                },
                {
                    opacity: 1,
                    y: 0,
                    borderWidth: 2,
                    duration: 0.6,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: skillsSection,
                        start: "top center",
                        end: "center center",
                        scrub: 1,
                        onUpdate: (self) => {
                            if (self.progress >= progress) {
                                block.classList.add('visible');
                                // Animation du contour
                                const borderProgress = (self.progress - progress) * 2;
                                if (borderProgress > 0) {
                                    block.style.borderWidth = `${2 * borderProgress}px`;
                                }
                            } else {
                                block.classList.remove('visible');
                                block.style.borderWidth = '0px';
                            }
                        }
                    }
                }
            );
        });
    }

    

    // Menu burger
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle nav
        nav.classList.toggle('active');
        burger.classList.toggle('active');

        // Animate links
        navLinks.forEach((link, index) => {
            link.classList.toggle('show');
        });
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
            navLinks.forEach(link => link.classList.remove('show'));
        });
    });

    // Ajout de l'animation keyframe au début du fichier
    const style = document.createElement('style');
    style.textContent = `
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);

    // =================================================================
    // ANIMATION DU TITRE PORTFOLIO -> MES COMPÉTENCES
    // =================================================================
    
    // Récupérer les éléments nécessaires
    const portfolioTitle = document.getElementById('portfolio-title');
    const portfolioSectionTitle = document.getElementById('portfolio');
    const competencesSection = document.getElementById('competences');
    
    // Vérifier que tous les éléments existent
    if (portfolioTitle && portfolioSectionTitle && competencesSection) {
        console.log("Éléments trouvés pour l'animation du titre");
        
        // Assurer que le titre est en position fixe et stylisé correctement
        portfolioTitle.style.position = 'fixed';
        portfolioTitle.style.top = '200px'; // Augmenté de 150px à 200px
        portfolioTitle.style.left = '0';
        portfolioTitle.style.width = '100%';
        portfolioTitle.style.textAlign = 'center';
        portfolioTitle.style.zIndex = '10';
        portfolioTitle.style.fontFamily = "'Druk Trial', sans-serif";
        portfolioTitle.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        // Créer des options pour l'IntersectionObserver
        const observerOptions = {
            root: null, // Utiliser la fenêtre comme racine
            rootMargin: '-20% 0px', // Marge au-dessus et en-dessous
            threshold: 0.1 // Déclencher lorsque 10% de l'élément est visible
        };
        
        // Créer l'IntersectionObserver pour la section des compétences
        const competencesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Si la section des compétences entre dans la vue
                if (entry.isIntersecting) {
                    console.log("La section compétences est visible");
                    // Ajouter une classe pour l'animation
                    portfolioTitle.classList.add('animating');
                    
                    // Changer le texte après une courte pause
                    setTimeout(() => {
                        // Changer le texte
                        portfolioTitle.textContent = "MES COMPETENCES";
                        // Ajouter une classe pour les styles de compétences
                        portfolioTitle.classList.add('transform-complete');
                        
                        // Terminer l'animation
                        setTimeout(() => {
                            portfolioTitle.classList.remove('animating');
                        }, 300);
                    }, 300);
                }
            });
        }, observerOptions);
        
        // Observer la section des compétences
        competencesObserver.observe(competencesSection);
        
        // Observer la section du portfolio pour revenir au texte original
        const portfolioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Si la section portfolio est visible et que nous remontons
                if (entry.isIntersecting && window.scrollY < document.body.scrollHeight / 2) {
                    console.log("Retour à la section portfolio");
                    
                    // Ajouter une classe pour l'animation
                    portfolioTitle.classList.add('animating');
                    
                    // Changer le texte après une courte pause
                    setTimeout(() => {
                        // Changer le texte
                        portfolioTitle.textContent = "PORTFOLIO";
                        // Supprimer la classe des styles de compétences
                        portfolioTitle.classList.remove('transform-complete');
                        
                        // Terminer l'animation
                        setTimeout(() => {
                            portfolioTitle.classList.remove('animating');
                        }, 300);
                    }, 300);
                }
            });
        }, observerOptions);
        
        // Observer la section du portfolio
        portfolioObserver.observe(portfolioSectionTitle);
        
        // Ajouter un gestionnaire d'événements de défilement pour les cas spéciaux
        window.addEventListener('scroll', () => {
            const competencesRect = competencesSection.getBoundingClientRect();
            const portfolioRect = portfolioSectionTitle.getBoundingClientRect();
            
            // Si nous sommes complètement au-dessus de la section des compétences
            if (competencesRect.top > window.innerHeight) {
                // Vérifier si le texte n'est pas déjà "PORTFOLIO"
                if (portfolioTitle.textContent !== "PORTFOLIO") {
                    console.log("Retour au texte PORTFOLIO (défilement)");
                    portfolioTitle.textContent = "PORTFOLIO";
                    portfolioTitle.classList.remove('transform-complete');
                }
            }
            
            // Si nous sommes complètement en dessous de la section portfolio
            if (portfolioRect.bottom < 0 && competencesRect.top < window.innerHeight) {
                // Vérifier si le texte n'est pas déjà "MES COMPÉTENCES"
                if (portfolioTitle.textContent !== "MES COMPETENCES") {
                    console.log("Changement vers MES COMPETENCES (défilement)");
                    portfolioTitle.textContent = "MES COMPETENCES";
                    portfolioTitle.classList.add('transform-complete');
                }
            }
        });
    } else {
        console.error("Éléments manquants pour l'animation du titre:", 
            portfolioTitle ? "Titre trouvé" : "Titre INTROUVABLE", 
            portfolioSectionTitle ? "Section portfolio trouvée" : "Section portfolio INTROUVABLE",
            competencesSection ? "Section compétences trouvée" : "Section compétences INTROUVABLE");
    }
});

// Menu burger
function setupBurgerMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    // Toggle du menu
    burger.addEventListener('click', () => {
        // Toggle de la classe active
        nav.classList.toggle('nav-active');
        
        // Animation des liens
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Animation du burger
        burger.classList.toggle('toggle');
    });
    
    // Fermer le menu quand un lien est cliqué
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });
}

// Exécuter après le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    setupBurgerMenu();
}); 