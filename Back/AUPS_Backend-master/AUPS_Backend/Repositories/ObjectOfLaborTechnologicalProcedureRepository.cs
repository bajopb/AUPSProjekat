﻿using AUPS_Backend.IRepo;
using AUPS_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace AUPS_Backend.Repositories
{
    public class ObjectOfLaborTechnologicalProcedureRepository : IObjectOfLaborTechnologicalProcedureRepository
    {
        private readonly AupsContext _context;

        public ObjectOfLaborTechnologicalProcedureRepository(AupsContext context)
        {
            _context = context;
        }

        public async Task<ObjectOfLaborTechnologicalProcedure> AddObjectOfLaborTechnologicalProcedure(ObjectOfLaborTechnologicalProcedure objectOfLaborTechnologicalProcedure)
        {
            objectOfLaborTechnologicalProcedure.ObjectOfLaborTechnologicalProcedureId = Guid.NewGuid();
            await _context.ObjectOfLaborTechnologicalProcedures.AddAsync(objectOfLaborTechnologicalProcedure);
            await _context.SaveChangesAsync();
            return objectOfLaborTechnologicalProcedure;
        }

        public async Task<bool> DeleteObjectOfLaborTechnologicalProcedure(Guid id)
        {
            _context.ObjectOfLaborTechnologicalProcedures
                .RemoveRange(_context.ObjectOfLaborTechnologicalProcedures
                .Where(ooltp => ooltp.ObjectOfLaborTechnologicalProcedureId == id));
            int rowsDeleted = await _context.SaveChangesAsync();
            return rowsDeleted > 0;
        }

        public async Task<List<ObjectOfLaborTechnologicalProcedure>> GetAllObjectOfLaborTechnologicalProcedures()
        {
            return await _context.ObjectOfLaborTechnologicalProcedures
                .Include("ObjectOfLabor")
                .Include("TechnologicalProcedure")
                .Include("TechnologicalProcedure.TechnologicalSystem")
                .Include("TechnologicalProcedure.OrganizationalUnit")
                .Include("TechnologicalProcedure.Plant")
                .ToListAsync();
        }

        public async Task<ObjectOfLaborTechnologicalProcedure?> GetObjectOfLaborTechnologicalProcedureById(Guid id)
        {
            return await _context.ObjectOfLaborTechnologicalProcedures
                .FirstOrDefaultAsync(ooltp => ooltp.ObjectOfLaborTechnologicalProcedureId == id);
        }

        public async Task<List<ObjectOfLaborTechnologicalProcedure>> GetObjectOfLaborTechnologicalProceduresByObjectOfLaborId(Guid objectOfLaborId)
        {
            return await _context.ObjectOfLaborTechnologicalProcedures.Where(ooltp => ooltp.ObjectOfLaborId == objectOfLaborId).ToListAsync();
        }

        public async Task<ObjectOfLaborTechnologicalProcedure> UpdateObjectOfLaborTechnologicalProcedure(ObjectOfLaborTechnologicalProcedure objectOfLaborTechnologicalProcedure)
        {
            ObjectOfLaborTechnologicalProcedure? matchingObjectOfLaborTechnologicalProcedure = await GetObjectOfLaborTechnologicalProcedureById(objectOfLaborTechnologicalProcedure.ObjectOfLaborTechnologicalProcedureId);

            if (matchingObjectOfLaborTechnologicalProcedure == null)
            {
                return objectOfLaborTechnologicalProcedure;
            }

            matchingObjectOfLaborTechnologicalProcedure.OrderOfExecution = objectOfLaborTechnologicalProcedure.OrderOfExecution;
            matchingObjectOfLaborTechnologicalProcedure.ObjectOfLaborId = objectOfLaborTechnologicalProcedure.ObjectOfLaborId;
            matchingObjectOfLaborTechnologicalProcedure.TechnologicalProcedureId = objectOfLaborTechnologicalProcedure.TechnologicalProcedureId;

            await _context.SaveChangesAsync();
            return matchingObjectOfLaborTechnologicalProcedure;
        }
    }
}
