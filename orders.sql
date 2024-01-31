-- orders
[
{ _id: 0, productName: "Steel beam", status: "new", quantity: 10 },
{ _id: 1, productName: "Steel beam", status: "urgent", quantity: 20 },
{ _id: 2, productName: "Steel beam", status: "urgent", quantity: 30 },
{ _id: 3, productName: "Iron rod", status: "new", quantity: 15 },
{ _id: 4, productName: "Iron rod", status: "urgent", quantity: 50 },
{ _id: 5, productName: "Iron rod", status: "urgent", quantity: 10 }
]

-- Output
[
    { _id: "Steel beam", totalUrgentquantity: 50 },
    { _id: "Iron rod", totalUrgentquantity: 60}
]



// Stage 1: Filter - Urgent orders

Select * from Orders where status = "urgent";

[
{ _id: 1, productName: "Steel beam", status: "urgent", quantity: 20 },
{ _id: 2, productName: "Steel beam", status: "urgent", quantity: 30 },
{ _id: 4, productName: "Iron rod", status: "urgent", quantity: 50 },
{ _id: 5, productName: "Iron rod", status: "urgent", quantity: 10 }
]

// Stage 2: Group - In each product find totalUrgentquantity

Select productName as _id, sum(quantity) as totalUrgentquantity from Orders 
where status = "urgent"
group by productName

-- Output
[
    {_id: "Steel beam", totalUrgentquantity: 50 },
    {_id: "Iron rod", totalUrgentquantity: 60 }
]

db.orders.insertMany([
{ _id: 0, productName: "Steel beam", status: "new", quantity: 10 },
{ _id: 1, productName: "Steel beam", status: "urgent", quantity: 20 },
{ _id: 2, productName: "Steel beam", status: "urgent", quantity: 30 },
{ _id: 3, productName: "Iron rod", status: "new", quantity: 15 },
{ _id: 4, productName: "Iron rod", status: "urgent", quantity: 50 },
{ _id: 5, productName: "Iron rod", status: "urgent", quantity: 10 }
])