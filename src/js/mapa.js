(function() {

    // Esto es un "if"?? es una funcion que se invoca a si misma 
    // las variables que creamos aqui van a estar disponibles en otros archivos
    //  pero al utilizarlo de esta forma quedan en el scope de esta funcion
    
    // MX
    // const lat = 20.67444163271174;
    // const lng = -103.38739216304566;
    
    // MDZ
    const lat = document.querySelector('#lat').value || -32.8887625;
    const lng = document.querySelector('#lng').value || -68.8770697;

    const mapa = L.map('mapa').setView([lat, lng ], 14);

    let marker;

    // Utilizar Provider y Geocoder
    const geoCodeService = L.esri.Geocoding.geocodeService();    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // Pin en mapa
    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan:true
    })
    .addTo(mapa)

    // Detectamos el movimiento del Pin
    marker.on('moveend', function(event){
        marker = event.target
        const position = marker.getLatLng();
        mapa.panTo(new L.LatLng(position.lat, position.lng))

        // Obtenemos la info de las calles al soltar el pin
        geoCodeService.reverse().latlng(position, 13).run(function(err, result){
            console.log('resultado: ' , result);
            console.log('AddNum: ' , result?.address?.AddNum);
            console.log('Address: ' , result?.address?.Address);
            console.log('City: ' , result?.address?.City);
            console.log('Postal: ' , result?.address?.Postal);
            console.log('LongLabel: ' , result?.address?.LongLabel);
            console.log('err: ' , err);

            marker.bindPopup(result?.address?.LongLabel)

            // Llenamos los campos abajo del mapa
            document.querySelector('.calle').textContent = result?.address?.Address ?? '';
            document.querySelector('#calle').value = result?.address?.Address ?? '';
            document.querySelector('#lat').value = result?.latlng?.lat ?? '';
            document.querySelector('#lng').value = result?.latlng?.lng ?? '';

        })
    })


})()