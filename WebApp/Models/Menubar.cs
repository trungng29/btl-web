namespace WebApp.Models.Menubar
{
    public class Menubar
    {
        public long id { get; set; }
        public string Menu_name { get; set; }
        public int Menu_level { get; set; }
        public int Menu_parent { get; set; }
        public int Display_order { get; set; }
        public string Menu_links { get; set; }
    }
}
