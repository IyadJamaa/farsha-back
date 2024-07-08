const Bills = require( "../models/billsModel.js");

// for add or fetch
//  const getBillsController = async (req, res) => {
//     try {

//         const bills = await Bills.find();
//         res.send(bills);

//     } catch(error) {
//         console.log(error);
//     }
// }


const getBillsController = async (req, res) => {
  try {
    // Fetch the bills and sort them by createdAt in descending order
    const bills = await Bills.find().sort({ createdAt: -1 });

    res.send(bills);
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred while fetching bills');
  }
};



//for add
 const addBillsController = async (req, res) => {

    try {

        const newBills = new Bills(req.body);
        await newBills.save();
        res.send("Bill Created Successfully!");

    } catch(error) {
        console.log(error);
    }

}
const updateBillController = async (req, res) => {
  try {
      const { id } = req.params;
      const updatedBillData = req.body;

      const updatedBill = await Bills.findByIdAndUpdate(id, updatedBillData, { new: true });

      if (!updatedBill) {
          return res.status(404).json({ message: 'Bill not found' });
      }

      res.status(200).json({ message: 'Bill updated successfully', updatedBill });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteBillController = async (req, res) => {
    try {
      const deletedBill = await Bills.findByIdAndDelete(req.params.id);
      if (!deletedBill) {
        return res.status(404).json({ message: "Bill not found" });
      }
      res.json({ message: "Bill deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  const deleteBillsForDayController = async (req, res) => {
    try {
      const date = new Date(req.params.date);
      date.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      
      const deletedBills = await Bills.deleteMany({ createdAt: { $gte: date, $lte: endDate } });
      if (deletedBills.deletedCount === 0) {
        return res.status(404).json({ message: "No bills found for the specified day" });
      }
      res.json({ message: "All bills for the day deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  const addproductbills = async (req, res) => {
    const billId = req.params.id; // Remove parseInt as bill ID might not be an integer
    try {
      const bill = await Bills.findById(billId); // Use findById to find the bill by ID
      if (!bill) {
        return res.status(404).json({ error: 'Bill not found' });
      }
      res.json(bill.products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
module.exports={addBillsController,getBillsController,updateBillController,deleteBillController,deleteBillsForDayController,addproductbills}