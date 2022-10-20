# symfony5.4

## 1. IDE setup (Windows)

Create a new project in PhpStorm with no configuration.
```
File > New Project... > PHP Empty Project
```

### 1.1. Clone the symfony5.4 project

Then, open the project folder in the terminal and run the following commands to clone symfony5.4 project:
```bash
#Clone the repo inside your project root folder
git clone https://github.com/agaktr/symfony5.4.git

#copy files from symfony5.4/public_html/symfony to your project root folder
cp -r symfony5.4/public_html/symfony/* .

#remove the symfony5.4 folder
rm -rf symfony5.4
#or if you are using Windows PowerShell (PHPStorm terminal)
Remove-Item -Recurse -Force symfony5.4
```

### 1.2. Install dependencies

```bash
#change webpack.config.js file to use the correct path for the public folder
#change the following line
publicPath: '/symfony/public/build',
#to
publicPath: '/build',

#install composer dependencies
composer install

#install yarn dependencies
yarn install

#build assets
yarn encore dev
#or if you want to watch for changes
yarn encore dev --watch
```

### 1.3. Configure the .env file

This is for local development only. Ex. if you are using XAMPP, you can use the following configuration:

```bash
#copy the .env file and rename it to .env.local
cp .env .env.local
```

```dotenv
#edit the .env.local file and set the database credentials
DATABASE_URL="//${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?serverVersion=${DB_VERSION}"

#set the MAILER_DSN with sendgrid api key
#you can get a free sendgrid account here: https://signup.sendgrid.com/
MAILER_DSN=sendgrid://${SENDGRID_API_KEY}@default

#set the hwioauth credentials
#you can create an app on the following links:
#facebook: https://developers.facebook.com/apps/
#google: https://console.cloud.google.com/apis/credentials
#apple: https://developer.apple.com/account/resources/identifiers/list
{social}_ID=
{social}_SECRET=
```

### 1.4. Create database

```bash
#Create database if it doesn't exist
php bin/console doctrine:database:create

#create migrations
php bin/console make:migration

#Create tables
php bin/console doctrine:migrations:migrate

#Load fixtures with sample data (optional)
php bin/console doctrine:fixtures:load
```

### 1.5. Run the local project

When toy are done, clear the cache:
```bash
php bin/console cache:clear
```

You can visit the project at your local domain (ex. http://localhost/project/)

### 1.6. Create git repository

Share the new project on github through the VCS menu:
```
VCS > Share Project on GitHub
```
