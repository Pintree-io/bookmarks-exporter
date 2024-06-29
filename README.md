# Bookmarks Exporter

![License](https://img.shields.io/github/license/Pintree-io/bookmarks-exporter)
![Version](https://img.shields.io/github/v/release/Pintree-io/bookmarks-exporter)

## Introduction

Bookmarks Exporter is an open-source Chrome extension designed to help you effortlessly export your Chrome bookmarks into organized JSON files.

## Features

- **Easy Export**: Quickly export all your Chrome bookmarks with a single click.
- **Organized JSON**: Exports bookmarks in a structured and easy-to-read JSON format.
- **User-Friendly Interface**: Simple and intuitive user interface for a seamless experience.
- **Automatically publish to store**: Automatically publish to Chrome Web Store when a new release is created.

## Installation

### From Chrome Web Store

1. Visit the [Chrome Web Store](https://chrome.google.com/webstore) and search for "Bookmarks Exporter".
2. Click "Add to Chrome" to install the extension.

### From Source

1. Clone this repository:
   ```sh
   git clone https://github.com/Pintree-io/bookmarks-exporter.git
   ```
2. Navigate to the project directory:
   ```sh
   cd bookmarks-exporter
   ```
3. Install dependencies using `pnpm`:
   ```sh
   pnpm install
   ```
4. Build the project:
   ```sh
   pnpm build
   ```
5. Open Chrome and navigate to `chrome://extensions/`.
6. Enable "Developer mode" by clicking the toggle switch in the top right corner.
7. Click "Load unpacked" and select the `dist` folder inside your project directory.

## Usage

1. Click on the Bookmarks Exporter icon in your Chrome toolbar.
2. Click the "Export Bookmarks" button.
3. Save the downloaded JSON file to your desired location.

## Development

To set up the development environment:

1. Install dependencies:
   ```sh
   pnpm install
   ```
2. Start the development server:
   ```sh
   pnpm dev
   ```
3. Open Chrome and navigate to `chrome://extensions/`.
4. Enable "Developer mode" by clicking the toggle switch in the top right corner.
5. Click "Load unpacked" and select the `build` folder inside your project directory.
6. Rename the `example.keys.json` file to `keys.json` and fill in the corresponding fields.
7. Make your changes and refresh the extension in Chrome to see the updates.

## Contributing

Contributions are welcome! Please fork this repository, create a new branch, and submit a pull request.

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```sh
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```sh
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or questions, feel free to open an issue or contact [viggo.zw@gmail.com](mailto:viggo.zw@gmail.com).

## Acknowledgements

- [Plasmo Framework](https://www.plasmo.com) for providing a robust platform for Chrome extension development.
