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
}); 