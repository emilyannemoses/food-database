# Food Database

Live site: https://eamoses.github.io/food-database/

Using the GAS Stack API, I hooked this up to a Google Sheet that holds the types of foods I currently have in my kitchen, and the amounts of each food, and displays them according to category.

When you check one food off, it strikes a line thru on the UI and removes it from the Google Sheet permanently.

It is possible to update the sheet with the amounts of each type of food.

I can add foods to the Google Spreadsheet DB via the UI.

It’s helpful as long as I keep it up to date when I go shopping!

### Potential Updates

* It would be neat to use the Unsplash API to frequently display a different food picture as the background.

* Create CSS variables for things I'm using often, fonts, sizing and colors

### Lessons Learned

A few rough patches include handling the data as-is when it comes in from the Google Spreadsheet. The API I'm using is attaching a `'` character to each cell, and I've had to handle the character to make sure the UI "clumps" related data together regardless of how the user types it in.

Also with handling user input - since the inputs were allowing me to enter zeros as the "amount" I handled that in the `update` so it would be impossible to enter a food amount as `0`