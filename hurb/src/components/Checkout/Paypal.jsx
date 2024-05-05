import { useRef, useEffect } from 'react'

export default function Paypal({handlePaypalOrder, totalAmount}) {

    const paypal = useRef();

    useEffect(() => {
        const paypalButton = window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Hurb Ecommerce Item",
                            amount:{
                                currency_code: "USD",
                                value: totalAmount,
                            },
                        },
                    ],
                });
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                handlePaypalOrder(order);
                console.log(order);
            },
            onError: (err) => {
                console.log(err);
            },
        });

        paypalButton.render(paypal.current);

        return () => {
            try {
                paypalButton.close();
            } catch (error) {
                console.error("Error closing PayPal button:", error);
            }
        };
    }, []);



  return (
    <div>
        <div ref={paypal}></div>
    </div>
  )
}
