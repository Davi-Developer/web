// Verifica se o Service Worker é suportado
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registrado!', reg))
            .catch(err => console.log('Erro ao registrar Service Worker:', err));
    });
}

// Drag and Drop para os cards
const cards = document.querySelectorAll('.card');
const columns = document.querySelectorAll('.kanban-column');

cards.forEach(card => {
    card.setAttribute('draggable', true);
    
    card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', card.innerHTML);
        card.classList.add('dragging');
    });

    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
    });
});

columns.forEach(column => {
    column.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    column.addEventListener('drop', (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        const newCard = document.createElement('div');
        newCard.className = 'card';
        newCard.innerHTML = data;
        newCard.setAttribute('draggable', true);
        column.appendChild(newCard);
    });
});

// Alerta no botão CTA
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Obrigado por seu interesse! Em breve você receberá mais informações.');
    });
});