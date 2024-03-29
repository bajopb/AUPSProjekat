﻿using AUPS_Backend.DTO;
using AUPS_Backend.Models;
using AutoMapper;

namespace AUPS_Backend.Profiles
{
    public class WarehouseProfile : Profile
    {
        public WarehouseProfile()
        {
            CreateMap<Warehouse, WarehouseDTO>();
            CreateMap<WarehouseCreateDTO, Warehouse>();
            CreateMap<WarehouseUpdateDTO, Warehouse>();
        }
    }
}
