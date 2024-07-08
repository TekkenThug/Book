import { catchAsync } from "@/utils/errors";
import EventService from "@/services/event";

const get = catchAsync(async (req, res) => {
  res.send(await EventService.get({ book: req.query.book as string }));
});

const getChecked = catchAsync(async (req, res) => {
  res.send(await EventService.get({ withChecked: true, userId: req.user!.id }));
});

const getEventsOfUser = catchAsync(async (req, res) => {
  res.send(await EventService.getEventsOfUser(req.user!.id));
});

const create = catchAsync(async (req, res) => {
  res.send(await EventService.createEvent(req.user!, req.body));
});

export default {
  get,
  getChecked,
  getEventsOfUser,
  create,
};
