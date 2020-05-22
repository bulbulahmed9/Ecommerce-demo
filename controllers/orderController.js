const Order = require("../model/orderModel");

const order = async (req, res) => {
  try {
    let id = req.user.id
    let userOrder = req.body
    let order = await Order.findOne({ user: id })
    console.log(order)

    if (order !== null) {
      let prevArr = order.orders
      let currentArr = userOrder
      order.orders = [...prevArr, ...currentArr]
      await order.save();
      return res.status(201).json({
        msg: "Order Successfull"
      })
    }
    else {
      order = new Order({
        user: id,
        orders: [...userOrder]
      })
      await order.save();
      res.status(201).json({
        msg: "Order Successfull"
      })
    }
  } catch (err) {
    console.log(err);
    res.send("Server Error");
  }
};

const getAllOrderByUser = async (req, res) => {
  const result = await Order.find({ user: req.user.id })
  res.json(result)
}

module.exports = { order, getAllOrderByUser };