# Project Name

- Pos-System
## Built With

- Next.js
- Material-ui


## Getting Started

- Clone the project and cd into the directory. Run ```npm install``` to install dependencies and ```npm run dev``` to start the application in your browser.


## TODO

add a PAID button to completed orders view (complete)
create a new page called PAID (show only orders set as paid from complete page)

on the kitchen page, use the time to create a counter. count up from the time of creation to now.

using the timer, change the color of the card based on the time. start light green, go to yellow, then orange, then red. should be RED by the time the timer hits 20 minutes. Should be a gradient of colors

add option to placing order > take away, for here, delivery < if delivery selected, set a location
add customer name to order (optional)
make phone number optional, but phone number or customer name must be chosen to identify order
allow custom country code to be typed (only show countries in east africa, but allow country code to be typed.)

use enter button to submit order from create order (phone keyboard/computer keyboard)

create a ORDER page to see only one order at a time including ALL information < this will be the source of truth on a particular order.

if an order is delivery it should have an address
create a TO DELIVER (show all orders set for delivery whether complete or incomplete but not sent, show paid status, order by time ordered),
create a SENT page (show time sent, driver phone number and name, and important order info)
create a DELIVERED page (paid status, driver name, cost, cook time, delivery time, time from order to delivery) page - show status of Paid/not paid

Once an order is completed, delivered, and paid, send it to the CONFIRM page < include button CONFIRM  

Once an order is confirmed, send it to the accounting page < essentially the confirm page is a double entry accounting technique. One person confirms the money is there and the order is done, the next person cofirms that the money is there and does the accounting from there to detremine taxes, profits, etc. This Accounting page will require a lot more work but I'm not really sure how it looks. Will probably need to be able to do some filtering, show some fancy graphs, and calculate profit/loss, taxes, etc.
