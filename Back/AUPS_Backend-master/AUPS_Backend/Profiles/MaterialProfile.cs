﻿using AUPS_Backend.DTO;
using AUPS_Backend.Models;
using AutoMapper;

namespace AUPS_Backend.Profiles
{
    public class MaterialProfile : Profile
    {
        public MaterialProfile()
        {
            CreateMap<Material, MaterialDTO>();
            CreateMap<MaterialCreateDTO, Material>();
            CreateMap<MaterialUpdateDTO, Material>();
        }
    }
}
