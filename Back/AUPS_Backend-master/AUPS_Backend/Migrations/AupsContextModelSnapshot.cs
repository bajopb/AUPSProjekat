﻿// <auto-generated />
using System;
using AUPS_Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AUPS_Backend.Migrations
{
    [DbContext(typeof(AupsContext))]
    partial class AupsContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("AUPS_Backend.Entities.Employee", b =>
                {
                    b.Property<Guid>("EmployeeId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("employee_id");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("address");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("city");

                    b.Property<DateTime>("DateOfEmployment")
                        .HasColumnType("date")
                        .HasColumnName("date_of_employment");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("email");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("first_name");

                    b.Property<string>("Jmbg")
                        .IsRequired()
                        .HasMaxLength(13)
                        .HasColumnType("nvarchar(13)")
                        .HasColumnName("jmbg");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("last_name");

                    b.Property<Guid>("OrganizationalUnitId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("organizational_unit_id");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)")
                        .HasColumnName("phone_number");

                    b.Property<decimal>("Sallary")
                        .HasColumnType("numeric(10, 2)")
                        .HasColumnName("sallary");

                    b.Property<Guid>("WorkplaceId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("workplace_id");

                    b.HasKey("EmployeeId")
                        .HasName("PK__employee__C52E0BA822845859");

                    b.HasIndex("OrganizationalUnitId");

                    b.HasIndex("WorkplaceId");

                    b.HasIndex(new[] { "Jmbg" }, "UQ__employee__8C39FC6751DCDFA0")
                        .IsUnique();

                    b.HasIndex(new[] { "Email" }, "UQ__employee__AB6E61644279CDEF")
                        .IsUnique();

                    b.ToTable("employee");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.Material", b =>
                {
                    b.Property<Guid>("MaterialId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("material_id");

                    b.Property<string>("MaterialName")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)")
                        .HasColumnName("material_name");

                    b.Property<int>("StockQuantity")
                        .HasColumnType("int")
                        .HasColumnName("stock_quantity");

                    b.HasKey("MaterialId")
                        .HasName("PK__material__734FE6BF2BC6D112");

                    b.ToTable("material");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.ObjectOfLabor", b =>
                {
                    b.Property<Guid>("ObjectOfLaborId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("object_of_labor_id");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("description");

                    b.Property<string>("ObjectOfLaborName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("object_of_labor_name");

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric(10, 2)")
                        .HasColumnName("price");

                    b.Property<int>("StockQuantity")
                        .HasColumnType("int")
                        .HasColumnName("stock_quantity");

                    b.Property<Guid>("WarehouseId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("warehouse_id");

                    b.HasKey("ObjectOfLaborId")
                        .HasName("PK__object_o__132DFBC9BD6DAD16");

                    b.HasIndex("WarehouseId");

                    b.HasIndex(new[] { "ObjectOfLaborName" }, "UQ__object_o__55DFE956C20F1A1C")
                        .IsUnique();

                    b.ToTable("object_of_labor");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.ObjectOfLaborMaterial", b =>
                {
                    b.Property<Guid>("ObjectOfLaborMaterialId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("object_of_labor_material_id");

                    b.Property<Guid>("MaterialId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("material_id");

                    b.Property<Guid>("ObjectOfLaborId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("object_of_labor_id");

                    b.Property<int>("Quantity")
                        .HasColumnType("int")
                        .HasColumnName("quantity");

                    b.HasKey("ObjectOfLaborMaterialId")
                        .HasName("PK__object_o__7D4DF5F1514A3214");

                    b.HasIndex("MaterialId");

                    b.HasIndex("ObjectOfLaborId");

                    b.ToTable("object_of_labor_material");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.ObjectOfLaborTechnologicalProcedure", b =>
                {
                    b.Property<Guid>("ObjectOfLaborTechnologicalProcedureId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("object_of_labor_technological_procedure_id");

                    b.Property<Guid>("ObjectOfLaborId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("object_of_labor_id");

                    b.Property<int>("OrderOfExecution")
                        .HasColumnType("int")
                        .HasColumnName("order_of_execution");

                    b.Property<Guid>("TechnologicalProcedureId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("technological_procedure_id");

                    b.HasKey("ObjectOfLaborTechnologicalProcedureId")
                        .HasName("PK__object_o__7D4DF5F1514AE950");

                    b.HasIndex("ObjectOfLaborId");

                    b.HasIndex("TechnologicalProcedureId");

                    b.ToTable("object_of_labor_technological_procedure");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.OrganizationalUnit", b =>
                {
                    b.Property<Guid>("OrganizationalUnitId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("organizational_unit_id");

                    b.Property<string>("OrganizationalUnitName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("organizational_unit_name");

                    b.HasKey("OrganizationalUnitId")
                        .HasName("PK__organiza__21A883E2A0413E58");

                    b.HasIndex(new[] { "OrganizationalUnitName" }, "UQ__organiza__723090DBF6D2E546")
                        .IsUnique();

                    b.ToTable("organizational_unit");

                    b.HasData(
                        new
                        {
                            OrganizationalUnitId = new Guid("256e2761-b05b-4404-8b44-b463ed2a2e83"),
                            OrganizationalUnitName = "Administracija"
                        });
                });

            modelBuilder.Entity("AUPS_Backend.Entities.Plant", b =>
                {
                    b.Property<Guid>("PlantId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("plant_id");

                    b.Property<string>("PlantName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("plant_name");

                    b.HasKey("PlantId")
                        .HasName("PK__plant__A576B3B4F4CF2CC4");

                    b.HasIndex(new[] { "PlantName" }, "UQ__plant__2D642453AF980F6C")
                        .IsUnique();

                    b.ToTable("plant");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.ProductionOrder", b =>
                {
                    b.Property<Guid>("ProductionOrderId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("production_order_id");

                    b.Property<int>("CurrentTechnologicalProcedure")
                        .HasColumnType("int")
                        .HasColumnName("current_technological_procedure");

                    b.Property<bool>("CurrentTechnologicalProcedureExecuted")
                        .HasColumnType("bit")
                        .HasColumnName("current_technological_procedure_executed");

                    b.Property<Guid>("EmployeeId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("employee_id");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("date")
                        .HasColumnName("end_date");

                    b.Property<string>("Note")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("note");

                    b.Property<Guid>("ObjectOfLaborId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("object_of_labor_id");

                    b.Property<int>("Quantity")
                        .HasColumnType("int")
                        .HasColumnName("quantity");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("date")
                        .HasColumnName("start_date");

                    b.HasKey("ProductionOrderId")
                        .HasName("PK__producti__C099D22FCF047D9B");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("ObjectOfLaborId");

                    b.ToTable("production_order");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.ProductionPlan", b =>
                {
                    b.Property<Guid>("ProductionPlanId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("production_plan_id");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("description");

                    b.Property<Guid>("ObjectOfLaborId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("object_of_labor_id");

                    b.Property<string>("ProductionPlanName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("production_plan_name");

                    b.HasKey("ProductionPlanId")
                        .HasName("PK__producti__F3E379D5CD0F2289");

                    b.HasIndex("ObjectOfLaborId");

                    b.ToTable("production_plan");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.TechnologicalProcedure", b =>
                {
                    b.Property<Guid>("TechnologicalProcedureId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("technological_procedure_id");

                    b.Property<int>("Duration")
                        .HasColumnType("int")
                        .HasColumnName("duration");

                    b.Property<Guid>("OrganizationalUnitId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("organizational_unit_id");

                    b.Property<Guid>("PlantId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("plant_id");

                    b.Property<string>("TechnologicalProcedureName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("technological_procedure_name");

                    b.Property<Guid>("TechnologicalSystemId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("technological_system_id");

                    b.HasKey("TechnologicalProcedureId")
                        .HasName("PK__technolo__2192D019DFA30232");

                    b.HasIndex("OrganizationalUnitId");

                    b.HasIndex("PlantId");

                    b.HasIndex("TechnologicalSystemId");

                    b.HasIndex(new[] { "TechnologicalProcedureName" }, "UQ__technolo__07C953C8CB22F26E")
                        .IsUnique();

                    b.ToTable("technological_procedure");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.TechnologicalSystem", b =>
                {
                    b.Property<Guid>("TechnologicalSystemId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("technological_system_id");

                    b.Property<string>("TechnologicalSystemName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("technological_system_name");

                    b.HasKey("TechnologicalSystemId")
                        .HasName("PK__technolo__823480177CF18B5F");

                    b.HasIndex(new[] { "TechnologicalSystemName" }, "UQ__technolo__F6E71529B53D3E02")
                        .IsUnique();

                    b.ToTable("technological_system");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.Warehouse", b =>
                {
                    b.Property<Guid>("WarehouseId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("warehouse_id");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("address");

                    b.Property<int>("Capacity")
                        .HasColumnType("int")
                        .HasColumnName("capacity");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("city");

                    b.HasKey("WarehouseId")
                        .HasName("PK__warehous__734FE6BF2BC6D417");

                    b.ToTable("warehouse");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.Workplace", b =>
                {
                    b.Property<Guid>("WorkplaceId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("workplace_id");

                    b.Property<string>("WorkplaceName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("workplace_name");

                    b.HasKey("WorkplaceId")
                        .HasName("PK__workplac__8E6F41E728F334B9");

                    b.HasIndex(new[] { "WorkplaceName" }, "UQ__workplac__F9F5552C94E5B3AF")
                        .IsUnique();

                    b.ToTable("workplace");

                    b.HasData(
                        new
                        {
                            WorkplaceId = new Guid("6039d269-cff0-4471-8ce6-462d5712e78f"),
                            WorkplaceName = "Admin"
                        },
                        new
                        {
                            WorkplaceId = new Guid("1e3f19e6-d318-4e2a-a294-7d8af9b58952"),
                            WorkplaceName = "Menadzer"
                        },
                        new
                        {
                            WorkplaceId = new Guid("8bafd265-7f83-4f19-adae-43ed986a517a"),
                            WorkplaceName = "Radnik u proizvodnji"
                        });
                });

            modelBuilder.Entity("AUPS_Backend.Identity.ApplicationRole", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("AUPS_Backend.Identity.ApplicationUser", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PersonName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<System.Guid>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<System.Guid>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<System.Guid>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<System.Guid>", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<System.Guid>", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("AUPS_Backend.Entities.Employee", b =>
                {
                    b.HasOne("AUPS_Backend.Entities.OrganizationalUnit", "OrganizationalUnit")
                        .WithMany("Employees")
                        .HasForeignKey("OrganizationalUnitId")
                        .IsRequired()
                        .HasConstraintName("FK__employee__organi__39987BE6");

                    b.HasOne("AUPS_Backend.Entities.Workplace", "Workplace")
                        .WithMany("Employees")
                        .HasForeignKey("WorkplaceId")
                        .IsRequired()
                        .HasConstraintName("FK__employee__workpl__38A457AD");

                    b.Navigation("OrganizationalUnit");

                    b.Navigation("Workplace");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.ObjectOfLabor", b =>
                {
                    b.HasOne("AUPS_Backend.Entities.Warehouse", "Warehouse")
                        .WithMany("ObjectOfLabors")
                        .HasForeignKey("WarehouseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__object_of__wareh__3F51553C");

                    b.Navigation("Warehouse");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.ObjectOfLaborMaterial", b =>
                {
                    b.HasOne("AUPS_Backend.Entities.Material", "Material")
                        .WithMany("ObjectOfLaborMaterials")
                        .HasForeignKey("MaterialId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__object_of__techn__55409A43");

                    b.HasOne("AUPS_Backend.Entities.ObjectOfLabor", "ObjectOfLabor")
                        .WithMany("ObjectOfLaborMaterials")
                        .HasForeignKey("ObjectOfLaborId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__object_of__objec__544C7345");

                    b.Navigation("Material");

                    b.Navigation("ObjectOfLabor");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.ObjectOfLaborTechnologicalProcedure", b =>
                {
                    b.HasOne("AUPS_Backend.Entities.ObjectOfLabor", "ObjectOfLabor")
                        .WithMany("ObjectOfLaborTechnologicalProcedures")
                        .HasForeignKey("ObjectOfLaborId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__object_of__objec__544C7222");

                    b.HasOne("AUPS_Backend.Entities.TechnologicalProcedure", "TechnologicalProcedure")
                        .WithMany("ObjectOfLaborTechnologicalProcedures")
                        .HasForeignKey("TechnologicalProcedureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__object_of__techn__5540965B");

                    b.Navigation("ObjectOfLabor");

                    b.Navigation("TechnologicalProcedure");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.ProductionOrder", b =>
                {
                    b.HasOne("AUPS_Backend.Entities.Employee", "Employee")
                        .WithMany("ProductionOrders")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__productio__emplo__422DC1E7");

                    b.HasOne("AUPS_Backend.Entities.ObjectOfLabor", "ObjectOfLabor")
                        .WithMany("ProductionOrders")
                        .HasForeignKey("ObjectOfLaborId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__productio__objec__4321E620");

                    b.Navigation("Employee");

                    b.Navigation("ObjectOfLabor");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.ProductionPlan", b =>
                {
                    b.HasOne("AUPS_Backend.Entities.ObjectOfLabor", "ObjectOfLabor")
                        .WithMany("ProductionPlans")
                        .HasForeignKey("ObjectOfLaborId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__productio__objec__45FE52CB");

                    b.Navigation("ObjectOfLabor");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.TechnologicalProcedure", b =>
                {
                    b.HasOne("AUPS_Backend.Entities.OrganizationalUnit", "OrganizationalUnit")
                        .WithMany("TechnologicalProcedures")
                        .HasForeignKey("OrganizationalUnitId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__technolog__organ__4F87BD05");

                    b.HasOne("AUPS_Backend.Entities.Plant", "Plant")
                        .WithMany("TechnologicalProcedures")
                        .HasForeignKey("PlantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__technolog__plant__507BE13E");

                    b.HasOne("AUPS_Backend.Entities.TechnologicalSystem", "TechnologicalSystem")
                        .WithMany("TechnologicalProcedures")
                        .HasForeignKey("TechnologicalSystemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK__technolog__techn__51700577");

                    b.Navigation("OrganizationalUnit");

                    b.Navigation("Plant");

                    b.Navigation("TechnologicalSystem");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<System.Guid>", b =>
                {
                    b.HasOne("AUPS_Backend.Identity.ApplicationRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<System.Guid>", b =>
                {
                    b.HasOne("AUPS_Backend.Identity.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<System.Guid>", b =>
                {
                    b.HasOne("AUPS_Backend.Identity.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<System.Guid>", b =>
                {
                    b.HasOne("AUPS_Backend.Identity.ApplicationRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AUPS_Backend.Identity.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<System.Guid>", b =>
                {
                    b.HasOne("AUPS_Backend.Identity.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AUPS_Backend.Entities.Employee", b =>
                {
                    b.Navigation("ProductionOrders");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.Material", b =>
                {
                    b.Navigation("ObjectOfLaborMaterials");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.ObjectOfLabor", b =>
                {
                    b.Navigation("ObjectOfLaborMaterials");

                    b.Navigation("ObjectOfLaborTechnologicalProcedures");

                    b.Navigation("ProductionOrders");

                    b.Navigation("ProductionPlans");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.OrganizationalUnit", b =>
                {
                    b.Navigation("Employees");

                    b.Navigation("TechnologicalProcedures");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.Plant", b =>
                {
                    b.Navigation("TechnologicalProcedures");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.TechnologicalProcedure", b =>
                {
                    b.Navigation("ObjectOfLaborTechnologicalProcedures");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.TechnologicalSystem", b =>
                {
                    b.Navigation("TechnologicalProcedures");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.Warehouse", b =>
                {
                    b.Navigation("ObjectOfLabors");
                });

            modelBuilder.Entity("AUPS_Backend.Entities.Workplace", b =>
                {
                    b.Navigation("Employees");
                });
#pragma warning restore 612, 618
        }
    }
}
