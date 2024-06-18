# Task 2

I am going to provide answers to the questions in an orderly manner, but below you can see all the steps I followed step by step (which also are the commit messages) to sorta answer all questions and improve and/or fix on the codebase.

## What do you think is wrong with the code, if anything?

The code uses nested callbacks, which makes it hard to read and maintain. Error handling is inconsistent and not comprehensive. There are also logic errors in checking the existence of invitation IDs and potential for sending multiple responses.

## Can you see any potential problems that could lead to exceptions

- Missing error handling for the initial `superagent.post` request.
- Nested callbacks leading to callback hell.
- Somewhat confusing logic for checking existence in arrays (`indexOf` usage).
- Not using transactions to ensure atomicity of operations
- The logic that we transformed into addInvitationToShop was doing a wrong check up of shop.invitations

## How would you refactor this code to:

### Make it easier to read

- Use async/await instead of nested callbacks.
- Modularize the code into smaller functions.
- Use ES6 features like destructuring

### Increase code reusability

- Create separate functions for finding or creating a user, adding an invitation to the shop, and adding a user to the shop.

### Improve the stability of the system

- Implement consistent and comprehensive error handling.
- Use MongoDB transactions to ensure atomicity of operations.

### Improve the testability of the code

- Modularize functions to enable unit testing.
- Use dependency injection for the models and external requests.

## How might you use the latest JavaScript features to refactor the code?

- Use async/await for asynchronous operations.
- Use `const` and `let` instead of `var`.
- Use destructuring for object properties.
- Use default and named exports for module management.

## Step by step process

1. Change variables from 'var' to 'const' following the latest ECMAScript
2. Make function async and use await on the first POST request to the authURL. async/await is just syntax sugar but it still far more legible.
3. Instead of using callback on upsert of user, we return it (by means of using new: true) as a variable and make changes.
4. Move the upsert of user to a self contained function. Easier for testing, easier for legibility. Make use of the deconstruction of params aka const { authId } = ... instead of chain calling props. Use 'self referenced' object keys aka instead of { authId: authId } just use { authId }
5. In step 3, we removed the callback which is the last argument in favour of an async/await approach. For the Shop findById we remove the .exec call in favour of the same approach.
6. Remove 'err' from response status if no shop available
7. Fixed an issue with the code as it would not work. It was checking if the invitation already exists in shop.invitations and if so, push it to the array. It should add it to the array if it DOES NOT exist.
8. Move logic of previous step into its own function.
9. Change use of .indexOf to .includes for better readibility
10. Do the same for adding user to array of users in shop. Make function, use includes instead of indexOf.
11. Await for saving the shop model.
12. Fix another issue where response was returning the invitationResponse fully instead of its body. Make both cases 201 and 200 return their response. But still keep the last one in case the status is not 201 nor 200. Also, remove the 'else' from the status 200 because if everything goes OK it will return early.
13. Completely personal, but I like to use a "guard" approach. Status 200 does nothing and returns early, thus it should be on top and status 201 should follow.
14. Extract auth_url outside of function because it is (at least here) a constant, thus also changing its name to uppercase to indicate it is a value that doesn't change dynamically.
15. Use deconstruction for request
16. Completely personal, I like to not shorten names aka req becomes request and res becomes response.
17. Instead of exporting using exports. we just definy a function and export it both like the default and an object so that we can use modules and import it as import {inviteUser } from ... or import inviteUser from ... instead of require(...)
18. Add imports of superagent and models (at least to show how it would have been instead)
19. Wrap entire function in try/catch so if any error is thrown we can control it.
20. Wrap findOrCreateUser in a try/catch too as it performs a database operation and could fail.
21. Because we are performing database writes and updates, we use transactions to make sure that if something goes wrong, we don't make previous changes persistent, if it nothing goes wrong, we do
