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

# 🚀 **Deploy automatizado con GitHub Actions (Cloud Run + Docker)**

Desde la versión v1.0.1, los despliegues del frontend de Buddy ONG se realizan automáticamente mediante GitHub Actions, eliminando la necesidad de construir imágenes y desplegar manualmente desde Docker Hub o la consola de GCP.

## 🧩 **Flujo general**

Cada vez que se crea un tag de versión (por ejemplo, v1.0.1.3) sobre la rama production, se dispara un flujo automatizado que:

Construye la imagen Docker del frontend usando el Dockerfile del repositorio.

Publica esa imagen en el Google Container Registry (GCR) asociado al proyecto de GCP.

Despliega automáticamente una nueva revisión del servicio cilent-buddy-ong en Cloud Run.

Actualiza el 100 % del tráfico al nuevo contenedor si el despliegue fue exitoso.

## 🧱 **Requisitos previos**

Antes de utilizar este flujo, asegurate de que:

- La rama production contiene la última versión estable del código.

- Las secrets necesarias están configuradas en GitHub (GCP_PROJECT_ID, GCP_SERVICE, GCP_REGION, GCP_SA_KEY, etc.).

- El archivo .github/workflows/release-deploy.yml está configurado correctamente (este archivo define el pipeline).

## 🧭 **Pasos para hacer un nuevo deploy**

1. **Actualizar el código en production**
```
git checkout production
git pull origin production
```


2. **Crear una rama de hotfix o feature (opcional)**
Si necesitás aplicar una corrección o mejora rápida:
```
git checkout -b hotfix/login-form-v1.0.1
# realizar cambios...
git commit -m "hotfix: improve login form autorizer logic"
git push -u origin hotfix/login-form-v1.0.1
```


Luego creá un Pull Request hacia production y mergealo una vez aprobado.

3. **Crear un nuevo tag de versión**
Una vez que production tiene los cambios listos:

```
git checkout production
git pull origin production
git tag -a v1.0.1.0 -m "release: improved login form + mobile responsivity"
git push origin v1.0.1.0
```


4. **Automáticamente se inicia el workflow**
GitHub Actions se encarga del resto:

- Compila la imagen Docker.
- La publica en GCR.
- Despliega en Cloud Run el servicio back-buddy-ong00.

5. **Verificar el despliegue**
Una vez finalizado el pipeline, podés revisar los logs:

- En GitHub → pestaña Actions → workflow de deploy correspondiente.
- En Google Cloud Console → Cloud Run → back-buddy-ong00 → Revisions
Allí vas a ver la nueva revisión con el tag que generaste (por ejemplo, v1.0.1.3).

## 🧰 **Variables de entorno configuradas en Cloud Run**

El servicio cilent-buddy-ong utiliza variables configuradas directamente desde la UI de Cloud Run (no se exponen en el repositorio).
Ejemplo:

### **Variable y Descripción**

1. REACT_APP_API_URL
2. REACT_APP_AUTH0_CLIENT_ID
3. REACT_APP_CLOUDINARY_NAME_PRESET
4. Otras env vars