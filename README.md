## Installation

## Api

```bash
cp .env.example .env
docker-compose up -d db phpmyadmin

# Enable mysql_pdo and iconv extension
sudo vim /etc/php/php.ini

cd api
composer install
php artisan migrate:fresh --seed
php artisan serve
```

## UI

```bash
cd ui
bun i
bun dev
```
