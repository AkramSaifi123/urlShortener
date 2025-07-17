import crypto from "crypto";
// import { readFile } from "fs/promises";
// import path from "path";
import { loadLinks, saveLinks } from "../models/shortener.model.js";


export const postUrlShortener = async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
    const links = await loadLinks();
    if (links[finalShortCode]) {
      return res
        .status(404)
        .send("short code already exists. Please choose another");
    }

    links[finalShortCode] = url;
    await saveLinks(links);
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server error");
  }
};


export const getShortnerPage =  async (req, res) => {
  try {
    // const file = await readFile(path.join("views", "index.html"));
    const links = await loadLinks();
    return res.render("index", {links, hosts: req.host})
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server error");
  }
}

export const redirectToShorLink = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const links = await loadLinks();

    if (!links[shortCode]) return res.status(404).send("404 error occured");
    return res.redirect(links[shortCode]);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}