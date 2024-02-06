import React from "react";
import ObjectOfLaborMaterialList from "../objectOfLaborMaterial/objectOfLaborMaterialList";
import ObjectOfLaborTechnologicalProcedureList from "../objectOfLaborTechnicalProcedure/objectOfLaborTechnicalProcedureList";
import { useParams } from "react-router-dom";


const ObjectOfLaborInfo=()=>{
    const { objectOfLaborId } = useParams();
    return(
        <>
            <ObjectOfLaborMaterialList objectOfLaborId={objectOfLaborId}/>
            <ObjectOfLaborTechnologicalProcedureList objectOfLaborId={objectOfLaborId}/>
        </>
    );
};


export default ObjectOfLaborInfo;