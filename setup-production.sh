#!/bin/bash

# check if pwd is in the dsoj directory
if [ pwd != "dsoj-backend" ]; then
    echo "Please run this script from the dsoj-backend directory"
    exit 1
fi

# install the required dependencies using npm
npm install

# Check if the project directory exists, if not, create it
if [ ! -d "../dsoj-frontend" ]; then
    mkdir ../dsoj-frontend
fi

# Clone the GitHub repository into the project directory
git clone https://github.com/dscs-club/dsoj-judge.git ../dsoj-frontend

# Navigate into the project directory
cd ../dsoj-frontend

# Install the required dependencies using npm
npm install

# Run the build script using npm
npm run build

