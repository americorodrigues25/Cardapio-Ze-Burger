// SEÇÃO BEBIDAS
document.getElementById('bebidas').addEventListener('click', function() {
    const bebidasContainer = document.getElementById('bebidas-container');
    if (bebidasContainer.classList.contains('opacity-0')) {
        bebidasContainer.classList.remove('opacity-0', 'h-0');
        bebidasContainer.classList.add('opacity-100', 'h-auto');
    } else {
        bebidasContainer.classList.remove('opacity-100', 'h-auto');
        bebidasContainer.classList.add('opacity-0', 'h-0');
    }
});

// SEÇÃO SOBREMESA
document.getElementById('sobremesa').addEventListener('click', function() {
    const bebidasContainer = document.getElementById('sobremesa-container');
    if (bebidasContainer.classList.contains('opacity-0')) {
        bebidasContainer.classList.remove('opacity-0', 'h-0');
        bebidasContainer.classList.add('opacity-100', 'h-auto');
    } else {
        bebidasContainer.classList.remove('opacity-100', 'h-auto');
        bebidasContainer.classList.add('opacity-0', 'h-0');
    }
});