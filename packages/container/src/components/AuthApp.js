import { mount } from "authApp/Auth"; // this means we load up the remoteEntry file for auth project and associated js code with it
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory(); // history object that is being used inside container ie copy of BrowserHistory

  useEffect(() => {
    // pass in a configuration object after the ref
    const { onParentNavigate } = mount(ref.current, {
      // tells the auth app the initial starting path for its memory history
      initialPath: history.location.pathname,
      // pass an object here in case we need to add more options in future
      // the event listener inside marketing app will pass a location object with a pathname property to the navigate function that gets called inside the listener
      onNavigate: ({ pathname: nextPathName }) => {
        //console.log("The container noticed navigation inside Marketing");

        const { pathname } = history.location; // get the path that we are currently at inside browser history

        // this prevents an infinite loop between updates to and fro with browser and memory history objects
        if (pathname !== nextPathName) {
          history.push(nextPathName); // hey history object, we want to navigate to nextPathName value, this syncs the paths between the history and memory objects
        }
      },
      // onSignIn: () => {
      //   onSignIn();
      // },
      onSignIn, // this is equivalent to and a collapsed version of the above code snippet
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
