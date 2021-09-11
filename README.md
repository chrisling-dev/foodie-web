# Write an application for Food Delivery

- [x] User must be able to create an account and log in.
- [x] Implement 2 roles with different permission levels
  - Regular User: Can see all restaurants and place orders from them
  - Restaurant Owner: Can CRUD restaurants and meals
- [ ] A Restaurant should have a name and description of the type of food they serve
- [ ] A meal should have a name, description, and price
- [ ] Orders consist of a list of meals, date, total amount and status
- [ ] An Order should be placed for a single Restaurant only, but it can have multiple meals
- [ ] Restaurant Owners and Regular Users can change the Order Status respecting below flow and permissions:
  - Placed: Once a Regular user places an Order
  - Canceled: If the Regular User cancel the Order
  - Processing: Once the Restaurant Owner starts to make the meals
  - In Route: Once the meal is finished and Restaurant Owner marks it's on the way
  - Delivered: Once the Restaurant Owner receives information that the meal was delivered by their staff
  - Received: Once the Regular User receives the meal and marks it as Received
- [ ] Status should follow the sequence as stated above, and not allowed to move back
- [ ] Status can not be changed by a different user than is stated above
- [ ] Orders should have a history about the date and time of the status changing
- [ ] Both Regular Users and Restaurant Owners should be able to see a list of the orders
- [ ] Restaurant Owners have the ability to block a User

## Regular User flows (Screens)

- [x] Sign In
- [x] Create Account
- [ ] Profile (Can permanently switch to Restaurant Role from Profile)
- [ ] Explore (Browse list of restaurants and their food)
- [ ] Restaurants' meals (When user clicks into a restaurant, they can see all food offered by the restaurant)
- [ ] Cart (If user tries to add food from a different restaurant to cart, show a prompt that asks if user is ok if we clear his current cart)
- [ ] Order History Page
- [ ] Saved Restaurants

## Restaurant Owners flows

- [ ] Restaurant dashboard
- [ ] Add meal
- [ ] Edit meal
- [ ] My orders (Filter by status)
- [ ] Order details

# Project Structure

> - **src** // root of project
>   - **\_\_generated\_\_** // Apollo generated types for GraphQL
>   - **components** // UI components
>   - **context** // context stores
>   - **hooks** // who doesn't like hooks lol
>   - **pages** // all the pages
>   - **router** // routers like signedInRouter and signedOutRouter
>   - **styles** // styles and configuration, mostly tailwind stuffs
>   - **utils** // things I don't know where to put
