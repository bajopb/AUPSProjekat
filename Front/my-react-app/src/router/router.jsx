import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/login/login";
import AuthContext from "../context/authContext";
import { useContext } from "react";
import EmployeeList from "../components/employee/employeeList";
import OrganizationalUnitList from "../components/organizationalUnit/organizationalUnitList";
import WorkplaceList from "../components/workplace/workplaceList";
import PlantList from "../components/plant/plantList";
import MaterialList from "../components/material/materialList";
import ObjectOfLaborList from "../components/objectOfLabor/objectOfLaborList";
import ObjectOfLaborMaterialList from "../components/objectOfLaborMaterial/objectOfLaborMaterialList";
import TechnologicalSystemList from "../components/technologicalSystem/technologicalSystemList";
import TechnologicalProcedureList from "../components/technologicalProcedure/technologicalProcedureList";
import WarehouseList from "../components/warehouse/warehouseList";
import ObjectOfLaborTechnologicalProcedureList from "../components/objectOfLaborTechnicalProcedure/objectOfLaborTechnicalProcedureList";
import ProductionOrderList from "../components/productionOrder/productionOrderList";
import ProductionPlanList from "../components/productionPlan/productionPlanList";
import ObjectOfLaborInfo from "../components/objectOfLabor/objectOfLaborInfo";


const Router = () => {
    const context = useContext(AuthContext);
    
    return (  
        <Routes>
            <Route path="/" element={context.token!=null ? <EmployeeList/>:<Login />} />
            <Route path="/employees" element={context.token ? <EmployeeList/>:<Login />} />
            <Route path="/organizationalUnits" element={context.token ? <OrganizationalUnitList/>:<Login />} />
            <Route path="/workplaces" element={context.token ? <WorkplaceList/>:<Login />} />
            <Route path="/plants" element={context.token ? <PlantList/>:<Login />} />
            <Route path="/materials" element={context.token ? <MaterialList/>:<Login />} />
            <Route path="/objectsOfLabor" element={context.token ? <ObjectOfLaborList/>:<Login />} />
            <Route path="/objectsOfLaborMaterials" element={context.token ? <ObjectOfLaborMaterialList/>:<Login />} />
            <Route path="/technologicalSystems" element={context.token ? <TechnologicalSystemList/>:<Login />} />
            <Route path="/tecnologicalProcedures" element={context.token ? <TechnologicalProcedureList/>:<Login />} />
            <Route path="/warehouses" element={context.token ? <WarehouseList/>:<Login />} />
            <Route path="/objectsOfLaborTechnologicalProcedures" element={context.token ? <ObjectOfLaborTechnologicalProcedureList/>:<Login />} />
            <Route path="/productionOrders" element={context.token ? <ProductionOrderList/>:<Login />} />
            <Route path="/productionPlans" element={context.token ? <ProductionPlanList/>:<Login />} />
            <Route path="/objectOfLaborInfo/:objectOfLaborId" element={context.token ? <ObjectOfLaborInfo/>:<Login />} />
            
        </Routes>
    );
}
 
export default Router;