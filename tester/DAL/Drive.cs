//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class Drive
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Drive()
        {
            this.WaitingMessages = new HashSet<WaitingMessages>();
        }
    
        public int driveCode { get; set; }
        public string driverCode { get; set; }
        public string customerCode { get; set; }
        public System.TimeSpan drivingTime { get; set; }
        public System.DateTime travelDate { get; set; }
        public int fromLocation { get; set; }
        public int toLocation { get; set; }
<<<<<<< HEAD
        public string describeDrive { get; set; }
        public Nullable<bool> status { get; set; }
        public int transportation { get; set; }
        public Nullable<int> price { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WaitingMessages> WaitingMessages { get; set; }
=======
        public int packageSizeCode { get; set; }
        public Nullable<System.TimeSpan> howLongBeforeReminder { get; set; }
        public string transportation { get; set; }
        public string describeDrive { get; set; }
        public bool confirmationCustomer { get; set; }
    
        public virtual Loction Loction { get; set; }
        public virtual Loction Loction1 { get; set; }
        public virtual User User { get; set; }
        public virtual User User1 { get; set; }
>>>>>>> 707e59e777cf3c9a9d6fbbd95c355d6f8e4f4e01
    }
}
