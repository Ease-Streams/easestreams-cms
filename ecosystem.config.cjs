module.exports = {
  apps: [
    {
      name: 'e-cms',
      script: 'server.js', // Directly specify the path to your server.js file
      instances: 1, // Run 3 instances
      exec_mode: 'cluster', // Enable cluster mode
      max_restarts: 5, // Automatically restart up to 5 times if it crashes
      restart_delay: 5000, // Delay between restarts (5 seconds)
      env: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
    },
  ],
}
