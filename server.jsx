import path from 'path'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'
import routes from './app/routes'
import { createLocation } from 'history/lib/LocationUtils';

import reducer from './app/reducers'

const app = express()
const port = 3000

app.use('/static/', express.static(path.join(__dirname, 'dist')));
app.use(handleRender)

function handleRender(req, res) {
  const location = createLocation(req.url)

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if(error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const store = createStore(reducer)

      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      )

      const initialState = store.getState()

      res.send(renderFullPage(html, initialState))
    } else {
      res.status(404).send('Not found')
    }
  })
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
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `
}

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`http://localhost:${port}/`)
  }
})
