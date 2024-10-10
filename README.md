# AGV Control Web App (ReactJS Frontend)

> GUI: graphical user interface (the frontend app)

## Clone my code

> "tailwind" branch is preferred over "master" branch

```bash
git clone -b tailwind https://github.com/sondhg/agv-project.git
cd agv-project
```

## Required installations

1. **NodeJS**: [Download here](https://nodejs.org/en).
2. **Dependency libraries**: In the `agv-project/client` folder, run:

```bash
npm i
```

## Run the App

**IMPORTANT**: Since I can't use Hoang Anh's server yet, I wrote a backend Django server. Please use it, otherwise the app won't work.

- **Run GUI**:

  ```bash
  npm run dev
  ```

  Visit [http://localhost:3000](http://localhost:3000) in your browser to see the GUI.

- **Run Django Server**: Clone and follow the README instructions in my [Django Server Repo](https://github.com/sondhg/my-django-server) to have a PostgreSQL database at port 5432 and a Django server at port 8000 like I do.

## Using the GUI

1. **Login/Register** on [Home page](http://localhost:3000).
2. Access admin pages: [Dashboard](http://localhost:3000/admin) and [Manage Orders](http://localhost:3000/admin/manage-orders).
3. **Manage Orders**: Perform CRUD operations and CSV imports to a data table.
4. **Dashboard**: Displays live WebSocket data.

## Important files

- API configs for **Manage Orders**:
  - `client/src/services/apiServices.jsx`
  - `client/src/customize/axiosCustomize.jsx`
- API configs for **Authentication**:
  - `client/src/services/HA_apiServices.jsx`
  - `client/src/customize/HA_axiosCustomize.jsx`
- **WebSocket for live data** (testing with Binance API):
  - `client/src/components/Admin/Content/Dashboard/Dashboard.jsx`
  - [WebSocket URL](wss://stream.binance.com:9443/ws/btcusdt@aggTrade)

## Learning resources

- [React Hook YouTube Playlist](https://www.youtube.com/playlist?list=PLncHg6Kn2JT7QbvdNNAmQZLqWchnJEoH5)
- [React Hook PDF](https://drive.google.com/drive/folders/1WYAyusS4m498bqCR8iyzRYmS26zGh8g-)
