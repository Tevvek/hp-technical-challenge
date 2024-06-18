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
