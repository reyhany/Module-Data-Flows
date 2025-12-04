let order = [
  { itemName: "Hot cakes", quantity: 1, unitPricePence: 232 },
  { itemName: "Apple Pie", quantity: 2, unitPricePence: 139 },
  { itemName: "Egg McMuffin", quantity: 1, unitPricePence: 280 },
  { itemName: "Sausage McMuffin", quantity: 1, unitPricePence: 300 },
  { itemName: "Hot Coffee", quantity: 2, unitPricePence: 100 },
  { itemName: "Hash Brown", quantity: 4, unitPricePence: 40 },
];
 
let totalCost = 0;

order.forEach(orderItem => {
  const { itemName, quantity, unitPricePence } = orderItem;
  const itemTotal = (quantity * unitPricePence) / 100;
  totalCost += itemTotal;

  console.log(`${quantity} ${itemName} ${itemTotal.toFixed(2)}`);
});

console.log(`Total: ${totalCost.toFixed(2)}`);
