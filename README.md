# To-Do
to-do app




## After adding database to the app.
> we have gone a problem, when starting server every time it adds default items.So I thought let go for if database is empty : good  but couldn't find it helpful. Best one they suggest is to just check length of our db..... This was the intersting part of adding a database connection to app

## deleting an list item
Tried to it as Have done before in simple javascript 
> In Express.js, the concept of button clicks and event listeners is different from the client-side JavaScript approach. Express.js is a server-side framework for building web applications, and it doesn't directly handle button clicks like client-side JavaScript does.
then chatGpt clears it up.

Then it suggest : 
```
<button onclick="window.location.href='/button-click'">Click me</button>
```
```
app.get('/button-click', (req, res) => {
  // Perform any desired task here
  res.send('Button clicked!');
});
```
It not gonna work, because it only send request in the form form route, it gonna not be helpful because I want some data so that I can use to delete it from my DB.    

After detail explaination with code base. Got something intersting..
for deleting any particular item, the main factor is to get its id. So it come with great idea   

```
<form action="/delItem" method="post">
          <!-- Use a hidden input field to pass the item's ID to the server -->
          <input type="hidden" name="itemId" value="<%= item._id %>">
          <input type="checkbox" class="task" onclick="this.parentNode.submit()">
          <p><%= item.listItem %></p>
</form>
```
here it creates hiiden input field which contains item Id as value and uses checkbox as submit type , so that we can post request with Id .
>
![image](https://github.com/k1174/To-Do/assets/108426953/82fa2a0f-d5ba-45bb-8d24-773a634100a8)





