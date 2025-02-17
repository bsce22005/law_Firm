"use server";

import { Types } from "mongoose";
import Attorneys from "../models/Attorneys";

interface AttorneyData {
    name: string;
    [key: string]: any; // Allows additional properties
}

export async function addAttorneys(data: AttorneyData): Promise<AttorneyData> {
    const exist = await Attorneys.findOne({ name: data.name });
    if (exist) {
        throw new Error("Attorney already exists");
    }
    
    const added = await Attorneys.create(data);
    return JSON.parse(JSON.stringify(added));
}

export async function getAttorneys(): Promise<AttorneyData[]> {
    const attorneys = await Attorneys.find();
    return JSON.parse(JSON.stringify(attorneys));
}

export async function getAttorneysById(id: Types.ObjectId): Promise<AttorneyData | null> {
    const attorney = await Attorneys.findById(id);
    return attorney ? JSON.parse(JSON.stringify(attorney)) : null;
}
