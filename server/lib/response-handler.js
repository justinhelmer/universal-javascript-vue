module.exports = function responseHandler(res, err, result) {
  if (err) {
    console.error(err);
    res.status(500).send(err).end();
  } else {
    res.json(result).end();
  }
};
