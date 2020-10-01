# React Outlier Quiz Challenge

## Introduction

This is just a project I took up on my free time, it was a challenge by a client to my friend for an interview. I got interested and started working on it

I changed it up a bit to my taste, if you like to see the original challenge follow the link
[Outlier Engineering React Quiz Challenge](https://github.com/outlier-org/challenge-quiz)

## Intructions

I don't know why you would like to run it locally but being a good sport here are the steps.

1. Clone the repository
2. Run **yarn** (alternatively you can use **npm install**)
3. Run **yarn start** (alternatively you can use **npm start**)

## Live Demo

I hosted it to netlify you can test your wit [here](https://outlier-quiz.netlify.app/).

## Future

I am no Sybill Trelawney, but hey its a good thing to me. But I plan to move it further with

- [ ] Add a backend probably firebase
- [ ] Add Error Toast
- [ ] Add Admin Panel that can register applicants and see the results 
- [ ] Mailing system to the registered applicant
- [ ] Authentication using magic link or auto-generate auto-expire credentials

### Personal Reference 

Docker command used during the development of the project

**docker run --user $(id -u):$(id -g) --name react -p 3000:3000 --rm -it -w /usr/src/app -v $(pwd):/usr/src/app node bash**
