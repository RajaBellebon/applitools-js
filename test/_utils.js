const testname = process.argv[2];

var baseUrl = "https://atlaskit.atlassian.com/";

//default for "home"
let testsToRun = {
  url: baseUrl,
  appName: "Atlaskit",
  windowName: "Home page",
  testName: "Home page",
  goto2ndPage: false,
  viewportWidth: 1200,
  viewportHeight: 700
};

if (testname === "packages") {
  testsToRun = {
    url: baseUrl + "packages",
    appName: "Atlaskit",
    windowName: "Packages page",
    testName: "Packages page",
    goto2ndPage: false,
    viewportWidth: 1200,
    viewportHeight: 700
  };
}

//create baseline for the app.html
if (testname === "doc") {
  testsToRun = {
    url: baseUrl + "packages/core/avatar",
    appName: "Atlaskit",
    windowName: "Avatar doc page",
    testName: "Avatar doc page",
    goto2ndPage: false,
    viewportWidth: 1200,
    viewportHeight: 700
  };
}

//Run tests on version 2 of the app(app_v2.html)
if (testname === "example") {
  testsToRun = {
    url: baseUrl + "examples.html?groupId=core&packageId=avatar&exampleId=basicAvatar",
    appName: "Atlaskit",
    windowName: "Example page",
    testName: "Example page test",
    goto2ndPage: false,
    viewportWidth: 1200,
    viewportHeight: 700
  };
}
if (
  testname !== "home" &&
  testname !== "packages" &&
  testname !== "doc" &&
  testname !== "example"
) {
  console.log(
    "Invalid test part name. Valid part names are: 'home', 'packages', 'doc', 'example'"
  );
  process.exit(0);
}
console.log("Running..", testname);
console.log("Test app URL:", testsToRun.url);
console.log("Application name:", testsToRun.appName);
console.log("Test page name:", testsToRun.windowName);
console.log("Viewport width:", testsToRun.viewportWidth);
console.log("Viewport height:", testsToRun.viewportHeight);

module.exports = testsToRun;