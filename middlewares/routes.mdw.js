import express from "express";
import indexRouter from '../routes/index.router.js'
import authMdw from "./auth.mdw.js";

export default function (app) {
    app.use('/',authMdw.authMiddleware, indexRouter)
}
