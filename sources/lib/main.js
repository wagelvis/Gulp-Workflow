'use strict';

(function () {
    function nombrar(nombre) {
        return nombre;
    }

    function saludar(nombre) {
        console.info(nombre, ', Testing javascript ... !');
    }

    saludar(nombrar('Wilmer'));

})();
