using Microsoft.EntityFrameworkCore;
using WebApp.Models;
using WebApp.Models.Menubar;

namespace WebApp.Data
{
    public class MenubarAPI:DbContext
    {
        public MenubarAPI(DbContextOptions<MenubarAPI> options):base(options)
        {
        }
        public DbSet<Menubar> Menu_table { get; set; }

    }
}
