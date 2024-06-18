1. Change variables from 'var' to 'const' following the latest ECMAScript
2. Make function async and use await on the first POST request to the authURL. async/await is just syntax sugar but it still far more legible.
3. Instead of using callback on upsert of user, we return it (by means of using new: true) as a variable and make changes.
4. Move the upsert of user to a self contained function. Easier for testing, easier for legibility. Make use of the deconstruction of params aka const { authId } = ... instead of chain calling props. Use 'self referenced' object keys aka instead of { authId: authId } just use { authId }
5. In step 3, we removed the callback which is the last argument in favour of an async/await approach. For the Shop findById we remove the .exec call in favour of the same approach.
6. Remove 'err' from response status if no shop available
