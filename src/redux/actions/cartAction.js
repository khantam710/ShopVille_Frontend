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
            key: key.data.key, // Enter the Key ID generated from the Dashboard
            amount: result.order.amount * 100, // Amount is in currency sub-units. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Shopville",
            description: "Razorpay Transaction",
            image: "https://cdn5.vectorstock.com/i/1000x1000/84/09/sv-letter-logo-design-with-shopping-bag-icon-vector-35768409.jpg",
            order_id: result.order.id, //Pass the `id` obtained in the response of Step 1
            userID: result.userID,
            callback_url: "https://shopville-server.onrender.com/shopville/checkout/verify",
            notes: {
                address: "Shopville pvt ltd"
            },
            theme: {
                color: "#4c0a42"
            },
            //  handler: function (response) {
            // // window.location.href = `https://vocal-macaron-fbb37c.netlify.app/order-success?payment_id=${response.razorpay_payment_id}`;
            // localStorage.setItem("paymentSuccess", "true");
            // // Redirect to orders page
            //  window.location.href = "https://vocal-macaron-fbb37c.netlify.app/orders";
            //  }
        };
        var razor = new window.Razorpay(options);

        razor.open();
        // console.log(result, "result")
        return result;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})



















