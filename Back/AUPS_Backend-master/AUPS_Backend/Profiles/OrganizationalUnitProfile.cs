﻿using AUPS_Backend.DTO;
using AUPS_Backend.Models;
using AutoMapper;

namespace AUPS_Backend.Profiles
{
    public class OrganizationalUnitProfile : Profile
    {
        public OrganizationalUnitProfile()
        {
            CreateMap<OrganizationalUnit, OrganizationalUnitDTO>();
            CreateMap<OrganizationalUnitCreateDTO, OrganizationalUnit>();
            CreateMap<OrganizationalUnitUpdateDTO, OrganizationalUnit>();
        }
    }
}
