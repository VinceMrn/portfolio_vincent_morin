// Script pour animer la transformation du titre "PORTFOLIO" en "MES COMPÉTENCES"
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les éléments du DOM
    const titleElement = document.getElementById('portfolio-title');
    const portfolioSection = document.getElementById('portfolio');
    const competencesSection = document.getElementById('competences');
    const laposDiv = document.querySelector('.lapos');

    // Vérifier que tous les éléments existent
    if (!titleElement || !portfolioSection || !competencesSection || !laposDiv) {
        console.error('Éléments nécessaires introuvables:', 
            !titleElement ? 'Titre manquant' : 'Titre OK', 
            !portfolioSection ? 'Section portfolio manquante' : 'Section portfolio OK', 
            !competencesSection ? 'Section compétences manquante' : 'Section compétences OK',
            !laposDiv ? 'Div lapos manquante' : 'Div lapos OK');
        return;
    }

    console.log('Animation du titre initialisée');

    // Position originale du titre dans le flux normal
    titleElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    titleElement.style.width = '100%';
    titleElement.style.textAlign = 'center';
    titleElement.style.margin = '0';
    titleElement.style.padding = '0';

    // Créer un espace réservé pour maintenir la hauteur quand le titre devient fixe
    const titlePlaceholder = document.createElement('div');
    titlePlaceholder.style.height = titleElement.offsetHeight + 'px';
    titlePlaceholder.style.display = 'none';
    laposDiv.insertBefore(titlePlaceholder, titleElement);

    // Position initiale du titre et de la section portfolio
    const portfolioTop = portfolioSection.getBoundingClientRect().top + window.scrollY;
    console.log('Position top de la section portfolio:', portfolioTop);

    // Créer une classe de style pour l'animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .title-fixed {
            position: fixed;
            top: 50px;
            left: 0;
            width: 100%;
            z-index: 100;
        }
        
        .title-animating {
            opacity: 0.5;
            transform: translateY(10px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .title-transformed {
            color: #283A2A;
            transform: scale(1.05);
            transition: color 0.5s ease, transform 0.5s ease;
        }
    `;
    document.head.appendChild(styleSheet);

    // Configurer l'IntersectionObserver pour la section des compétences
    const competencesObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Section compétences en vue');
                    changeTitle('MES COMPÉTENCES', true);
                }
            });
        },
        {
            rootMargin: '-10% 0px -90% 0px',
            threshold: 0.1
        }
    );

    // Configurer l'IntersectionObserver pour la section portfolio
    const portfolioObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                // Si nous sommes en haut de la section portfolio
                if (entry.isIntersecting && entry.boundingClientRect.top <= 0) {
                    console.log('Haut de section portfolio atteint');
                    // Activer le titre fixe si on n'est pas au-dessus de la section
                    if (window.scrollY >= portfolioTop - 50) {
                        activateFixedTitle();
                    }
                } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
                    // Si on est au-dessus de la section portfolio
                    console.log('Au-dessus de la section portfolio');
                    deactivateFixedTitle();
                    changeTitle('PORTFOLIO', false);
                }
            });
        },
        {
            rootMargin: '-50px 0px 0px 0px',
            threshold: [0, 0.1, 0.5]
        }
    );

    // Observer la fin de la section des compétences pour désactiver le titre fixe
    const competencesEndObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                // Si nous avons dépassé la section des compétences
                if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                    console.log('Section compétences dépassée');
                    deactivateFixedTitle();
                }
            });
        },
        {
            rootMargin: '0px 0px -100% 0px',
            threshold: 0
        }
    );

    // Observer les sections
    competencesObserver.observe(competencesSection);
    portfolioObserver.observe(portfolioSection);
    competencesEndObserver.observe(competencesSection);

    // Fonction pour activer le titre en position fixe
    function activateFixedTitle() {
        if (!titleElement.classList.contains('title-fixed')) {
            console.log('Activation du titre fixe');
            titlePlaceholder.style.display = 'block';
            titleElement.classList.add('title-fixed');
        }
    }

    // Fonction pour désactiver le titre en position fixe
    function deactivateFixedTitle() {
        if (titleElement.classList.contains('title-fixed')) {
            console.log('Désactivation du titre fixe');
            titleElement.classList.remove('title-fixed');
            titlePlaceholder.style.display = 'none';
        }
    }

    // Fonction pour changer le titre avec animation
    function changeTitle(newText, isCompetences) {
        // Ne changer que si le texte est différent
        if (titleElement.textContent === newText) {
            return;
        }

        // Animer le changement
        titleElement.classList.add('title-animating');
        
        setTimeout(() => {
            titleElement.textContent = newText;
            
            if (isCompetences) {
                titleElement.classList.add('title-transformed');
            } else {
                titleElement.classList.remove('title-transformed');
            }
            
            setTimeout(() => {
                titleElement.classList.remove('title-animating');
            }, 300);
        }, 300);
    }

    // Ajouter un gestionnaire d'événements scroll pour contrôler l'état fixe du titre
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const competencesRect = competencesSection.getBoundingClientRect();
        const portfolioRect = portfolioSection.getBoundingClientRect();
        
        // Début de la section portfolio - activer le titre fixe
        if (scrollY >= portfolioTop - 50 && portfolioRect.bottom > 0) {
            activateFixedTitle();
            
            // Déterminer quel texte afficher
            if (competencesRect.top < window.innerHeight * 0.5 && competencesRect.bottom > 0) {
                if (titleElement.textContent !== 'MES COMPÉTENCES') {
                    changeTitle('MES COMPÉTENCES', true);
                }
            } else {
                if (titleElement.textContent !== 'PORTFOLIO') {
                    changeTitle('PORTFOLIO', false);
                }
            }
        } 
        // Avant la section portfolio ou après la section compétences - désactiver le titre fixe
        else if (scrollY < portfolioTop - 100 || competencesRect.bottom < 0) {
            deactivateFixedTitle();
        }
    });
}); 