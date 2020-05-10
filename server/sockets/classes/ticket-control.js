const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosTickets = [];
        let data = require('../../data/data.json');
        if ((data.hoy !== this.hoy)) {
            this.reiniciarConteo();
        } else {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosTickets = data.ultimosTickets;
        }
    }

    siguiente() {
        this.ultimo++;
        this.tickets.push(new Ticket(this.ultimo, null));
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4Tickets() {
        return this.ultimosTickets;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0)
            return 'No hay más tickets';
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimosTickets.unshift(atenderTicket);

        if (this.ultimosTickets.length > 4) {
            this.ultimosTickets.splice(-1,1);
        }
        // console.log(this.ultimosTickets);
        this.grabarArchivo();
        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosTickets = [];
        this.grabarArchivo();
    }

    grabarArchivo() {
        let data = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosTickets: this.ultimosTickets
        };
        fs.writeFileSync('./server/data/data.json', JSON.stringify(data));
    }
}

module.exports = {
    TicketControl
};