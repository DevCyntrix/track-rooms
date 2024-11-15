# TrackRooms

## How to use the backend
### Start the database
1. Navigate into the backend folder: `cd backend`
2. Start the database docker container `docker-compose up -d`

### Start the backend
1. Rename the `.env.example` file to `.env`
2. Start the backend: `yarn start:dev` or `npm run start:dev`
3. Test the backend:
    * Open the Swagger UI: [http://localhost:3000](http://localhost:3000)
    * Test the backend endpoints with the swagger ui