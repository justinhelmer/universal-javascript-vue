module.exports = {
  set: (req, res) => {
    // Make UID available to the client if there is an active session
    if (req.user) {
      const uid = req.user._id.toString(); // necessary to prevent express from converting the ID hash (typeof object) to JSON

      // this will set the cookie on the client
      res.cookie('uid', uid, { httpOnly: false });
    }
  },

  remove: (req, res) => {
    res.clearCookie('uid');
  }
};