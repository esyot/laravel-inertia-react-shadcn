# Use the official PHP image with FPM and Nginx support
FROM php:8.1-fpm

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev zip git
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd pdo pdo_mysql

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set the working directory
WORKDIR /var/www

# Copy the project files into the container
COPY . .

# Install Laravel dependencies
RUN composer install --no-dev --optimize-autoloader

# Copy the Nginx configuration
COPY ./nginx/default.conf /etc/nginx/sites-available/default

# Expose ports
EXPOSE 80

# Start PHP-FPM and Nginx
CMD service nginx start && php-fpm
