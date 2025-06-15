import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../requestMethods";
import axios from "axios";


export const addtocart = createAsyncThunk("addtocart", async (payload, {rejectWithValue})=>{

    // console.log(payload,"from cart action page")

    const response = await userRequest.post(`/cart/add/${payload.userID}`,payload)
    try {
        const result = response.data.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const getcart = createAsyncThunk("getcart", async (userID, {rejectWithValue})=>{

    const response = await userRequest.get(`/cart/user/${userID}`)
    try {
        const result = response.data.data
        // console.log(result,"result")
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const deletecart = createAsyncThunk("deletecart", async (payload, {rejectWithValue})=>{

    const response = await userRequest.delete(`/cart/delete/${payload._id}`)
    try {
        const result = response.data.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updatecart = createAsyncThunk("updatecart", async (payload, {rejectWithValue})=>{

    const response = await userRequest.patch(`/cart/update/${payload._id}`, payload)
    try {
        const result = response.data.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const checkout = createAsyncThunk("checkout", async (payload,{rejectWithValue})=>{
    // console.log("heelo")
    const key = await axios.get(`${import.meta.env.VITE_BASE_URL}/checkout/getkey`)
    // console.log(key.data.key,"key")
    // console.log("world")

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/checkout/payment`, payload)
    // console.log(response,"response")

    try {
        const result = response.data.data
        // console.log(result)
       const options = {
  key: key.data.key,
  amount: result.order.amount * 100,
  currency: "INR",
  name: "Shopville",
  description: "Razorpay Transaction",
  image: "https://cdn5.vectorstock.com/i/1000x1000/84/09/sv-letter-logo-design-with-shopping-bag-icon-vector-35768409.jpg",
  order_id: result.order.id,
  notes: {
    address: "Shopville pvt ltd"
  },
  theme: {
    color: "#4c0a42"
  },
  handler: function (response) {
    // ✅ this gets triggered ONLY if payment is successful
    console.log("Payment successful:", response);
    localStorage.setItem("payment_id", response.razorpay_payment_id);
    
    // ✅ Redirect to orders page after successful payment
    window.location.assign("https://vocal-macaron-fbb37c.netlify.app/orders");
  },
  prefill: {
    name: payload.name,
    email: payload.email,
    contact: payload.phone
  }
};

const razor = new window.Razorpay(options);
razor.open();


        // console.log(result, "result")
        return result;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})



















