const path = require("path")
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config")

const projectRoot = __dirname
const sharedRoot = path.resolve(__dirname, "../pong-shared-deps")

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [
    sharedRoot, // 👈 watch pong-shared-deps for changes
  ],
  resolver: {
    nodeModulesPaths: [
      path.resolve(projectRoot, "node_modules"),
      path.resolve(sharedRoot, "node_modules"), // 👈 so dayjs etc. resolve properly
    ],
  },
}

module.exports = mergeConfig(getDefaultConfig(projectRoot), config)
