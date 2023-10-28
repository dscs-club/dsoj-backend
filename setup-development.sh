#!/bin/bash

# Check if the project directory exists, if not, create it
if [ ! -d "src/views" ]; then
    mkdir src/views
fi

# Clone the GitHub repository into the project directory
git clone https://github.com/dscs-club/dsoj-judge.git ../dsoj-frontend

# Navigate into the project directory
cd src/views

# Install the required dependencies using npm
npm install

# Run the build script using npm
npm run build
