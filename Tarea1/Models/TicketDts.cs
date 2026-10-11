using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Tarea1.Models.Entities;

namespace Tarea1.Models
{
    public class TicketDts

    {
      private List<Ticket> tickets;

        private static TicketDts ticketDts;

        private TicketDts() {

          tickets = new List<Ticket>();    
        
        }

        public static TicketDts GetInstance() { 

            if (ticketDts==null) { 
              ticketDts = new TicketDts();
            } 

            return ticketDts;
        }


        public List<Ticket> getTickets() { 
        
        return tickets;
        }

        public void addTickets(Ticket ticket) {
        
        tickets.Add(ticket);
        
        }

        public List<Ticket> filterTickets(bool isPending) {
            return tickets.Where(ticket => ticket.Status == (isPending?"En proceso" : "Cerrado")).ToList();
        }
       

    }
}