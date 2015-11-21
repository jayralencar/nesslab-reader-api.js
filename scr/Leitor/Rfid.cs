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

        public void initRead(){
            reader.ReadTagId(TagType.ISO18000_6C_GEN2, ReadType.Multi);
            Console.WriteLine("status|initread");
        }

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
                    break;
                case ReaderEventKind.Disconnected:
                    Console.WriteLine("disconnected|" + e.Message);
                    break;
                case ReaderEventKind.timeout:
                    Console.WriteLine("timeout|" + e.Message);
                    break;
                case ReaderEventKind.TagId:
                case ReaderEventKind.Buzzer:
                case ReaderEventKind.ContinueMode:
                case ReaderEventKind.QValue:
                case ReaderEventKind.Power:
                case ReaderEventKind.Session:
                case ReaderEventKind.AntennaState:
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
