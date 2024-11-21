function iniciarMap(){
    var coord = {lat: -34.617048, lng: -58.3844935}
    var map = new google.maps.Map(document.getElementById('map'),{
        zoom: 10,
        center: coord
    });
    var marker = new google.maps.Marker({
        position: coord,
        map: map
    })
}

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe
  
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    const feedback = document.getElementById('feedback');
  
    // Limpia el mensaje de feedback antes de empezar
    feedback.textContent = '';
    feedback.style.color = 'red';
  
    // Validaciones
    let errores = [];
  
    // Validar nombre: no números ni caracteres especiales
    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!nombreRegex.test(nombre)) {
      errores.push('El nombre no debe contener números ni caracteres especiales.');
    }
  
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errores.push('El formato del correo electrónico es incorrecto.');
    }
  
    // Validar mensaje: no vacío
    if (mensaje.length === 0) {
      errores.push('El mensaje no puede estar vacío.');
    }
  
    // Mostrar mensajes de error o éxito
    if (errores.length > 0) {
      feedback.textContent = errores.join(' ');
    } else {
      feedback.textContent = '¡Formulario enviado correctamente!';
      feedback.style.color = 'green';
  
      // Aquí puedes agregar lógica adicional si necesitas procesar los datos
    }
  });
