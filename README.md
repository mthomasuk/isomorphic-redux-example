# Isomorphic Redux Example

*[Universal Webpack](https://github.com/halt-hammerzeit/universal-webpack)*  
*[Smashing Magazine Isomorphic Example](https://github.com/bananaoomarang/isomorphic-redux)*   
*[Just Giving Developer Portal](https://developer.justgiving.com/)*

### Requirements
- `node ^6.2.2`
- `webpack ^2.0.0`/`beta`
- `yarn` latest stable (bye `npm`)
- a strong stomach

### Run
- `yarn`
- if dev:
    - `webpack-dev-server --hot --inline --config "./webpack.config.client.babel.js" --port 45807`
    - `webpack --watch --config "./webpack.config.server.babel.js" --colors --display-error-details`
    - `nodemon "./source/start-server.babel" --watch "./build/server"`

- if prod:
    - `set -x NODE_ENV production`
    - `webpack --config -p "./webpack.config.client.babel.js"`
    - `webpack --config -p "./webpack.config.server.babel.js"`
    - `node "./source/start-server"`

### Test
```npm test```

### Changes
- All CSS is in the `public`/`css`/`style.css` file
- `source` folder
- `universal-webpack-settings`, `webpack.config.client.babel.js` and `webpack.config.server.babel.js` files
- `collect` function that 'caches' redux actions (if promised)
- Separate `index.js` and `server.js` files
- `DashboardPage`/main container doesn't fire any actions on `componentWillMount` - instead, classes have a `static` `needs` variable that the `collect` function hooks into
