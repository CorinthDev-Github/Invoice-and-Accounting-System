﻿using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AccountingSystems.Suppliers.Dto
{
    public class SupplierEditDto : EntityDto<int>, IMustHaveTenant
    {
        public int TenantId { get; set; }

        [Required]
        public virtual string Code { get; set; }

        [Required]
        public virtual string Name { get; set; }

        public virtual string Address { get; set; }

        public virtual string Telephone { get; set; }
    }
}
