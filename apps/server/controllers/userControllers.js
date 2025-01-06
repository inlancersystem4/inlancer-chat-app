const { User } = require("../models");
const {
  successResponseWithData,
  errorResponse,
} = require("../utils/responseHandlers");

exports.allUser = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = "" } = req.body;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const searchFilter = search
      ? {
          [Op.or]: [
            { username: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    const { count, rows: users } = await User.findAndCountAll({
      where: searchFilter,
      offset: (pageNumber - 1) * limitNumber,
      limit: limitNumber,
      order: [["created_at", "DESC"]],
    });

    return successResponseWithData(res, "Users retrieved successfully", {
      totalUsers: count,
      currentPage: pageNumber,
      totalPages: Math.ceil(count / limitNumber),
      users,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Internal server error");
  }
};
