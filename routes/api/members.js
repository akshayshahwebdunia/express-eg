const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");



router.get("/", (req, res) => {
  res.json(members);
});

router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json([{ msg: "Member Not found" }]);
  }
});

router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    age: req.body.age,
  };

  if (!newMember.name || !newMember.age) {
    return res.status(400).json({ mes: "Please include name and age" });
  }
  members.push(newMember);
  res.redirect("/");
  //res.json(members);
});

router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = req.body.name ? req.body.name : member.name;
        member.age = req.body.age ? req.body.age : member.age;
        return res.json({ msg: "Member is updated", member });
      }
    });
  } else {
    res.status(400).json([{ msg: "Member Not found" }]);
  }
});
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
    
  if(found) {

      res.json({
        mes: "member deleted",
        members:    members.filter(member =>member.id !== parseInt(req.params.id))
      });
  } else {
    res.status(400).json([{ msg: "Member Not found" }]);
  }
});

module.exports = router;
