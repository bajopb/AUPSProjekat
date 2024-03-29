﻿using AUPS_Backend.DTO;
using AUPS_Backend.Models;
using AutoMapper;

namespace AUPS_Backend.Profiles
{
    public class TechnologicalSystemProfile : Profile
    {
        public TechnologicalSystemProfile()
        {
            CreateMap<TechnologicalSystem, TechnologicalSystemDTO>();
            CreateMap<TechnologicalSystemCreateDTO, TechnologicalSystem>();
            CreateMap<TechnologicalSystemUpdateDTO, TechnologicalSystem>();
        }
    }
}
