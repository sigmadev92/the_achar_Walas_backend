import UserModel from "./user.schema.js";
export default class UserRepository {
  async registerAdminRepo(adminData) {
    const count = await UserModel.countDocuments({ role: "admin" });
    if (count >= 1) {
      return {
        success: false,
        error: {
          statusCode: 400,
          msg: "You can not register as admin. Contact admin to make you as admin if you think you are eligible.",
        },
      };
    }
    adminData.firstAdmin = true;
    try {
      const firstAdmin = new UserModel(adminData);
      await firstAdmin.save();
      return {
        success: true,
        firstAdmin,
      };
    } catch (error) {
      let errorMsg = "";
      if (error.code === 11000) {
        errorMsg = "Phone number and Email must be unique";
      }
      return {
        success: false,
        error: {
          statusCode: 400,
          msg: errorMsg || error.message,
        },
      };
    }
  }

  async addUserRepo(newUserData) {
    try {
      const newCustomer = new UserModel(newUserData);
      await newCustomer.save();
      return {
        success: true,
        newCustomer,
      };
    } catch (error) {
      let errorMsg = "";
      if (error.code === 11000) {
        errorMsg = "Phone number and Email must be unique";
      }
      return {
        success: false,
        error: {
          statusCode: 400,
          msg: errorMsg || error.message,
        },
      };
    }
  }

  async findUserByEmailRepo(email) {
    return await UserModel.findOne({ email });
  }

  async findUserByIdRepo(userId) {
    return await UserModel.findById(userId);
  }

  async deleteUserRepo(userId) {
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      return {
        success: false,
        error: {
          statusCode: 400,
          msg: "Invalid UserID",
        },
      };
    }
    return {
      success: true,
      user,
    };
  }
}
