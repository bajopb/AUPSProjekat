﻿using AUPS_Backend.DTO;
using AUPS_Backend.Models;
using AutoMapper;

namespace AUPS_Backend.Profiles
{
    public class PlantProfile : Profile
    {
        public PlantProfile()
        {
            CreateMap<Plant, PlantDTO>();
            CreateMap<PlantCreateDTO, Plant>();
            CreateMap<PlantUpdateDTO, Plant>();
        }
    }
}
