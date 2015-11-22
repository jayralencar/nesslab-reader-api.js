using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Leitor
{
    class Program
    {
        public static bool port1 = true;
        public static bool port2 = true;
        public static bool port3 = true;
        public static bool port4 = true;
        public static bool connected = false;
        static void Main(string[] args)
        {
            Rfid reader = new Rfid();
            String comando = Console.ReadLine();
            while (comando != "exit") {
                if (comando != "connect" && !connected)
                {
                    Console.WriteLine("disconnected|You can not perform this operation because you are not connected to the reader");
                }
                else
                {

                    switch (comando)
                    {
                        case "connect":
                            Console.WriteLine("waiting|ip");
                            String ip = Console.ReadLine();
                            Console.WriteLine("waiting|port");
                            int port = Convert.ToInt32(Console.ReadLine());
                            reader.connect(ip, port);
                            reader.getAntennaState();
                            break;
                        case "init":
                            reader.initRead();
                            break;
                        case "stop":
                            reader.pauseRead();
                            break;
                        case "setAntennaState":
                            Console.WriteLine("waiting|antennaPort");
                            int antennaPort = Convert.ToInt32(Console.ReadLine());
                            Console.WriteLine("waiting|antennaState(1,0)");
                            int state = Convert.ToInt32(Console.ReadLine());
                            bool newState = (state == 1);

                            port1 = (antennaPort == 1) ? ((newState != port1) ? newState : port1) : port1;
                            port2 = (antennaPort == 2) ? ((newState != port2) ? newState : port2) : port2;
                            port3 = (antennaPort == 3) ? ((newState != port3) ? newState : port3) : port3;
                            port4 = (antennaPort == 4) ? ((newState != port4) ? newState : port4) : port4;

                            reader.activeAntennas(port1, port2, port3, port4);

                            Console.WriteLine("setAntennaState|Antena " + antennaPort + " " + (state == 1 ? "Actived" : "Desatived"));

                            break;
                        case "setAntennaPower":
                            Console.WriteLine("waiting|antennaPort");
                            int portAntenna = Convert.ToInt32(Console.ReadLine());
                            Console.WriteLine("waiting|power");
                            String power = Console.ReadLine();
                            reader.setAntennaPower(portAntenna, power);

                            Console.WriteLine("setAntennaPower|The power of antenna" + portAntenna + " is " + power + " now");

                            break;
                        case "getAntennaState":
                            reader.getAntennaState();
                            break;
                        case "getPower":
                            reader.getPower();
                            break;
                        case "reconnect":
                            reader.reconnectReader();
                            break;
                        case "disconnect":
                            reader.closeReader();
                            break;

                    }

                }

                comando = Console.ReadLine();
            }


        }
        
    }
}
