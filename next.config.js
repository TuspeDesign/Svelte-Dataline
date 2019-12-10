const withSass = require("@zeit/next-sass");
module.exports = withSass({

  exportTrailingSlash: true,
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    };
  }

})
