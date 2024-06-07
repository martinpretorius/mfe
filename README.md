- with http2 it is more advantageous to have multiple small js files than single large js file because they load up faster

- caching issue where we not using the latest version of a file - fix this by renaming a file or by invalidating the file on cloudfront

- issues with css in microfrontends
  -- single page app - no reloading of the page, just changing content on the screen
  -- scoping css - will only affect one project and not another
  -- sass: automated and easy namespace scoping of css instead of manually namespace scoping all of your css
  -- bootstrap + bulma + tailwind : front-end framework
  -- material-ui: react component library that makes use of css-in-js to style components
  -- class name collision when two projects use the same css-in-js library
  -- css-in-js libraries generates random class names for elements
  -- as a space saving and faster loading technique the css-in-js libraries turns the long random class names for dev into shorter classnames for production(jss1, jss2, jss3 etc)
