# Application Tracker
## Overview
The Application Tracker program is designed to help users track their progress in applying for jobs and maintain scheduled breaks. It provides a web interface to monitor the number of applications submitted and the time spent on the task.

## Features
* Track the number of quick apply and web apply applications.
* Display the progress towards application goals.
* Show the total number of applications submitted.
* Display the session time and time since the last application.
* Alert the user to take breaks at regular intervals.

## Installation
1. Clone the repository:
`git clone https://github.com/yourusername/app-tracker.git`
2. Navigate to the project directory:
`cd app-tracker`
3. Install the dependencies:
`npm install`

## Usage
1. Start the server:
`node app-counter.js`
2. Open your web browser and navigate to http://localhost:3000.
## API Endpoints
/api/quick-apply
* **Method**: GET
* **Description**: Increment the quick apply application counter and return the updated count.

/api/web-apply
* **Method**: GET
* **Description**: Increment the web apply application counter and return the updated count.

/api/stats
* **Method**: GET
* **Description**: Return the current application statistics, including session time and time since the last application.

/api/end-session
* **Method**: GET
* **Description**: End the current session and return the final statistics.

## Client-Side Script
The client-side script (public/script.js) handles updating the session time and time since the last application without requiring constant requests to the server.

### Functions
updateStats()
Fetches the current application statistics from the server and updates the UI.

formatTime(seconds)
Formats a given number of seconds into HH:MM:SS format.

updateTime(reset)
Updates the session time and time since the last application. If reset is true, it resets the last application time. Alerts the user to take a break at regular intervals.

## Example HTML
Include the following HTML in your index.html file to display the application statistics and time:
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>App Tracker</title>
</head>
<body>
  <div id="stats"></div>
  <div id="time"></div>

  <script src="script.js"></script>
</body>
</html>
```

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request with your changes.

## Contact
For questions or feedback, please contact me via email.
