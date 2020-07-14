import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Success = () => {
  const [session, setSession] = useState({});
  const location = useLocation();
  const sessionId = location.search.replace('?session_id=', '');

  useEffect(() => {
    async function fetchSession() {
      setSession(
        await fetch(
          process.env.REACT_APP_BE_API +
            'checkout-session?sessionId=' +
            sessionId
        ).then((res) => res.json())
      );
    }
    fetchSession();
  }, [sessionId]);

  return (
    <div className='sr-root'>
      <div className='sr-main'>
        <div className='sr-payment-summary completed-view'>
          <h1>Your payment succeeded</h1>
          <h4>View CheckoutSession response:</h4>
        </div>
        <div className='sr-section completed-view'>
          <div className='sr-callout'>
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </div>
          <Link to='/'>Restart demo</Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
