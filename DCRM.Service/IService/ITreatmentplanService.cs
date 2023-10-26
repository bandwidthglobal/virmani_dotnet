using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.RequestModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface ITreatmentplanService
    {
        List<Treatmentplans> GetAll(int patientId);

        Treatmentplans GetById(int id);

        long Create(TreatmentplanRequest request);

        void Update(TreatmentplanRequest request);

        void Delete(long id);

        void CreateWorkDone(Workdone_New workdone);


        List<TeethCategory> GetTeethCategories();

        List<Teeth> GetTeeths();

        List<DiagnosisDataDto> GetDiagnosisData();

        List<Teeth> GetTeethsByCategory(int categoryId);
    }
}
