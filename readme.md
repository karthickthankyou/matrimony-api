## Usage

Rename "config/config.1.env" to "config/config.env" and update the values/settings to your own

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

## Database Seeder

To seed the database with users, bootcamps, courses and reviews with data from the "\_data" folder, run

```
# Destroy all data
node seeder -d

# Import all data
node seeder -i

# Reset and create fresh data
node seeder -r
```

Documentation [here](https://karthickthankyou.github.io/matrimony-api/)

- Version: 1.0.0
- License: MIT
- Author: Karthick Ragavendran
