﻿using Abp.AutoMapper;
using AccountingSystems.Suppliers.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccountingSystems.Web.Models.Suppliers
{
    [AutoMapFrom(typeof(GetSupplierNameOutput))]
    public class GetSupplierNameViewModel : GetSupplierNameOutput
    {
    }
}
