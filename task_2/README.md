1. Change variables from 'var' to 'const' following the latest ECMAScript
2. Make function async and use await on the first POST request to the authURL. async/await is just syntax sugar but it still far more legible.
3. Instead of using callback on upsert of user, we return it (by means of using new: true) as a variable and make changes.
