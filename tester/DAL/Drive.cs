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
        public int driveCode { get; set; }
        public string userCode { get; set; }
        public System.TimeSpan drivingTime { get; set; }
        public System.DateTime travelDate { get; set; }
        public string fromLocation { get; set; }
        public string toLocation { get; set; }
        public string readinessForChanges { get; set; }
        public int packageSizeCode { get; set; }
        public Nullable<System.TimeSpan> howLongBeforeReminder { get; set; }
        public string transportation { get; set; }
    
        public virtual User User { get; set; }
    }
}
