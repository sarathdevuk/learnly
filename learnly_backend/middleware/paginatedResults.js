import Tutor from "../models/tutorModel.js";
import Course from "../models/courseModel.js";

const paginatedResults = () => async (req, res, next) => {
  // getting page and limit from query
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  console.log("limit" , limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let model = null;

  // finding the Modal

  switch (req.query.model) {
    case "tutor":
      model = Tutor;
      break;

    case "course":
      model = Course;
      break;

    default:
      return res
        .status(404)
        .json({ status: false, message: "Not proper syntax" });
  }

  if (!model) {
    return res.status(404).json({ status: false, message: "No Model Found" });
  }

  // Taking the total count of documents
  const modelCount = await model.countDocuments();
  const results = {};

  // Next page
  if (endIndex < modelCount) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  // prevPage
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }


  // if both false
  if (endIndex > modelCount) {
    results.limit = modelCount;
  } else {
    results.limit = limit;
  }

  console.log(results.limit, "limit");
  results.current = parseInt(req.query.page);
  results.count = modelCount;
  results.endIndex = endIndex;
  results.startIndex = startIndex;

  // Passing the results for next Function
  req.paginatedResults = results;
  next();
};

export default paginatedResults;
