## Installation

```bash
$ yarn install
```

## Starting development servers

### Step 1: Start React UI server
```bash
yarn start-react
```
### Step 2: Start Nginx Frontend Server
```bash
docker-compose up
```

### Step 3: Start Nest Backend Server
```bash
yarn start-nest
```

NOTE: Nginx must resolve the CORS issue in communication between the UI server and the Nest backend. 
