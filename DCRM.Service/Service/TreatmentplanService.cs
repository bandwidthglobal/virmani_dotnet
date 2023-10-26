using DCRM.Common.Dto;
using DCRM.Common.Entities;
using DCRM.Common.Entity;
using DCRM.Common.RequestModel;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.Service
{
    public class TreatmentplanService : ITreatmentplanService
    {
        public readonly ITreatmentplanRepository _treatmentplanRepository;
        public readonly IRepository<Workdone_New> _workDoneRepository;
        public readonly IRepository<Payment_History> _paymentHistoryRepository;
        public readonly IRepository<Teethinfo> _teethInfoRepository;
        public readonly IRepository<Teeth> _teethRepository;
        public readonly IRepository<TeethCategory> _teethCatRepository;
        public readonly IRepository<DiagnosisData> _diagnosisDataRepository;
        public TreatmentplanService(ITreatmentplanRepository treatmentplanRepository
            , IRepository<Workdone_New> workDoneRepository, IRepository<Payment_History> paymentHistoryRepository,
            IRepository<Teethinfo> teethInfoRepository, IRepository<Teeth> teethRepository, IRepository<TeethCategory> teethCatRepository, IRepository<DiagnosisData> diagnosisDataRepository)
        {
            _treatmentplanRepository = treatmentplanRepository;
            _workDoneRepository = workDoneRepository;
            _teethInfoRepository = teethInfoRepository;
            _teethRepository = teethRepository;
            _teethCatRepository = teethCatRepository;
            _paymentHistoryRepository = paymentHistoryRepository;
            _diagnosisDataRepository = diagnosisDataRepository;

        }


        /// <summary>
        /// get all treatment by patient
        /// </summary>
        /// <param name="patientId"></param>
        /// <returns></returns>
        public List<Treatmentplans> GetAll(int patientId)
        {
            return _treatmentplanRepository.GetAll(patientId);
        }

        /// <summary>
        /// get treatment by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Treatmentplans GetById(int id)
        {
            return _treatmentplanRepository.GetById(id);
        }
        /// <summary>
        /// create treementplan
        /// </summary>
        /// <param name="request"></param>
        /// <exception cref="Exception"></exception>
        public long Create(TreatmentplanRequest request)
        {
            int id = _treatmentplanRepository.Create(request);
            return id;
        }
        /// <summary>
        /// update treatment
        /// </summary>
        /// <param name="request"></param>
        public void Update(TreatmentplanRequest request)
        {
            var treatmentplans = _treatmentplanRepository.GetById(request.Id);
            if (treatmentplans != null)
            {
                treatmentplans.Amount = request.Amount;
                treatmentplans.Courtesy = request.Courtesy;
                treatmentplans.Treatment_Status = request.TreatmentStatus;
                treatmentplans.Sitting_Status = request.SittingStatus;
                treatmentplans.Doctor = request.Doctor;
                treatmentplans.Patient_Id = request.PatientId;
                treatmentplans.Date = request.Date;
                treatmentplans.Job_Id = request.JobId;
                treatmentplans.Job = request.Job;
                treatmentplans.Status = request.Status;
                treatmentplans.Completed_Date = request.CompletedDate;
                treatmentplans.Updated_At = System.DateTime.UtcNow;
                treatmentplans.Individual_Tooth_Wrk = request.IndividualToothWrk;
                treatmentplans.Print_Tooth_Name = request.PrintToothName;
                _treatmentplanRepository.UpdateTreatmentplan(treatmentplans);
                var teethIno = _teethInfoRepository.GetAll().Where(x => x.Treatmentplans_Id == treatmentplans.Id).FirstOrDefault();
                if (teethIno != null)
                {
                    teethIno.Doc_Id = request.Doctor;
                    teethIno.Tooth_Patient_Id = request.PatientId;
                    teethIno.Type = request.Type;
                    teethIno.Teeth_Id = request.Teeth_id;
                    teethIno.Teeth_Number_Note = request.Teeth_Number_Note;
                    teethIno.Toth_Note = request.Toth_Note;
                    teethIno.Date = System.DateTime.UtcNow;
                    _teethInfoRepository.Update(teethIno);
                }


            }
        }

        /// <summary>
        /// delete treatment
        /// </summary>
        /// <param name="id"></param>
        /// <exception cref="NotImplementedException"></exception>
        public void Delete(long id)
        {
            _treatmentplanRepository.Delete(id);
        }

        /// <summary>
        /// create work done for treatment
        /// </summary>
        /// <param name="workdone"></param>
        public void CreateWorkDone(Workdone_New workdone)
        {
            long workdoneId = _workDoneRepository.Create(workdone);
            var treatment = _treatmentplanRepository.GetById(workdone.Treatment_Id);
            if (treatment != null && workdone.Id > 0)
            {
                //Insert Data in payment as debit
                Payment_History paymentHistory = new Payment_History();
                paymentHistory.Workdone_Id = workdone.Id;
                paymentHistory.Doctor_Id = treatment.Doctor;
                paymentHistory.Patient_Id = treatment.Patient_Id;
                paymentHistory.Debit_Amount = workdone.Total_Amt;
                paymentHistory.Credit_Amount = 0;
                paymentHistory.Balance = workdone.Total_Amt;
                paymentHistory.Amount_Type = 1;
                paymentHistory.Description = "patient bill";
                paymentHistory.Payment_Mode = "";
                paymentHistory.Created_At = DateTime.UtcNow;
                paymentHistory.Updated_At = DateTime.UtcNow;
                _paymentHistoryRepository.Insert(paymentHistory);

                //Update Treatment Status
                treatment.Status = workdone.Workdone_Status;
                treatment.Updated_At = System.DateTime.UtcNow;
                _treatmentplanRepository.UpdateTreatmentplan(treatment);

            }
        }


        public List<TeethCategory> GetTeethCategories()
        {
            var teethCategory = _teethCatRepository.GetAll().ToList();
            return teethCategory;
        }
        public List<Teeth> GetTeeths()
        {
            var teeths = _teethRepository.GetAll().ToList();
            return teeths;
        }



        public List<DiagnosisDataDto> BuildTree(DiagnosisDataDto current, List<DiagnosisDataDto> allitems)
        {
            var diagnosisDataDtos = allitems.Where(c => c.Parent == current.Id).ToList();
            List<DiagnosisDataDto> childs = new List<DiagnosisDataDto>();
            foreach (var item in diagnosisDataDtos)
            {
                DiagnosisDataDto childData = new DiagnosisDataDto();
                childData.Id = item.Id;
                childData.Category = item.Category;
                childData.Code = item.Code;
                childData.Parent = item.Parent;
                childs.Add(childData);
            }

            foreach (DiagnosisDataDto child in childs)
            {
                child.Children = BuildTree(child, allitems);
            }
            current.Children = childs;
            return childs;
        }

        public List<DiagnosisDataDto> GetDiagnosisData()
        {
            var diagnosisDataList = _diagnosisDataRepository.GetAll().ToList();
            List<DiagnosisDataDto> rootList = new List<DiagnosisDataDto>();
            foreach (var parent in diagnosisDataList)
            {
                DiagnosisDataDto parentData = new DiagnosisDataDto();
                parentData.Id = parent.Id;
                parentData.Category = parent.Category;
                parentData.Code = parent.Code;
                parentData.Parent = parent.Parent;
                rootList.Add(parentData);
            }
            List<DiagnosisDataDto> DiagnosisDataList = new List<DiagnosisDataDto>();
            foreach (var item in rootList.Where(x => x.Parent == 0))
            {
                item.Children = BuildTree(item, rootList);
                DiagnosisDataList.Add(item);
            }
            return DiagnosisDataList;
        }

        public List<DiagnosisDataDto> GetDiagnosisDataOld()
        {
            var diagnosisDataList = _diagnosisDataRepository.GetAll().Where(x => x.Parent == 0).ToList();
            List<DiagnosisDataDto> parentList = new List<DiagnosisDataDto>();

            foreach (var parent in diagnosisDataList)
            {
                DiagnosisDataDto parentData = new DiagnosisDataDto();
                parentData.Id = parent.Id;
                parentData.Category = parent.Category;
                parentData.Code = parent.Code;
                parentData.Parent = parent.Parent;

                var children = _diagnosisDataRepository.GetAll().Where(x => x.Parent == parent.Id).ToList();
                List<DiagnosisDataDto> childrenList = new List<DiagnosisDataDto>();
                foreach (var child in children)
                {
                    DiagnosisDataDto childData = new DiagnosisDataDto();
                    childData.Id = child.Id;
                    childData.Category = child.Category;
                    childData.Code = child.Code;
                    childData.Parent = child.Parent;
                    var children1 = _diagnosisDataRepository.GetAll().Where(x => x.Parent == child.Id).ToList();
                    List<DiagnosisDataDto> childrenList1 = new List<DiagnosisDataDto>();
                    foreach (var child1 in children1)
                    {
                        DiagnosisDataDto childData2 = new DiagnosisDataDto();
                        childData2.Id = child1.Id;
                        childData2.Category = child1.Category;
                        childData2.Code = child1.Code;
                        childData2.Parent = child1.Parent;
                        var children2 = _diagnosisDataRepository.GetAll().Where(x => x.Parent == child1.Id).ToList();
                        List<DiagnosisDataDto> childrenList3 = new List<DiagnosisDataDto>();
                        foreach (var child2 in children2)
                        {
                            DiagnosisDataDto childData3 = new DiagnosisDataDto();
                            childData3.Id = child2.Id;
                            childData3.Category = child2.Category;
                            childData3.Code = child2.Code;
                            childData3.Parent = child2.Parent;

                            var children3 = _diagnosisDataRepository.GetAll().Where(x => x.Parent == child2.Id).ToList();
                            List<DiagnosisDataDto> childrenList4 = new List<DiagnosisDataDto>();
                            foreach (var child3 in children3)
                            {
                                DiagnosisDataDto childData4 = new DiagnosisDataDto();
                                childData4.Id = child3.Id;
                                childData4.Category = child3.Category;
                                childData4.Code = child3.Code;
                                childData4.Parent = child3.Parent;
                                childrenList4.Add(childData4);
                            }
                            childData3.Children = childrenList4;
                            childrenList3.Add(childData3);
                        }

                        childData2.Children = childrenList3;
                        childrenList1.Add(childData2);
                    }
                    childData.Children = childrenList1;
                    childrenList.Add(childData);
                }
                parentData.Children = childrenList;
                parentList.Add(parentData);
            }
            return parentList;
        }

        public List<Teeth> GetTeethsByCategory(int categoryId)
        {
            var teeths = _teethRepository.GetAll().Where(x=>x.Teeth_Cat== categoryId).ToList();
            return teeths;
        }
    }
}
