using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tarea1.Models;
using Tarea1.Models.Entities;

namespace Tarea1.Controllers
{
    public class TicketController : Controller
    {
   

     
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetTicketList()
        {

            List <Ticket> tickets = TicketDts.GetInstance().getTickets();
            return Json(new
            {
                status = 200,
                lista = tickets.Select(t => new
                {
                    t.Tittle,
                    t.Description,
                    CreationDate = t.CreationDate.ToString("dd/MM/yyyy HH:mm:ss"),
                    t.Deparment,
                    t.Priority,
                    t.Status,
                    t.UserName
                })
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Addtickets(Ticket ticket)
        {
            try
            {
                TicketDts.GetInstance().addTickets(ticket);

                return Json(new
                {
                    status = 200,
                    mensaje = "Ticket registrado correctamente"
                });
            }
            catch
            {
                return Json(new
                {
                    status = 501,
                    mensaje = "Error al registrar el ticket"
                });
            }
        }

      
        [HttpGet]
        public JsonResult GetTickeNumResolve()
        {

            int Numtickets = TicketDts.GetInstance().filterTickets(false).Count;
            return Json(new
            {
                status = 200,
                TicketResolveNum = Numtickets
            }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetTickeNumPending()
        {

            int Numtickets = TicketDts.GetInstance().filterTickets(true).Count;
            return Json(new
            {
                status = 200,
                TicketPendingNum = Numtickets
            }, JsonRequestBehavior.AllowGet);
        }
    }
}
