document.addEventListener('DOMContentLoaded', () => {
  const yearSelect = document.getElementById('year');
  const monthSelect = document.getElementById('month');
  const datesContainer = document.getElementById('dates');
  const mensaje = document.getElementById('mensaje');
  const agendarButton = document.getElementById('agendar');
  const horario = document.getElementById('dates');


  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // Populate year dropdown
  for (let i = currentYear; i <= currentYear + 10; i++) {
    yearSelect.add(new Option(i, i));
  }
  yearSelect.value = currentYear;

  // Update month dropdown based on selected year
  function updateMonthDropdown() {
    monthSelect.innerHTML = '';

    const selectedYear = parseInt(yearSelect.value, 10);
    const startMonth = selectedYear === currentYear ? currentMonth : 0;

    for (let i = startMonth; i < 12; i++) {
      const monthName = monthSelect.options[i]?.text || [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ][i];
      monthSelect.add(new Option(monthName, i));
    }
  }

  // Generate calendar dates
  function generateCalendar() {
    datesContainer.innerHTML = '';
    const year = parseInt(yearSelect.value, 10);
    const month = parseInt(monthSelect.value, 10);
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Adjust first day to start from Monday
    const startDay = (firstDay === 0 ? 6 : firstDay - 1);

    for (let i = 0; i < startDay; i++) {
      datesContainer.insertAdjacentHTML('beforeend', '<div class="date empty"></div>');
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const isPastDate = currentDate < today.setHours(0, 0, 0, 0); // Compare without time
      const disabledClass = isPastDate ? 'disabled' : '';
      const weekendClass = (startDay + i - 1) % 7 >= 5 ? 'weekend' : '';
      datesContainer.insertAdjacentHTML(
        'beforeend',
        `<div class="date ${weekendClass} ${disabledClass}" data-date="${i}">${i}</div>`
      );
    }

    addDateSelection();
  }

  // Add event listener for date selection
  function addDateSelection() {
    document.querySelectorAll('.date').forEach(date => {
      if (!date.classList.contains('empty') && !date.classList.contains('disabled')) {
        date.addEventListener('click', function () {
          document.querySelectorAll('.date').forEach(d => d.classList.remove('selected'));
          this.classList.add('selected');
        });
      }
    });
  }

  // Display message when "Agendar Fecha" button is clicked
  agendarButton.addEventListener('click', () => {
    const selectedDate = document.querySelector('.date.selected');
    if (selectedDate) {
      const year = yearSelect.value;
      const month = monthSelect.options[monthSelect.selectedIndex].text;
      const day = selectedDate.dataset.date;
      mensaje.textContent = `Fecha agendada: ${day} de ${month} de ${year}`;
      mensaje.style.color = 'green';
    } else {
      mensaje.textContent = 'Por favor, selecciona una fecha válida.';
      mensaje.style.color = 'red';
    }
  });

  // Initialize calendar and update months
  yearSelect.addEventListener('change', () => {
    updateMonthDropdown();
    generateCalendar();
  });
  monthSelect.addEventListener('change', generateCalendar);

  updateMonthDropdown();
  generateCalendar();
});
