// Gestion du header et footer statiques
function toggleHeaderFooter() {
    const header = document.getElementById("header");
    const footer = document.getElementById("footer");
    const portfolioSection = document.getElementById("portfolio");
    const contactSection = document.getElementById("competences");

    const portfolioTop = portfolioSection.getBoundingClientRect().top;
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

    // Initialisation de ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animation du chemin d'aventure qui se dessine progressivement
    const path = document.querySelector('.main-path');
    const pathLength = path.getTotalLength();
    
    // Définir la longueur totale du chemin
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    // Animation qui dessine le chemin
    gsap.to(".main-path", {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5
        }
    });

    // Animation du point qui suit le chemin
    gsap.to(".current-point", {
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
            onUpdate: (self) => {
                const progress = self.progress;
                const currentLength = pathLength - (pathLength * progress);
                const point = path.getPointAtLength(pathLength - currentLength);
                
                gsap.set(".current-point", {
                    attr: { cx: point.x, cy: point.y }
                });
            }
        }
    });

    // Déplacement horizontal du chemin
    gsap.to(".path-svg", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        }
    });

    // Animation des points avec un délai progressif
    document.querySelectorAll('.path-point:not(.start-point)').forEach((point, index) => {
        gsap.to(point, {
            opacity: 0.8,
            scale: 1.2,
            duration: 0.5,
            scrollTrigger: {
                trigger: "body",
                start: `${(index + 1) * 15}% center`,
                end: `${(index + 1) * 15 + 5}% center`,
                toggleActions: "play none none reverse",
                scrub: 3
            }
        });
    });

    // Ajout d'icônes ou éléments décoratifs le long du chemin
    const pathDecorations = [
        { emoji: "🏠", position: "5%", rotation: -15 },
        { emoji: "🌲", position: "20%", rotation: 10 },
        { emoji: "🗺️", position: "35%", rotation: -10 },
        { emoji: "⛰️", position: "50%", rotation: 15 },
        { emoji: "🎯", position: "65%", rotation: -5 },
        { emoji: "🌟", position: "80%", rotation: 10 },
        { emoji: "🏁", position: "95%", rotation: -10 }
    ];

    pathDecorations.forEach(decoration => {
        const decorElement = document.createElement('div');
        decorElement.className = 'path-decoration';
        decorElement.innerHTML = decoration.emoji;
        decorElement.style.top = decoration.position;
        decorElement.style.transform = `translateX(-50%) rotate(${decoration.rotation}deg)`;
        document.querySelector('.adventure-path').appendChild(decorElement);

        gsap.from(decorElement, {
            opacity: 0,
            scale: 0,
            rotation: decoration.rotation - 45,
            scrollTrigger: {
                trigger: "body",
                start: `${decoration.position} center`,
                end: `${decoration.position} top`,
                toggleActions: "play none none reverse",
                scrub: 1
            }
        });
    });
}); 