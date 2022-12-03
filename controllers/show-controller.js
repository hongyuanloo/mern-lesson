const { Show } = require("../models");
const httpStatus = require("http-status");

/* e.g commands in POSTMAN
-POST: http://localhost:3001/shows/
-Body, JSON:
{
"title":"test to DELETE",
"venue":"Esplanade theatre33",
"start":"2022-12-24T14:00:00Z",
"duration":10,
"performers":["6385e2cf41e0b9d346d0858c","6385e2cf41e0b9d346d0858d"]
}
*/
const create = async (req, res) => {
  try {
    const result = await Show.create(req.body);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const findAll = async (req, res) => {
  try {
    // console.log(req.query);
    const result = await Show.find(req.body).populate("performers").exec();
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const findOneById = async (req, res) => {
  try {
    // console.log("req.params.id: ", req.params.id);
    const result = await Show.findById(req.params.id).exec();
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const deleteOne = async (req, res) => {
  try {
    // console.log(req.query);
    const result = await Show.deleteOne({ _id: req.params.id });
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

/* e.g commands in POSTMAN
-PUT: http://localhost:3001/shows/6385e2ce41e0b9d346d08582
-Body, JSON:
{
 "performers":["6385e2cf41e0b9d346d0858c","6385e2cf41e0b9d346d0858d"]
}
-this would update the performers with two ids from Comedians
*/
const updateOne = async (req, res) => {
  // console.log(req.body);
  // console.log(req.params.id);
  try {
    const result = await Show.updateOne({ _id: req.params.id }, req.body);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const assign = async (req, res) => {
  console.log("run assign func");
  try {
    // Fetch required inputs
    const showId = req.params.showId;
    const comedianId = req.params.comedianId;
    console.log("inputs", typeof showId, showId, typeof comedianId, comedianId);

    // Check if performer already exist
    const show = await Show.findById(showId).populate("performers").exec();
    console.log("show retrieved", show);
    if (!show) return res.sendStatus(httpStatus.NOT_FOUND); // show not found
    const found = show.performers.find(
      (performer) => String(performer._id) === comedianId
    );
    console.log("found", found);
    if (found) return res.sendStatus(httpStatus.CONFLICT); // performer exist

    // Check if comedian exist in collection
    const comedian = await Comedian.findById(comedianId);
    if (!comedian) return res.sendStatus(httpStatus.NOT_FOUND); // comedian not found
    console.log("comedian retrieved", comedian);

    // Assign comedian to show
    show.performers.push(comedianId); // success flow
    await show.save();

    res.sendStatus(httpStatus.OK);
  } catch (e) {
    console.error(e);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const unassign = async (req, res) => {
  console.log("run unassign func");
  try {
    // Get required parameters
    const showId = req.params.showId;
    const comedianId = req.params.comedianId;
    console.log(`showId:${showId}, comedianId:${comedianId}`);

    // Get show
    const show = await Show.findById(showId).populate("performers").exec();
    console.log("retrieved show", show);
    if (!show) return res.sendStatus(httpStatus.NOT_FOUND);

    // Look for performer
    console.log("show.id", show.id);
    const found = show.performers.find(
      (performer) => String(performer._id) === comedianId
    );
    console.log("performer found", found);

    // If not found, return bad request
    if (!found) return res.sendStatus(httpStatus.BAD_REQUEST);

    // If found, remove it and update
    show.performers = show.performers.filter(
      (p) => String(p._id) !== comedianId
    );
    console.log("new performers state", show.performers);
    await show.save();
    res.sendStatus(httpStatus.OK);
  } catch (e) {
    console.error(e);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  create,
  findAll,
  deleteOne,
  updateOne,
  findOneById,
  assign,
  unassign,
};
