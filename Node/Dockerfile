# Start with node as the Base Layer
FROM node 

LABEL author="Nethali Zoysa"
LABEL description="Simple Node App to read/write date to MySQL DB"
LABEL version="1.0.0"

# Copy files to /app directory
COPY . /app

# Make app as the working directory
WORKDIR /app

# Install dependencies
RUN  npm install

# The port container will listen
EXPOSE 8080
ENTRYPOINT ["node", "./app.js"]

