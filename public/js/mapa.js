/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapa.js":
/*!************************!*\
  !*** ./src/js/mapa.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\n\n    // Esto es un \"if\"?? es una funcion que se invoca a si misma \n    // las variables que creamos aqui van a estar disponibles en otros archivos\n    //  pero al utilizarlo de esta forma quedan en el scope de esta funcion\n    \n    // MX\n    // const lat = 20.67444163271174;\n    // const lng = -103.38739216304566;\n    \n    // MDZ\n    const lat = document.querySelector('#lat').value || -32.8887625;\n    const lng = document.querySelector('#lng').value || -68.8770697;\n\n    const mapa = L.map('mapa').setView([lat, lng ], 14);\n\n    let marker;\n\n    // Utilizar Provider y Geocoder\n    const geoCodeService = L.esri.Geocoding.geocodeService();    \n\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo(mapa);\n\n    // Pin en mapa\n    marker = new L.marker([lat, lng], {\n        draggable: true,\n        autoPan:true\n    })\n    .addTo(mapa)\n\n    // Detectamos el movimiento del Pin\n    marker.on('moveend', function(event){\n        marker = event.target\n        const position = marker.getLatLng();\n        mapa.panTo(new L.LatLng(position.lat, position.lng))\n\n        // Obtenemos la info de las calles al soltar el pin\n        geoCodeService.reverse().latlng(position, 13).run(function(err, result){\n            console.log('resultado: ' , result);\n            console.log('AddNum: ' , result?.address?.AddNum);\n            console.log('Address: ' , result?.address?.Address);\n            console.log('City: ' , result?.address?.City);\n            console.log('Postal: ' , result?.address?.Postal);\n            console.log('LongLabel: ' , result?.address?.LongLabel);\n            console.log('err: ' , err);\n\n            marker.bindPopup(result?.address?.LongLabel)\n\n            // Llenamos los campos abajo del mapa\n            document.querySelector('.calle').textContent = result?.address?.Address ?? '';\n            document.querySelector('#calle').value = result?.address?.Address ?? '';\n            document.querySelector('#lat').value = result?.latlng?.lat ?? '';\n            document.querySelector('#lng').value = result?.latlng?.lng ?? '';\n\n        })\n    })\n\n\n})()\n\n//# sourceURL=webpack://poctello/./src/js/mapa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapa.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;