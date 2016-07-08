import path from 'path'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'
import createLocation from 'history/lib/createLocation';

import reducer from './app/reducers'
import App from './app/containers/App'

const app = express()
const port = 3000

app.use(handleRender)
app.use(express.static(path.join(__dirname, 'dist')));

function handleRender(req, res) {
  const store = createStore(reducer)

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  const initialState = store.getState()

  res.send(renderFullPage(html, initialState))
}

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
  `
}

app.listen(port)
