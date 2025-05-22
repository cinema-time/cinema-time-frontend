

Fix security risks with user.routes:

[x] endpoint GET /users
[ ] endpoint  GET /users/:id -- delete it
[ ] endpoint  POST /users/ -- delete it
[ ] endpoints U + D:
    a) delete them :)
    b) change them so that it only allows to U / D current user (see example below)

router.put("/my-profile", isAutheticated, () => {
    const userId = req.payload._id;

    User.findByIdAndUpdate(userId)
        .then()
        .catch()

})




____________________


[ ] Create event: we need to store the list of participants
    [ ] backend:
        - modify the route (it will take a list of participants from req.body & use include that in the request to mongoose)
        - test with Postman
        - commit
    [ ] frontend:
        - option a: https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select_multiple
        - option b: https://mantine.dev/core/multi-select/#usage


    
