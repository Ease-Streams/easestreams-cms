import { execSync } from 'child_process'

// Function to build the application
const buildApplication = () => {
  try {
    console.log('Building the Payload CMS application...')
    execSync('npm run build', { stdio: 'inherit' })
    console.log('Build completed successfully!')
  } catch (error) {
    console.error('Error during build:', error)
    process.exit(1) // Exit if build fails
  }
}

// Function to start the application using PM2
const startWithPM2 = () => {
  console.log('Starting the application with PM2...')
  execSync('pm2 start ecosystem.config.cjs', { stdio: 'inherit' })
}

// Run the deployment steps
const deploy = async () => {
  buildApplication() // Step 1: Build the application
  startWithPM2() // Step 2: Start the application with PM2
}

// Execute the deploy process
deploy()
