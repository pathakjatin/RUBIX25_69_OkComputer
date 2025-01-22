const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  maxSize: { type: Number, default: 5 },
});

module.exports = mongoose.model("Team", teamSchema);
const Team = require('./models/Team');

async function createTeam() {
  const newTeam = new Team({
    name: "Team Beta",
    members: [],
    maxSize: 5,
  });
  await newTeam.save();
  console.log("Team created:", newTeam);
}

createTeam();
async function addMember(teamId, userId) {
  const team = await Team.findById(teamId);
  if (team.members.length >= team.maxSize) {
    console.log("Team is already full.");
    return;
  }
  team.members.push(userId);
  await team.save();
  console.log("Member added:", userId);
}

addMember("63bdfc1234567890abcd1234", "63bdfc1234567890abcd5678");
async function getTeamWithMembers(teamId) {
  const team = await Team.findById(teamId).populate("members");
  console.log("Team with members:", team);
}

getTeamWithMembers("63bdfc1234567890abcd1234");
async function removeMember(teamId, userId) {
  const team = await Team.findById(teamId);
  team.members = team.members.filter((member) => member.toString() !== userId);
  await team.save();
  console.log("Member removed:", userId);
}

removeMember("63bdfc1234567890abcd1234", "63bdfc1234567890abcd5678");
