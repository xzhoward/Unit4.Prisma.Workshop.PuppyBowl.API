const express = require("express");
const router = express.Router();
const prisma = require("../prisma");


router.get("/", async (req, res) => {
  try {
    const players = await prisma.player.findMany();
    res.json({ success: true, data: players });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const player = await prisma.player.findUnique({ where: { id } });
    if (!player) {
      return res.status(404).json({ success: false, error: "Player not found" });
    }
    res.json({ success: true, data: player });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


router.post("/", async (req, res) => {
  const { name, breed, status, imageUrl, teamId } = req.body;
  try {
    const newPlayer = await prisma.player.create({
      data: { name, breed, status, imageUrl, teamId },
    });
    res.status(201).json({ success: true, data: newPlayer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  try {
    const updatedPlayer = await prisma.player.update({
      where: { id },
      data: { status },
    });
    res.json({ success: true, data: updatedPlayer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedPlayer = await prisma.player.delete({ where: { id } });
    res.json({ success: true, data: deletedPlayer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
