import { catchAsync } from "@/utils/errors";
import BookService from "@/services/BookService";

const get = catchAsync(async (req, res) => {
  res.send(await BookService.get(req.query.search as string));
});

export default { get };
