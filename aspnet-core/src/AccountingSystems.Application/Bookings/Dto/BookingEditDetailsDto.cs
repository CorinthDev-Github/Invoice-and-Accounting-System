﻿using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Text;

namespace AccountingSystems.Bookings.Dto
{
    public class BookingEditDetailsDto : FullAuditedEntity<int>, IMustHaveTenant, IPassivable
    {
        public int TenantId { get; set; }
        public bool IsActive { get; set; }
        public int BookingHeaderId { get; set; }
        public string BookingHeaderBookingCode { get; set; }
        public int ProductId { get; set; }
        public double ProductPricePerPiece { get; set; }
        public string ProductCode { get; set; }
        public string ProductItemName { get; set; }
        public int Case { get; set; }
        public int ProductCases { get; set; }
        public int Box { get; set; }
        public int ProductPieces { get; set; }
        public int Piece { get; set; }
        public int TotalPieces { get; set; }
        public decimal TotalProductPrice { get; set; }
        public decimal Gross { get; set; }
        public string Discount { get; set; }
        public decimal Net { get; set; }
    }
}
