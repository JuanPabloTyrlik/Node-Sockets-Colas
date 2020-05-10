const { io } = require('../server');
const TicketControl = require('../sockets/classes/ticket-control').TicketControl;

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        // console.log(siguiente);
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos: ticketControl.getUltimos4Tickets()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
        // Falta actualizar pantalla de los ultimos tickets
        client.broadcast.emit('ultimos4', {
            ultimos: ticketControl.getUltimos4Tickets()
        })
    });
});