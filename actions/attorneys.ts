"use server";

import Attorneys from "../models/Attorneys";

export async function addAttorneys(data) 
{
    const exist = await Attorneys.findOne({"name": data.name});
    if(exist)
    {
        throw new Error("Attorney already exist");
    }
    else{
    const added=await Attorneys.create(data);
    if(added)
    {
        return JSON.parse(JSON.stringify(added));
    }
    }
}

export async function getAttorneys()
{
    const attorneys = await Attorneys.find();
    if(attorneys)
    {
        return JSON.parse(JSON.stringify(attorneys));
    }
}

export async function getAttorneysbyId(id)
{
    const attorney = await Attorneys.findById(id);
    if(attorney)
    {
        return JSON.parse(JSON.stringify(attorney));
    }
}