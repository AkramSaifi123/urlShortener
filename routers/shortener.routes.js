
import { Router } from "express";
import { postUrlShortener, getShortnerPage, redirectToShorLink } from "../controllers/postshortener.controller.js";



export const router = Router();


router.get("/", getShortnerPage);

router.post("/", postUrlShortener)



router.get("/:shortCode", redirectToShorLink);
