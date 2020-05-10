var socket = io();

socket.on('estadoActual', function(data) {
    // console.log(data);
    actualizaHTML(data.ultimos);
});

socket.on('ultimos4', function(data) {
    var audio = new Audio('../audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(data.ultimos);
});

function actualizaHTML(ultimosTickets) {
    for (let i = 0; i < ultimosTickets.length; i++) {
        var ticket = '#lblTicket'+(i+1);
        $(ticket).text('Ticket '+ultimosTickets[i].numero);
        var escritorio = '#lblEscritorio'+(i+1);
        $(escritorio).text('Escritorio '+ultimosTickets[i].escritorio);
    }
}