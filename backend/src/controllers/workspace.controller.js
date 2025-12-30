import Workspace from "../models/Workspace.js";
import Membership from "../models/Memberships.js";

export const createWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Workspace name is required",
      });
    }

    const createdWorkspace = await Workspace.create({
      name,
      description,
      createdBy: req.user.id,
    });
    await Membership.create({
      user: req.user.id,
      workspace: createdWorkspace._id,
      role: "owner",
    });

    res.status(201).json({
      message: "Workspace created successfully",
      createdWorkspace,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getMyWorkspaces = async (req, res) => {
  try {
    const memberships = await Membership.find({
      user: req.user.id,
    }).populate("workspace");

    const workspaces = memberships.map((membership) => membership.workspace);

    res.status(200).json({
      workspaces,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
