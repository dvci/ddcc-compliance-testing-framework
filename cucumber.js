const worldParameters = {
    appUrl: process.env.BASE_APP_URL || "http://localhost:4321/",
    mockPort: process.env.MOCK_PORT || null
  }
  const common = `--world-parameters '${JSON.stringify(worldParameters)}'`
  
  module.exports = {
    'default': `${common} --format progress-bar --format html:./cucumber-report.html`,
    'ci': `${common} --format html:./cucumber-report.html --publish`,
    'local': `${common} --format progress-bar --format html:./cucumber-report.html`
  }