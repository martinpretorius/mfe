- with http2 it is more advantageous to have multiple small js files than single large js file because the multiple smaller files load up faster

- caching issue where we not using the latest version of a file - fix this by renaming a file or by invalidating the file on cloudfront

- issues with css in microfrontends
  -- single page app - no reloading of the page, just changing content on the screen
  -- scoping css - will only affect one project and not another
  -- sass: automated and easy namespace scoping of css instead of manually namespace scoping all of your css
  -- bootstrap + bulma + tailwind : front-end frameworks
  -- material-ui: react component library that makes use of css-in-js to style components
  -- class name collision when two projects use the same css-in-js library
  -- css-in-js libraries generates random class names for elements
  -- as a space saving and faster loading technique the css-in-js libraries turns the long random class names for dev into shorter classnames for production(jss1, jss2, jss3 etc)
  -- use StyleProvider + generateClassName() to avoid naming collisions when classnames are shortened with numeric increment values

- implementing multi-tier navigation
  -- 3 types of history objects with routing library:
  -- 1 browser history (uses address in url to figure out what page the user is visiting, can also change the url)
  -- 2 hash history
  -- 3 memory/abstract history (does not use the address in url to figure out what page the user is visiting)

  -- if you use multiple versions of browser history in your microfrontend app you could run into big trouble down the road
  -- typically use 1 browser history object inside container and memory history objects inside sub-apps(children)
  -- need to sync history between browser history and memory objects
  -- all links are scoped inside their parent router, links inside child apps are scoped to memory router and links inside container are scoped to browser router
  -- communication with routing between container and subapp should be as generic as possible ie simple events, simple callbacks etc
  -- when navigation occurs in child app communicate this up to container by calling the function inside the object that was passed down from container into the mount function
  -- when navigation occurs in container app communicate this down to child apps by calling the function inside the object that was returned from calling the mount function defined inside the child apps
  -- when using memory history with an app in isolation for dev you will not see any navigation inside the address bar, so it is better to use browser history when using our app during dev in isolation

- performance considerations
  -- if you dont set the public path then the files are loaded relative to the domain that the remoteEntry.js file was loaded from
  -- need to set up public path property for dev environments, when using nested paths and as soon as we set up the public path property as "/" for example then it
  changes how other parts of our project works
  -- when you make changes to your webpack config files you need to restart your webpack server
  -- memory history always default to / even if there is a different path in the address bar, where as browser history looks at the current path in url for the default starting path
  -- add initialEntries array when creating memory history object to specify the initial path for the memory history object
  -- dont eagerly load apps, instead lazy load child apps by only loading the code for them when they are needed on the page
  -- it is straigtforward to lazy load apps with react
  -- add a loader(linear bar loader) when lazy loading apps by supplying it as value for fallback property of Suspense component

- authentication in microfrontends
  -- create a callback(onSignIn) in container and pass it down to auth app
  -- when the button gets clicked inside SignIn or SignUp components then update the isSignedIn state inside the container
