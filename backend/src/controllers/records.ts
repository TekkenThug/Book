import { catchAsync } from "@/utils/errors";
import RecordService from "@/services/record";

const createRecordToEvent = catchAsync(async (req, res) => {
  await RecordService.createRecordToEvent(req.user!.id, req.body.event_id);
  res.send({ message: "You successfully recorded to event" });
});

export default { createRecordToEvent };
