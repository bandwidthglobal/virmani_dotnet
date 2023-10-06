using DCRM.Repository.Database;
using DCRM.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Repository.Repository
{
    public class FileRepository:IFileRepository
    {
        public readonly DCRMDBContext _contex;
        public FileRepository(DCRMDBContext contex)
        {
            _contex = contex;
        }
        public void UpdateFileUrl(long id, string url, string type)
        {
            if (type == "patient") {
                var patient=_contex.Patientses.Where(x=>x.Id == id).FirstOrDefault();
                patient.Thumb = url;
                if (patient != null)
                {
                    _contex.Patientses.Update(patient);
                    _contex.SaveChanges();
                }
            }
            else if (type == "dealer")
            {
                var dealer = _contex.Dealers.Where(x => x.Id == id).FirstOrDefault();
                dealer.Image = url;
                if (dealer != null)
                {
                    _contex.Dealers.Update(dealer);
                    _contex.SaveChanges();
                }
            }
        }
    }
}
