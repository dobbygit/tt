/**
 * Build script for WordPress integration
 *
 * This script modifies the Vite build configuration to make the React app
 * compatible with WordPress as a plugin.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Configuration
const config = {
  // Source directory (React app)
  sourceDir: "./",

  // Output directory (WordPress plugin)
  outputDir: "./wordpress-integration/build",

  // WordPress plugin directory name
  pluginDirName: "tendas-mozambique-app",

  // Files to copy to the WordPress plugin
  filesToCopy: [
    "wordpress-integration/tendas-mozambique-app.php",
    "wordpress-integration/includes/shortcodes.php",
    "wordpress-integration/README.md",
  ],

  // Directories to create in the WordPress plugin
  directoriesToCreate: ["includes"],
};

// Create output directories
function createDirectories() {
  console.log("Creating directories...");

  // Create main output directory
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }

  // Create additional directories
  config.directoriesToCreate.forEach((dir) => {
    const dirPath = path.join(config.outputDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
}

// Copy WordPress plugin files
function copyPluginFiles() {
  console.log("Copying plugin files...");

  config.filesToCopy.forEach((file) => {
    const sourcePath = path.join(config.sourceDir, file);
    const destPath = path.join(config.outputDir, path.basename(file));

    // If the file is in a subdirectory, make sure the directory exists
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied ${sourcePath} to ${destPath}`);
  });
}

// Build the React app
function buildReactApp() {
  console.log("Building React app...");

  try {
    // Create a temporary vite.config.js for WordPress build
    const originalConfig = fs.readFileSync("vite.config.ts", "utf8");
    const wpConfig = `
      import { defineConfig } from 'vite';
      import react from '@vitejs/plugin-react-swc';
      import { tempo } from "tempo-devtools/dist/vite";

      // Add this block of code
      const conditionalPlugins = [];
      if (process.env.TEMPO === "true") {
        conditionalPlugins.push(['tempo-devtools/swc', {}]);
      }

      export default defineConfig({
        plugins: [
          react({
            plugins: [...conditionalPlugins]
          }),
          tempo()
        ],
        build: {
          outDir: '${config.outputDir}',
          emptyOutDir: true,
          rollupOptions: {
            output: {
              entryFileNames: 'assets/[name]-[hash].js',
              chunkFileNames: 'assets/[name]-[hash].js',
              assetFileNames: 'assets/[name]-[hash].[ext]',
            },
          },
        },
        server: {
          // @ts-ignore
          allowedHosts: process.env.TEMPO === "true" ? true : undefined
        }
      });
    `;

    // Write temporary config
    fs.writeFileSync("vite.config.wp.ts", wpConfig);

    // Run build with WordPress config
    execSync("npm run build -- --config vite.config.wp.ts", {
      stdio: "inherit",
    });

    // Clean up temporary config
    fs.unlinkSync("vite.config.wp.ts");

    console.log("React app built successfully!");
  } catch (error) {
    console.error("Error building React app:", error);
    process.exit(1);
  }
}

// Create WordPress adapter entry point
function createWordPressAdapter() {
  console.log("Creating WordPress adapter...");

  // Copy the WordPress adapter to the build directory
  const adapterSource = path.join(
    config.sourceDir,
    "wordpress-integration/src/wordpress-adapter.ts",
  );
  const adapterDest = path.join(config.outputDir, "src/wordpress-adapter.js");

  // Create directory if it doesn't exist
  const adapterDestDir = path.dirname(adapterDest);
  if (!fs.existsSync(adapterDestDir)) {
    fs.mkdirSync(adapterDestDir, { recursive: true });
  }

  // Copy adapter file
  fs.copyFileSync(adapterSource, adapterDest);
  console.log(`Copied ${adapterSource} to ${adapterDest}`);
}

// Create WordPress plugin zip
function createPluginZip() {
  console.log("Creating WordPress plugin zip...");

  const zipFilename = `${config.pluginDirName}.zip`;
  const zipPath = path.join(config.sourceDir, zipFilename);

  try {
    // Change to the output directory
    process.chdir(config.outputDir);

    // Create zip file
    execSync(`zip -r ../../${zipFilename} .`, { stdio: "inherit" });

    // Change back to the source directory
    process.chdir(config.sourceDir);

    console.log(`WordPress plugin zip created: ${zipFilename}`);
  } catch (error) {
    console.error("Error creating WordPress plugin zip:", error);
    process.exit(1);
  }
}

// Main function
function main() {
  console.log("Building Tendas Mozambique app for WordPress...");

  createDirectories();
  copyPluginFiles();
  buildReactApp();
  createWordPressAdapter();
  createPluginZip();

  console.log("WordPress build completed successfully!");
}

// Run the main function
main();
