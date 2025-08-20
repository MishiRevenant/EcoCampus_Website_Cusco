// tour.js - Tour virtual personalizado para EcoCampus
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el tour ya se mostró en esta sesión
    if (!sessionStorage.getItem('tourShown')) {
        // Pequeña demora para asegurar que la página esté completamente cargada
        setTimeout(initTour, 1000);
    }
    
    // También agregar botón para reiniciar el tour
    addTourButton();
});

function initTour() {
    // Si ya hay un tour activo, no iniciar otro
    if (document.getElementById('tour-overlay')) {
        return;
    }
    
    // Crear el overlay del tour
    const tourOverlay = document.createElement('div');
    tourOverlay.id = 'tour-overlay';
    document.body.appendChild(tourOverlay);
    
    // Crear el popup del tour
    const tourPopup = document.createElement('div');
    tourPopup.id = 'tour-popup';
    tourOverlay.appendChild(tourPopup);
    
    // Definir los pasos del tour
    const tourSteps = [
        {
            element: '#sidebar',
            title: 'Menú de Navegación',
            description: 'Desde aquí puedes acceder a todas las secciones de EcoCampus: Retos, Foro, Ranking, Recompensas y tu Progreso.',
            position: 'right'
        },
        {
            element: '.hero',
            title: 'Bienvenido a EcoCampus',
            description: 'Aquí encontrarás información sobre los retos activos y cómo contribuir a hacer de la UC Cusco un campus más sostenible.',
            position: 'bottom'
        },
        {
            element: '.features',
            title: '¿Qué ofrece EcoCampus?',
            description: 'Descubre las cuatro características principales de nuestra plataforma: Gamificación, Métricas, Comunidad y Recompensas.',
            position: 'top'
        },
        {
            element: '.insight',
            title: 'Reto Actual',
            description: 'Mantente informado sobre el reto de sostenibilidad actual y cómo puedes participar para ganar puntos.',
            position: 'top'
        },
        {
            element: 'footer',
            title: 'Síguenos',
            description: 'Conecta con nosotros a través de nuestras redes sociales y comparte tus logros en EcoCampus.',
            position: 'top'
        }
    ];
    
    let currentStep = 0;
    
    // Función para mostrar un paso del tour
    function showStep(stepIndex) {
        if (stepIndex >= tourSteps.length) {
            // Finalizar el tour
            endTour();
            return;
        }
        
        const step = tourSteps[stepIndex];
        const element = document.querySelector(step.element);
        
        if (!element) {
            showStep(stepIndex + 1);
            return;
        }
        
        // Actualizar el contenido del popup
        tourPopup.innerHTML = `
            <div class="tour-header">
                <h3>${step.title}</h3>
                <span class="tour-progress">${stepIndex + 1}/${tourSteps.length}</span>
            </div>
            <div class="tour-body">
                <p>${step.description}</p>
            </div>
            <div class="tour-footer">
                <button class="tour-btn tour-prev" ${stepIndex === 0 ? 'disabled' : ''}>Anterior</button>
                <button class="tour-btn tour-next">${stepIndex === tourSteps.length - 1 ? 'Finalizar' : 'Siguiente'}</button>
            </div>
        `;
        
        // Posicionar el popup
        positionPopup(element, step.position);
        
        // Resaltar el elemento actual
        highlightElement(element);
        
        // Añadir event listeners a los botones
        tourPopup.querySelector('.tour-next').addEventListener('click', function() {
            showStep(stepIndex + 1);
        });
        
        const prevButton = tourPopup.querySelector('.tour-prev');
        if (!prevButton.disabled) {
            prevButton.addEventListener('click', function() {
                showStep(stepIndex - 1);
            });
        }
        
        currentStep = stepIndex;
    }
    
    function positionPopup(element, position) {
        const rect = element.getBoundingClientRect();
        const popupRect = tourPopup.getBoundingClientRect();
        const padding = 20;
        
        let top, left;
        
        switch(position) {
            case 'top':
                top = rect.top - popupRect.height - padding;
                left = rect.left + (rect.width - popupRect.width) / 2;
                break;
            case 'bottom':
                top = rect.bottom + padding;
                left = rect.left + (rect.width - popupRect.width) / 2;
                break;
            case 'left':
                top = rect.top + (rect.height - popupRect.height) / 2;
                left = rect.left - popupRect.width - padding;
                break;
            case 'right':
                top = rect.top + (rect.height - popupRect.height) / 2;
                left = rect.right + padding;
                break;
            default:
                top = rect.bottom + padding;
                left = rect.left;
        }
        
        // Asegurarse de que el popup no se salga de la pantalla
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        if (top < padding) top = padding;
        if (left < padding) left = padding;
        if (top + popupRect.height > viewportHeight - padding) {
            top = viewportHeight - popupRect.height - padding;
        }
        if (left + popupRect.width > viewportWidth - padding) {
            left = viewportWidth - popupRect.width - padding;
        }
        
        tourPopup.style.top = `${top}px`;
        tourPopup.style.left = `${left}px`;
    }
    
    function highlightElement(element) {
        // Quitar highlight anterior
        const previousHighlight = document.querySelector('.tour-highlight');
        if (previousHighlight) {
            previousHighlight.classList.remove('tour-highlight');
        }
        
        // Aplicar highlight al elemento actual
        element.classList.add('tour-highlight');
        
        // Desplazarse al elemento si no está visible
        const elementRect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        if (elementRect.top < 0 || elementRect.bottom > viewportHeight) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    function endTour() {
        // Quitar highlight
        const highlighted = document.querySelector('.tour-highlight');
        if (highlighted) {
            highlighted.classList.remove('tour-highlight');
        }
        
        // Eliminar overlay
        const overlay = document.getElementById('tour-overlay');
        if (overlay) {
            overlay.remove();
        }
        
        // Marcar que el tour ya se mostró en esta sesión
        sessionStorage.setItem('tourShown', 'true');
    }
    
    // Cerrar el tour al hacer clic fuera del popup
    tourOverlay.addEventListener('click', function(e) {
        if (e.target === tourOverlay) {
            endTour();
        }
    });
    
    // Iniciar el tour
    showStep(0);
}

function addTourButton() {
    // Si ya existe el botón, no crear otro
    if (document.getElementById('restart-tour')) {
        return;
    }
    
    // Crear botón flotante para reiniciar el tour
    const tourButton = document.createElement('button');
    tourButton.id = 'restart-tour';
    tourButton.innerHTML = '<i class="fa-solid fa-compass"></i> Tour';
    tourButton.title = 'Reiniciar tour virtual';
    
    // Añadir evento de clic
    tourButton.addEventListener('click', function() {
        sessionStorage.removeItem('tourShown');
        initTour();
    });
    
    // Añadir al cuerpo del documento
    document.body.appendChild(tourButton);
}