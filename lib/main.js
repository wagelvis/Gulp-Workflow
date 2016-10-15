'use strict';

(function () {
    function nombrar(nombre) {
        return nombre;
    }

    function saludar(nombre) {
        console.info(nombre, ', Bienvenido !');
    }

    saludar(nombrar('Wilmer'));

})();
