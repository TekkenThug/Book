import { catchAsync } from "@/utils/errors";
import BookService from "@/services/book";

const get = catchAsync(async (req, res) => {
  res.send(await BookService.getFromAPI(req.query.title as string));
});

export default { get };
