const Merchandise = require("../models/Merchandise");
const mongoose = require("mongoose");
const gfsPromise = require("../config/gridfsDb").default;

exports.getMerchandises = async (req, res) => {
  try {
    const { size, pagenum, searchTerm, category } = req.query;
    var query = {};
    query.skip = size * (pagenum - 1);
    query.limit = size;
    var filter_query = { title: { $regex: searchTerm.trim(), $options: "i" } };
    if (category && category.length > 0) {
      filter_query.category = { $in: category };
    }
    const merchandises = await Merchandise.find(filter_query, {}, query).then(
      (data) => {
        return data;
      }
    );

    const count = await Merchandise.count({});
    const search_count = await Merchandise.count(filter_query);
    console.log(category);
    res
      .status(200)
      .json({
        merchandises,
        status: true,
        msg: `Merchandises fetched successfully`,
        total_count: count,
        search_count: search_count,
      });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

exports.getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const _id = new mongoose.Types.ObjectId(id);
    const gfs = await gfsPromise;

    const file = await gfs.find({ _id }).toArray();
    if (!file || file.length === 0) {
      return res.status(400).send("No file exists");
    }

    const readStream = gfs.openDownloadStream(_id);
    readStream.on("error", (err) => {
      console.error(err);
      return res
        .status(500)
        .json({ status: false, msg: "Internal Server Error" });
    });

    res.set("Content-Type", file[0].contentType);
    readStream.pipe(res);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};
