using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DCRM.Common.Entity;

public partial class DealerRequest
{
    public int Id { get; set; }

    public long User_Id { get; set; }

    [Required]
    public string Company_Name { get; set; } = null!;

    [Required]
    public string OwnName_1 { get; set; } = null!;

    public string OwnName_2 { get; set; } = null!;

    [DataType(DataType.PhoneNumber)]
    [StringLength(10, MinimumLength = 10, ErrorMessage = "phone number should be minimum 10 digit")]
    [Phone]
    public string Phone1 { get; set; } = null!;
    [DataType(DataType.PhoneNumber)]
    [StringLength(10, MinimumLength = 10, ErrorMessage = "phone number should be minimum 10 digit")]
    [Phone]
    public string Phone2 { get; set; } = null!;

    [DataType(DataType.EmailAddress)]
    [EmailAddress]
    public string Email1 { get; set; } = null!;

    [DataType(DataType.EmailAddress)]
    [EmailAddress]
    public string Email2 { get; set; } = null!;

    [Required]
    public string Address_R { get; set; } = null!;

    public string Address_O { get; set; } = null!;

    [Required]
    public string City_R { get; set; } = null!;

    [Required]
    public string Zip_R { get; set; } = null!;

    [Required]
    public string Country_R { get; set; } = null!;

    public string City_O { get; set; } = null!;

    public string Zip_O { get; set; } = null!;

    public string Country_O { get; set; } = null!;

    public string? StaffName_1 { get; set; }

    public long? StaffPhone_1 { get; set; }

    public string? StaffEmail_1 { get; set; }

    public string? StaffName_2 { get; set; }

    public long? StaffPhone_2 { get; set; }

    public string? StaffEmail_2 { get; set; }

    public string? StaffName_3 { get; set; }

    public long? StaffPhone_3 { get; set; }

    public string? StaffEmail_3 { get; set; }

    public string? StaffName_4 { get; set; }

    public long? StaffPhone_4 { get; set; }

    public string? StaffEmail_4 { get; set; }

    public string Gst_Number { get; set; } = null!;

    public string Pan_Number { get; set; } = null!;

    public string? Thumb { get; set; }

    public sbyte Is_Deleted { get; set; }

    public List<DealerMaterial>? DealerMaterialList { get; set; }

    public List<DealerBankDetail>? DealerBankDetailList { get; set; }

    public DateTime Created_At { get; set; }

    public DateTime Updated_At { get; set; }
}
