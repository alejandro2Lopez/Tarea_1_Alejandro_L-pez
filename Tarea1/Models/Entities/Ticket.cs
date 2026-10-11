using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tarea1.Models.Entities
{
    public class Ticket
    {
        private string userName;
        private string tittle;
        private string description;
        private DateTime creationDate;

        private string deparment;

        private string priority;

        private string status;

        public Ticket(string tittle, string description, DateTime creationDate, string deparment, string priority)
        {
            this.Tittle = tittle;
            this.Description = description;
            this.CreationDate = creationDate;
            this.Deparment = deparment;
            this.Priority = priority;
        }
        public Ticket()
        {
          
        }

        public string Tittle { get => tittle; set => tittle = value; }
        public string Description { get => description; set => description = value; }
        public DateTime CreationDate { get => creationDate; set => creationDate = value; }
        public string Deparment { get => deparment; set => deparment = value; }
        public string Priority { get => priority; set => priority = value; }
        public string Status { get => status; set => status = value; }
        public string UserName { get => userName; set => userName = value; }
    }
}