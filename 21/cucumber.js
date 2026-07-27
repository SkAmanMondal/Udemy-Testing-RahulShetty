module.exports = {
  default: {
    require: [
      "features/support/**/*.js",
      "features/step_definations/**/*.js"
    ],

    format: [
      "progress-bar",
      "summary",
      "json:reports/cucumber-report.json",
      "html:reports/cucumber-report.html"
    ],

    publishQuiet: true,
    retry: 0,
    parallel: 1,
    failFast: false
  }
};