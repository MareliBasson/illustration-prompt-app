# Netlify deployment:
https://illustration-prompt-app.netlify.app/

# Tutorials used to build this

### Firebase CRUD tutorial

Firebase setup tutorial: https://dev.to/satansdeer/firebase-react-crud-tutorial-how-to-use-firebase-firestore-with-reactjs-g7m

Menu base: https://codepen.io/lbebber/pen/pvwZJp?editors=0100

### Netlify Notes

#### Deployments

** Environment variables that need to be set **
`NODE_VERSION` = 14.16.0
`NPM_VERSION` = 6.14.11

** Misc **
`CI=''` part of the build command - allows a build to pass even if there's warnings
