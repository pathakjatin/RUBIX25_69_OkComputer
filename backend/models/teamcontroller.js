const mongoose = require("mongoose");
const Team = require("./models/Team");

mongoose.connect("mongodb://localhost:27017/hackathonDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Create a new team
async function createTeam() {
  try {
    const newTeam = new Team({
      name: "Team Beta",
      members: [],
      maxSize: 5,
    });
    await newTeam.save();
    console.log("Team created:", newTeam);
  } catch (err) {
    console.error("Error creating team:", err.message);
  }
}

// Add a member to the team
async function addMember(teamId, userId) {
  try {
    const team = await Team.findById(teamId);
    if (!team) {
      console.error("Team not found");
      return;
    }
    if (team.members.length >= team.maxSize) {
      console.log("Team is already full.");
      return;
    }
    team.members.push(userId);
    await team.save();
    console.log("Member added:", userId);
  } catch (err) {
    console.error("Error adding member:", err.message);
  }
}

// Fetch team with members
async function getTeamWithMembers(teamId) {
  try {
    const team = await Team.findById(teamId).populate("members");
    if (!team) {
      console.error("Team not found");
      return;
    }
    console.log("Team with members:", team);
  } catch (err) {
    console.error("Error fetching team:", err.message);
  }
}

// Remove a member from the team
async function removeMember(teamId, userId) {
  try {
    const team = await Team.findById(teamId);
    if (!team) {
      console.error("Team not found");
      return;
    }
    team.members = team.members.filter(
      (member) => member.toString() !== userId
    );
    await team.save();
    console.log("Member removed:", userId);
  } catch (err) {
    console.error("Error removing member:", err.message);
  }
}

// Run the functions in sequence
(async () => {
  await createTeam();
  await addMember("63bdfc1234567890abcd1234", "63bdfc1234567890abcd5678");
  await getTeamWithMembers("63bdfc1234567890abcd1234");
  await removeMember("63bdfc1234567890abcd1234", "63bdfc1234567890abcd5678");
})();
