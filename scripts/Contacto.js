function iniciarMap() {
  var coord = { lat: -34.617048, lng: -58.3844935 }
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: coord
  });
  var marker = new google.maps.Marker({
    position: coord,
    map: map
  })
}

document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();
  alert('¡Formulario enviado con éxito! Gracias por tu mensaje.');
  document.getElementById('contactForm').reset();

});
