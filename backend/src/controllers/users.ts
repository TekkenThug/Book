import { catchAsync } from "@/utils/errors";
import UserService from "@/services/UserService";

const update = catchAsync(async (req, res) => {
  delete req.body.repeat_password;
  await UserService.updateUser(req.user!, req.body);
  res.send({ message: "User successfully updated" });
});

const getSettings = catchAsync(async (req, res) => {
  res.send(await UserService.getEditableSettings(req.user!));
})

export default {
  update,
  getSettings,
};
