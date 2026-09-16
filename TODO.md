1. [ X ] ~~ Clone Repo, Install dependencies, run locally ~~
2. [ X ]  API Implementation
    * ~~You will receive a list of general vehicle information by making an initial api request to endpoint `/api/vehicles.json`~~
    * You are now required to traverse the API and make further calls on a detail endpoint (`apiUrl`) to get vehicle-specific details such as price and description
    * Ignore vehicles with broken apiUrl or without any price information
    * All API related logic should be implemented inside `getData()` available at `src/api/index.js`

2. Using `getData()` in a React component
    * React component `VehicleList` is configured to use `getData()` through a custom hook `useData`
    * If you prefer to use class-based component, then the rule to make a single function to obtain all vehicles through `getData()` needs to be respected
    * No other components are allowed to make any network request

