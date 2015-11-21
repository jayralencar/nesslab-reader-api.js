using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Leitor
{
    class Program
    {
        
        static void Main(string[] args)
        {
            Rfid reader = new Rfid();
            String comando = Console.ReadLine();
            while (comando != "exit") {
                
                switch (comando)
                {
                    case "connect":
                        Console.WriteLine("waiting|ip");
                        String ip = Console.ReadLine();
                        Console.WriteLine(ip);
                        Console.WriteLine("waiting|port");
                        int port = Convert.ToInt32(Console.ReadLine());
                        reader.connect(ip, port);
                        break;
                    case "init":
                        reader.initRead();
                        Console.WriteLine("init");
                        break;
                }

                

                comando = Console.ReadLine();
            }
        }
    }
}
