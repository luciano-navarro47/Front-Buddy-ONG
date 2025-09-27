# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

# DEPLOY WITH CLOUD RUN + DOCKER

- Pasos para desplegar en Cloud Run

1. Asegúrate de tener tu Dockerfile y nginx.conf en la raíz del repo frontend.

2. Haz build y test local:

    ```docker build -t front-buddy-ong:{newTag, e.g: 1.0.0} .```

    ```docker run -p 8080:8080 front-buddy-ong:{newTag, e.g: 1.0.0}```

- Luego abre 👉 http://localhost:8080

3. a) Login a Docker Hub (te pedirá password)

    ```docker login```

- Opcional Tag correcto de la imagen. Docker necesita que la imagen tenga tu usuario en el nombre.

    ```docker tag front-buddy-ong:1.0.0 lucianonavarro47/front-buddy-ong:1.0.0```

- b) Push al repo de Docker Hub

    ```docker push docker.io/miusuario/front-buddy-ong:{newTag,. e.g.: 1.0.0}``` 
