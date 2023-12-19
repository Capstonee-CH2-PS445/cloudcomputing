# Gunakan image resmi Node.js sebagai base image
FROM node:14

# Set working directory di dalam container
WORKDIR /app

# Copy package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh kode sumber aplikasi ke dalam container
COPY . .

# Command untuk menjalankan aplikasi saat container dijalankan
CMD ["npm", "run", "start"]
