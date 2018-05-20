var SubDb = require("subdb");

module.exports = function(RED) {
  function GetSubNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on("input", function(msg) {
      videoFile = msg.payload;
      srtFile = videoFile.replace(/\.\w*$/, ".srt");

      var subdb = new SubDb();
      subdb.computeHash(videoFile, function(err, res) {
        if (err) {
          delete subdb;
          return err;
        }

        var hash = res;
        subdb.api.search_subtitles(hash, function(err, res) {
          if (err) {
            delete subdb;
            return err;
          }

          subdb.api.download_subtitle(hash, res.join(","), srtFile, function(
            err,
            res
          ) {
            if (err) {
              delete subdb;
              return err;
            }

            node.status({ fill: "green", shape: "dot", text: srtFile });
            delete subdb;
          });
        });
      });
    });
  }
  RED.nodes.registerType("get-subs", GetSubNode);
};
