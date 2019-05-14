
const webdriver = require("selenium-webdriver");
const Capabilities = webdriver.Capabilities;
const Builder = webdriver.Builder;
const By = webdriver.By;

const SeleniumSDK = require("eyes.selenium");
const Eyes = SeleniumSDK.Eyes;

//Runs different tests based on CLI input.
const testSetup = require("./test/_utils");

// Open a Chrome browser.
const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

// Initialize the eyes SDK and set your private API key.
const eyes = new Eyes();

//⚠️️️  Please set the APPLITOOLS_API_KEY environment variable.
eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

// CI
// obtain the ID from the environment variables - the name should be specified as null
if (process.env.CI) {
  const batchName = null;
  const batchId   = process.env.APPLITOOLS_BATCH_ID;
  
  // set the batch
  var batchInfo = new Applitools.BatchInfo(batchName);
  batchInfo.Id  = batchId;    
  eyes.Batch    = batchInfo
  
}

//scroll the entire page
eyes.setForceFullPageScreenshot(true);

if (!process.env.APPLITOOLS_API_KEY) {
  console.log(`⚠️️️  Please set the APPLITOOLS_API_KEY environment variable.`);
  process.exit(0);
}


try {
  // Start the test and set the browser's viewport size.
  eyes.open(driver, testSetup.appName, testSetup.testName, {
    width: testSetup.viewportWidth,
    height: testSetup.viewportHeight
  });

  // Navigate the browser to the home page.
  driver.get(testSetup.url);

  // Visual checkpoint #1.
  eyes.checkWindow(testSetup.windowName);

  // End the test.
  eyes.close(false);
} finally {
  // Close the browser.
  driver.quit();

  // If the test was aborted before eyes.close was called ends the test as aborted.
  eyes.abortIfNotClosed();
}
