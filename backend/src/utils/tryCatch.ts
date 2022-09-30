import express, { NextFunction, Request, Response } from "express";

const tryCatch = async (controller: any) => {
    try{
await controller(req: Request, res: Response)
    }catch(err){
        return next(err);
    }
};
