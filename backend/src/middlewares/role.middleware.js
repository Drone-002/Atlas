import Membership from "../models/Memberships.js";

const requireRole = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const { workspaceId } = req.params;
      const userId = req.user.id;

      if (!workspaceId) {
        return res.status(400).json({
          message: "Workspace ID is required",
        });
      }

      const membership = await Membership.findOne({
        user: userId,
        workspace: workspaceId,
      });

      if (!membership) {
        return res.status(403).json({
          message: "Not a member of the workspace",
        });
      }
      if (!allowedRoles.includes(membership.role)) {
        return res.status(403).json({
          message: " Insufficient permissions",
        });
      }

      req.membership = membership;
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };
};

export default requireRole;
