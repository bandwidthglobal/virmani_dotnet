using DCRM.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DCRM.Common.Entity
{
    public partial class User:BaseEntity
    {
        public int Id { get; set; }

        public int Parent_Id { get; set; }

        public string? Name { get; set; }

        public string? Bn_Name { get; set; }

        public string? Degree { get; set; }

        public string? Slug { get; set; }

        public string? Email { get; set; }

        public string? User_Name { get; set; }

        public string? Password { get; set; }

        public string? Role { get; set; }

        public string? Account_Type { get; set; }

        public string? User_Type { get; set; }

        public DateTime? Trial_Expire { get; set; }

        public string? Qr_Code { get; set; }

        public string? Phone { get; set; }

        public string? Address { get; set; }

        public int? Email_Verified { get; set; }

        public string? Verify_Code { get; set; }

        public string? Skype { get; set; }

        public string? Whatsapp { get; set; }

        public string? Facebook { get; set; }

        public string? Twitter { get; set; }

        public string? Linkedin { get; set; }

        public string? Instagram { get; set; }

        public string? Image { get; set; }

        public string? Thumb { get; set; }

        public int? Paypal_Payment { get; set; }

        public int? Stripe_Payment { get; set; }

        public string? Paypal_Email { get; set; }

        public string? Publish_Key { get; set; }

        public string? Secret_Key { get; set; }

        public string? Paystack_Payment { get; set; }

        public string? Paystack_Secret_Key { get; set; }

        public string? Paystack_Public_Key { get; set; }

        public string? Razorpay_Payment { get; set; }

        public string? Razorpay_Key_Id { get; set; }

        public string? Razorpay_Key_Secret { get; set; }

        public int? Status { get; set; }

        public int? Country { get; set; }

        public string? City { get; set; }

        public string? Currency { get; set; }

        public string? Paypal_Mode { get; set; }

        public string? About_Me { get; set; }

        public int? Exp_Years { get; set; }

        public string? Available_Days { get; set; }

        public string? Google_Analytics { get; set; }

        public int Enable_Appointment { get; set; }

        public int? Enable_Rating { get; set; }

        public string? Specialist { get; set; }

        public DateTime? Created_At { get; set; }
    }
}
