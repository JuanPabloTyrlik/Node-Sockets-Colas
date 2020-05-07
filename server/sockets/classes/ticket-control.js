const fs = require('fs');

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        let data = require('../../data/data.json');
        if ((data.hoy !== this.hoy)) {
            this.reiniciarConteo();
        }
    }
    reiniciarConteo() {
        let data = {
            ultimo: this.ultimo,
            hoy: this.hoy
        };
        fs.writeFileSync('./server/data/data.json', JSON.stringify(data));
    }
}

module.exports = {
    TicketControl
};