# CodeHive

A desktop application that allows you to use Claude, ChatGPT, and Grok side-by-side in a single window.

## Features

- View all three AI services simultaneously in resizable columns
- Persistent sessions for each service using separate browser partitions
- Cross-platform support (Windows, macOS, Linux)
- Built with Electron for native desktop experience

## Installation

To install and run this application locally:

1. Clone this repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd codehive
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the application:
   ```
   npm start
   ```

## Building Distributables

- For Linux AppImage: `npm run dist:linux`
- For Windows NSIS installer: `npm run dist:win`
- For default Linux build: `npm run build`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.