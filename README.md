# machineLearningPrac

## Purpose
The purpose of this project was to get familiar with Django, React Redux, REST APIs, and implement a machine learning algorithm that I learned in the spring semester 2022 at Ohio State.

## Inspiration
The bulk of the application was from [this tutorial.](https://www.datagraphi.com/blog/post/2020/8/30/docker-guide-build-a-fully-production-ready-machine-learning-app-with-react-django-and-postgresql-on-docker)
However, a lot of the functions and tools used are now deprecated so I changed a lot of the React code to be up to date with React v18. Some of those changes include:
 - Using `useDispatch` and `useSelector` hooks instead of `connect` function
 - Using `<Routes>`, `<Route>`, and `<Navigate>` tags instead of `<Switch>` and `<Redirect to>` tags
 - Using `useNavigate` hook instead of `useHistory` and `useLocation`
  
The tutorial never states which React version they used but I would assume it was version 16 or earlier. Between then and now React components have converted a lot of class components to functional components. 
Overall, even though I used a lot of code from this tutorial, I learned a great deal about React Redux and basic authentication as well as React hooks.
  
## Installation instructions

Make sure you have these installed:
  - React v18 or later
  - Django v3 or later
  - Postgres 12
  - Python 3
  - Node v12 or later
 
To install:
  1. Pull the repository
  2. Run `python3 install -r requirements.txt` to get all the required python packages
  3. Make a postgres superuser
    - Run `sudo -u postgres psql`
    - Run this query `CREATE USER username SUPERUSER password 'passwordstring';`
  4. Navigate to `backend/django-app` then run the command `python manage.py runserver` to start the backend service
  5. In another terminal, navigate to `frontend/react-app` and run `npm start`

## Other Comments

This is not the original repo. The original repo can be found [here](https://github.com/Jack-Culley/machine-learning-prac). 
The original repo became corrupt when a git operation was interrupted. I tried many fixes but I decided to publish a new repo instead.
