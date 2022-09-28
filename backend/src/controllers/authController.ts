import express, { NextFunction, Request, Response } from "express";

export const logout = async (req: Request, res: Response) => {
  req.logout(function (err: any) {
    console.log(err);
  });
  res.redirect(`${process.env.FRONTEND_URL}`);
};

export const profile = async (req: Request, res: Response) => {
  res.send(req.user);
};

export const loginFailure = async (req: Request, res: Response) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
};

export const loginSuccess = async (req: Request, res: Response) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
    });
  }
};
