document.addEventListener('DOMContentLoaded', () => {
    const yearSelect = document.getElementById('year');
    const monthSelect = document.getElementById('month');
    const datesContainer = document.getElementById('dates');
    const mensaje = document.getElementById('mensaje');
    const agendarButton = document.getElementById('agendar');
  
    // Populate year dropdown
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      yearSelect.add(new Option(i, i));
    }
    yearSelect.value = currentYear;
  
    // Generate calendar dates
    function generateCalendar() {
      datesContainer.innerHTML = '';
      const year = parseInt(yearSelect.value);
      const month = parseInt(monthSelect.value);
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
  
      // Adjust first day to start from Monday
      const startDay = (firstDay === 0 ? 6 : firstDay - 1);
  
      for (let i = 0; i < startDay; i++) {
        datesContainer.insertAdjacentHTML('beforeend', '<div class="date empty"></div>');
      }
  
      for (let i = 1; i <= daysInMonth; i++) {
        const weekendClass = (startDay + i - 1) % 7 >= 5 ? 'weekend' : '';
        datesContainer.insertAdjacentHTML('beforeend', `<div class="date ${weekendClass}" data-date="${i}">${i}</div>`);
      }
  
      addDateSelection();
    }
  
    // Add event listener for date selection
    function addDateSelection() {
      document.querySelectorAll('.date').forEach(date => {
        if (!date.classList.contains('empty')) {
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
        mensaje.textContent = 'Por favor, selecciona una fecha.';
        mensaje.style.color = 'red';
      }
    });
  
    // Initialize calendar
    yearSelect.addEventListener('change', generateCalendar);
    monthSelect.addEventListener('change', generateCalendar);
    generateCalendar();
  });
  