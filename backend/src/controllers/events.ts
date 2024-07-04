import { catchAsync } from "@/utils/errors";
import EventService from "@/services/EventService";

const get = catchAsync(async (req, res) => {
  res.send(await EventService.getByBook(req.query.book as string));
});

const create = catchAsync(async (req, res) => {
  res.send(await EventService.createEvent({ ...req.body, userId: req.user?.id }));
});

export default {
  get,
  create,
};
