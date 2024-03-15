using Azure.Core;
using DCRM.Common.Dto;
using DCRM.Common.Entities;
using DCRM.Common.Entity;
using DCRM.Common.RequestModel;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;

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
        public Treatmentplans Get(int id)
        {
            return _treatmentplanRepository.Get(id);
        }

        public TreatmentplanDto Edit(long id)
        {
            return _treatmentplanRepository.Edit(id);
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
            var treatmentplans = _treatmentplanRepository.Get(request.Id);
            if (treatmentplans != null)
            {
                treatmentplans.Amount = request.Estimated_Amount;
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
                treatmentplans.Estimated_Amount = request.Estimated_Amount;
                _treatmentplanRepository.UpdateTreatmentplan(treatmentplans);
                var teethIno = _teethInfoRepository.GetAll().Where(x => x.Treatmentplans_Id == treatmentplans.Id).FirstOrDefault();
                if (teethIno != null)
                {
                    teethIno.Doc_Id = request.Doctor;
                    teethIno.Tooth_Patient_Id = request.PatientId;
                    teethIno.Type = request.Type;
                    teethIno.Teeth_Id = request.Teeth_id;
                    teethIno.Teeth_Number_Note = request.Teeth_Number_Note;
                    teethIno.Toth_Note = request.Treatment_Notes;
                    teethIno.Date = System.DateTime.UtcNow;
                    _teethInfoRepository.Update(teethIno);
                }


            }
        }
        public void UpdateSittingValue(Treatmentplans treatmentplan)
        {
            _treatmentplanRepository.UpdateSittingValue(treatmentplan);
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

            workdone.Created_At = System.DateTime.UtcNow;
            workdone.Updated_At = System.DateTime.UtcNow;
            long workDoneId = _workDoneRepository.Create(workdone);
            if (workDoneId > 0)
            {
                Payment_History payment = new()
                {
                    Workdone_Id = workDoneId,
                    Doctor_Id = workdone.Doctor_Id,
                    Patient_Id = _treatmentplanRepository.Get(workdone.Treatment_Id).Patient_Id,
                    Debit_Amount = workdone.Total_Amt,
                    Updated_At = System.DateTime.UtcNow,
                    Created_At = System.DateTime.UtcNow,
                    Description = workdone.Workdone_Notes,
                    Payment_Mode = string.Empty,
                    Balance = workdone.Total_Amt
                };
                _paymentHistoryRepository.Create(payment);
            }

        }

        public void UpdateWorkdone(Workdone_New request)
        {
            var workDone = _workDoneRepository.Get(request.Id);
            if (workDone.Id > 0)
            {
                workDone.Current_Work_Amt = request.Current_Work_Amt;
                workDone.Workdone_Status = request.Workdone_Status;
                workDone.Workdone_Notes = request.Workdone_Notes;
                workDone.Discount = request.Discount;
                workDone.Doctor_Id = request.Doctor_Id;
                workDone.Created_At = System.DateTime.UtcNow;
                workDone.Updated_At = System.DateTime.UtcNow;
                workDone.Total_Amt = request.Total_Amt;
                _workDoneRepository.Update(workDone);
                var treatment = _treatmentplanRepository.Get(workDone.Treatment_Id);
                if(treatment.Id> 0)
                {
                    treatment.Doctor = request.Doctor_Id;
                    _treatmentplanRepository.UpdateTreatmentplan(treatment);
                }
                var paymentHistory = _paymentHistoryRepository.GetAll().Where(x=>x.Patient_Id == treatment.Patient_Id && x.Workdone_Id == workDone.Id).FirstOrDefault();
                if( paymentHistory != null &&  paymentHistory.Id> 0)
                {
                    paymentHistory.Doctor_Id = request.Doctor_Id;
                    paymentHistory.Description = request.Workdone_Notes;
                    _paymentHistoryRepository.Update(paymentHistory);
                }
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



        public static List<DiagnosisDataDto> BuildTree(DiagnosisDataDto current, List<DiagnosisDataDto> allitems)
        {
            var diagnosisDataDtos = allitems.Where(c => c.Parent == current.Id).ToList();
            List<DiagnosisDataDto> childs = new();
            foreach (var item in diagnosisDataDtos)
            {
                DiagnosisDataDto childData = new()
                {
                    Id = item.Id,
                    Category = item.Category,
                    Code = item.Code,
                    Parent = item.Parent
                };
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
            List<DiagnosisDataDto> rootList = new();
            foreach (var parent in diagnosisDataList)
            {
                DiagnosisDataDto parentData = new()
                {
                    Id = parent.Id,
                    Category = parent.Category,
                    Code = parent.Code,
                    Parent = parent.Parent
                };
                rootList.Add(parentData);
            }
            List<DiagnosisDataDto> DiagnosisDataList = new();
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
            List<DiagnosisDataDto> parentList = new();

            foreach (var parent in diagnosisDataList)
            {
                DiagnosisDataDto parentData = new()
                {
                    Id = parent.Id,
                    Category = parent.Category,
                    Code = parent.Code,
                    Parent = parent.Parent
                };

                var children = _diagnosisDataRepository.GetAll().Where(x => x.Parent == parent.Id).ToList();
                List<DiagnosisDataDto> childrenList = new();
                foreach (var child in children)
                {
                    DiagnosisDataDto childData = new()
                    {
                        Id = child.Id,
                        Category = child.Category,
                        Code = child.Code,
                        Parent = child.Parent
                    };
                    var children1 = _diagnosisDataRepository.GetAll().Where(x => x.Parent == child.Id).ToList();
                    List<DiagnosisDataDto> childrenList1 = new();
                    foreach (var child1 in children1)
                    {
                        DiagnosisDataDto childData2 = new()
                        {
                            Id = child1.Id,
                            Category = child1.Category,
                            Code = child1.Code,
                            Parent = child1.Parent
                        };
                        var children2 = _diagnosisDataRepository.GetAll().Where(x => x.Parent == child1.Id).ToList();
                        List<DiagnosisDataDto> childrenList3 = new();
                        foreach (var child2 in children2)
                        {
                            DiagnosisDataDto childData3 = new()
                            {
                                Id = child2.Id,
                                Category = child2.Category,
                                Code = child2.Code,
                                Parent = child2.Parent
                            };

                            var children3 = _diagnosisDataRepository.GetAll().Where(x => x.Parent == child2.Id).ToList();
                            List<DiagnosisDataDto> childrenList4 = new();
                            foreach (var child3 in children3)
                            {
                                DiagnosisDataDto childData4 = new()
                                {
                                    Id = child3.Id,
                                    Category = child3.Category,
                                    Code = child3.Code,
                                    Parent = child3.Parent
                                };
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
            var teeths = _teethRepository.GetAll().Where(x => x.Teeth_Cat == categoryId).ToList();
            return teeths;
        }
    }
}
