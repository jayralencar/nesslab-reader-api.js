using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using nesslab.reader.api;

namespace Leitor
{
    class Rfid
    {
        Reader reader;
        

        //Contructor
        public Rfid(){
            reader = new Reader(ConnectType.Tcp);
            reader.ReaderEvent += new ReaderEventHandler(OnReaderEvent);
            reader.ModelType = ModelType.NL_RF1000;
        }
        
        //Connect reader
        public void connect(String ip, int port) {
            Console.WriteLine("status|connecting");
            reader.ConnectSocket(ip, port);
        }

        //Starting reading
        public void initRead(){
            reader.ReadTagId(TagType.ISO18000_6C_GEN2, ReadType.MULTI);
            Console.WriteLine("initread|Reading was initiated");
        }

        //Pausing reading
        public void pauseRead() {
            reader.StopOperation();
            Console.WriteLine("paused|Reading was paused");
        }

        //Set antenna power
        public void setAntennaPower(int antenna, String power) {
            reader.SuspendAntennaPortSettings();
            reader.SetAntennaConfiguration(AntennaSetType.Power, antenna, power);
            reader.ResumeAntennaPortSettings();
        }

        //Ative/Desative antennas
        public void activeAntennas(bool port1,bool port2,bool port3,bool port4) {
            reader.SetAntennaActivate(port1, port2, port3, port4);

        }

        //Get Antenna Configuration
        public void getAntennaState()
        {
            reader.GetAntennaState();
        }

        //Get power
        public void getPower() {
            reader.GetPower();
        }

        //Reconnect Reader
        public void reconnectReader() {
            reader.Close(CloseType.ReConnect);
        }

        //Close reader
        public void closeReader() {
            reader.Close(CloseType.Close);
        }



        //Waiting Events
        private void OnReaderEvent(object sender, ReaderEventArgs e)
        {
            /*
            if (this.InvokeRequired)
            {
                this.BeginInvoke(new ReaderEventHandler(OnReaderEvent), new object[] { sender, e });
                return;
            }
            */
            switch (e.Kind)
            {
                case ReaderEventKind.Connected:
                    Console.WriteLine("connected|" + e.Message);
                    Program.connected = true;
                    break;
                case ReaderEventKind.Disconnected:
                    Console.WriteLine("disconnected|" + e.Message);
                    Program.connected = false;
                    break;
                case ReaderEventKind.timeout:
                    Console.WriteLine("timeout|" + e.Message);
                    break;
                case ReaderEventKind.AntennaState:
                    
                    String txt = Encoding.ASCII.GetString(e.Payload);
                    
                    String Type = txt.Substring(0, 1);
                    if (Type == "e")
                    {
                        int number = Convert.ToInt32(txt.Substring(1));

                        Program.port1 = (number & 0x0001) > 0;
                        Program.port2 = (number & 0x0002) > 0;
                        Program.port3 = (number & 0x0004) > 0;
                        Program.port4 = (number & 0x0008) > 0;

                        Console.WriteLine("antennastate|" + number);
                    }
                    else if (Type == "p") {
                        int power = Convert.ToInt32(txt.Substring(1));
                        Console.WriteLine("antennapower|" + power);
                    }
                    break;
                case ReaderEventKind.TagId:
                case ReaderEventKind.Buzzer:
                case ReaderEventKind.ContinueMode:
                case ReaderEventKind.QValue:
                case ReaderEventKind.Power:
                case ReaderEventKind.Session:       
                    string text = Encoding.ASCII.GetString(e.Payload);
                    string[] tagIds = text.Split(new string[] { "\r\n>" }, StringSplitOptions.RemoveEmptyEntries);
                    foreach (string tagId in tagIds)
                    {
                        Console.WriteLine("tag|" + tagId);
                    }
                    break;
                case ReaderEventKind.GetTagMemory:
                    //txtView.Text = Encoding.ASCII.GetString(e.Payload);
                    break;
                case ReaderEventKind.SetTagMemory:
                    //txtView.Text = Encoding.ASCII.GetString(e.Payload);
                    break;
            }
        }

    }
}
