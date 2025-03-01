using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Data;
using WebApp.Models;
using WebApp.Models.Menubar;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly MenubarAPI dbContext;
        public MenuController(MenubarAPI dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpPost]
        public IActionResult GetAllMenuItem()
        {
            var menu = dbContext.Menu_table.ToList();

            return Ok(menu);
        }
        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetMenuById(Guid id)
        {
            var getmenu = dbContext.Menu_table.Find(id);
            if(getmenu is null)
            {
                return NotFound();
            }
            return Ok(getmenu);
        }
        [HttpGet]
        public IActionResult AddMenu(MenuDoter menudot)
        {
            var newmenu = new Menubar()
            {
                Menu_name = menudot.Menu_name,
                Menu_level = menudot.Menu_level,
                Menu_parent = menudot.Menu_parent,
                Menu_links = menudot.Menu_links,
                Display_order = menudot.Display_order
            };
            dbContext.Menu_table.Add(newmenu);
            dbContext.SaveChanges();
            return Ok(newmenu);
        }
        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult UpdateMenu(Guid id, UpdateMenuDOT udMD)
        {
            var findmenu = dbContext.Menu_table.Find(id);
            if(findmenu is null)
            {
                return NotFound();
            }
            findmenu.Menu_name = udMD.Menu_name;
            findmenu.Menu_level = udMD.Menu_level;
            findmenu.Menu_parent = udMD.Menu_parent;
            findmenu.Menu_links = udMD.Menu_links;
            findmenu.Display_order = udMD.Display_order;
            dbContext.Menu_table.Update(findmenu);
            dbContext.SaveChanges();
            return Ok(findmenu);
        }
        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteMenu(Guid id)
        {
            var findmenu = dbContext.Menu_table.Find(id);
            if (findmenu is null)
            {
                return NotFound();
            }
            dbContext.Menu_table.Remove(findmenu);
            dbContext.SaveChanges();
            return Ok(findmenu);
        }
    }
}
