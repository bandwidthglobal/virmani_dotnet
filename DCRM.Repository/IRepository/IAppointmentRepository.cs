using DCRM.Common.Entity;

namespace DCRM.Repository.IRepository
{
    public interface IAppointmentRepository
    {
       
        IEnumerable<Appointment> GetAll();
        Appointment Get(long id);
        long Create(Appointment appointment);
        void Update(Appointment request);   
        void Delete(long id);

        void ChangeAppointmentStatus(long id, int status);

    } 
}
