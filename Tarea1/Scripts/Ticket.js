$(document).ready(function () {
    getTicketList();
    getPendingTickets();
    getTotalTickets();
    getResolveTickets();
    $("#pTotalTicket").text(0);
});

function getTicketList() {
    $.ajax({
        url: '/Ticket/GetTicketList',
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
        },
        error: function (xhr) {
            console.error("Error al obtener tickets:", xhr);
        }
    });
}

function getPendingTickets() {
    return $.ajax({
        url: '/Ticket/GetTickeNumPending',
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            $("#pendingTotalTicket").text(respuesta.TicketPendingNum);
        },
        error: function (xhr) {
            console.error("Error al obtener tickets:", xhr);
        }
    });
}

function getResolveTickets() {
    return $.ajax({
        url: '/Ticket/GetTickeNumResolve',
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            $("#solveTotalTicket").text(respuesta.TicketResolveNum);
        },
        error: function (xhr) {
            console.error("Error al obtener tickets:", xhr);
        }
    });
}

function getTotalTickets() {
    return $.ajax({
        url: '/Ticket/GetTicketList',
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            $("#totalTicket").text(respuesta.lista.length);
        },
        error: function (xhr) {
            console.error("Error al obtener tickets:", xhr);
        }
    });
}
function getTicketsList() {
    $.ajax({
        url: '/Ticket/GetTicketList',
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
          
            $("#tablaTickets").empty();
            respuesta.lista.forEach(function (ticket) {
                const fila = $("<tr>");
               
                $("<td>").text(ticket.UserName).appendTo(fila);
                $("<td>").text(ticket.Tittle).appendTo(fila);
                $("<td>").text(ticket.Description).appendTo(fila);
                $("<td>").text(ticket.CreationDate).appendTo(fila);
                $("<td>").text(ticket.Deparment).appendTo(fila);
                $("<td>").text(ticket.Priority).appendTo(fila);
                $("<td>").text(ticket.Status).appendTo(fila);

              

                $("#tablaTickets").append(fila);
            });
        },
        error: function (xhr) {
            console.error("Error al obtener tickets:", xhr);
        }
    });
}


$("#formTicket").on("submit", function (e) {

    e.preventDefault();
    if (!validarTicket()) {
        return;
    }
    const ticket = {
        UserName: $("#userName").val(),
        Tittle: $("#tittle").val(),
        Description: $("#description").val(),
        Deparment: $("#deparment").val(),
        Priority: $("#priority").val(),
        Status: $("#status").val()
    };

    const boton = $("#btnGuardarTicket");
    boton.prop("disabled", true);

    $.ajax({
        url: '/Ticket/addtickets',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(ticket),

        success: function (respuesta) {

            alert("Ticket agregado correctamente");

           
            const modal = bootstrap.Modal.getInstance(
                document.getElementById("modalTicket")
            );
            modal.hide();

           
            $("#formTicket")[0].reset();

            getTicketsList();
            
           

            $.when(
                getTotalTickets(),
               getPendingTickets(),
               getResolveTickets()
            ).done(function () {

                var totalTicket = Number($("#totalTicket").text());
                var pendingTotalTicket = Number($("#pendingTotalTicket").text());
                var solveTotalTicket = Number($("#solveTotalTicket").text());

                var resultado = totalTicket -
                    (pendingTotalTicket + solveTotalTicket);
                $("#pTotalTicket").text(resultado);

            }

            ).fail(function () {
                console.error("Error al obtener los datos de los tickets");
            });
        },

        error: function (xhr) {
            console.error(xhr.responseText);
            alert("Error al guardar el ticket");
        },

        complete: function () {
            boton.prop("disabled", false);
        }
    });



});


