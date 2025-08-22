import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { agreementsId } = useParams();
  console.log(agreementsId);
  const [error, setError] = useState("");
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  const { isPending, data: agreementsInfo = {} } = useQuery({
    queryKey: ["agreements", agreementsId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements/${agreementsId}`);
      return res.data;
    },
  });

  if (isPending) {
    return (
      <span className="loading loading-ring loading-xl text-center "></span>
    );
  }
  console.log(agreementsInfo);
  const amount = agreementsInfo?.data?.rent || 0;
  const amountInCents = amount * 100;
  console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("payment method", paymentMethod);
    }

    // create payment intent
    const res = await axiosSecure.post("/create-payment-intent", {
      amount: amountInCents, // ✅ change the name
      agreementsId,
    });

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });

    if (result.error) {
      setError(result.error.charge.message);
      
    } else {
      setError('');
      if (result.paymentIntent.status === "succeeded")
        console.log("Payment succeeded!");
      const transactionId = result.paymentIntent.id;
      // crate agreements payment history
       const paymentData = {
        agreementsId,
        email: user.email,
        amount,
        transactionId:transactionId,
        paymentMethod: result.paymentIntent.payment_method_types,

       }
       const paymentRes = await axiosSecure.post('/payments',paymentData);
       if(paymentRes.data.insertedId){
             // show sweetAlert with transaction ID
             await Swal.fire({
              icon: 'success',
              title:' payment successfully',
              html:` <strong>Transaction ID</strong> <code>${ transactionId}</code>  `,
              confirmButtonText: ' Go to My agreement ',
          
             });
             //Redirect to my apartment
             navigate('/dashboard/myApartment');
       }
    }

    console.log("res from intent", res);
  };

  return (
    <div className="mt-28">
      <form
        onSubmit={handleSubmit}
        className="spa-y-4 bg-amber-100 p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded "></CardElement>
        <button
          type="submit"
          className="btn btn-success w-full mt-4"
          disabled={!stripe}
        >
          Pay <strong className="">৳{amount} </strong>For Apartment
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
