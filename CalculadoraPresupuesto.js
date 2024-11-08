// Actualizar el costo total
function calculateTotalCost() {
    let total = 0;

    // Sumar el costo de los servicios seleccionados
    document.querySelectorAll('.service').forEach(service => {
        if (service.checked) {
            total += parseFloat(service.dataset.cost);
        }
    });

    // Sumar el costo de la vacunación seleccionada
    const vacunacionCost = parseFloat(document.getElementById('vacunacion').value);
    total += isNaN(vacunacionCost) ? 0 : vacunacionCost;

    // Mostrar el costo total
    document.getElementById('total-cost').innerText = total;
}

// Limpiar campos y reiniciar el costo
function clearFields() {
    document.querySelectorAll('.service').forEach(service => {
        service.checked = false;
    });

    document.getElementById('animal').selectedIndex = 0;
    document.getElementById('vacunacion').selectedIndex = 0;

    calculateTotalCost();
}

// Escuchar cambios en los checkboxes y selects
document.querySelectorAll('.service, #vacunacion').forEach(element => {
    element.addEventListener('change', calculateTotalCost);
});
