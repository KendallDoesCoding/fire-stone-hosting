import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Elements } from 'react-stripe-elements';
import { Plan, plans } from '../data/plans';
import { useNavigate, useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

let error = '';

const PaymentDetails = () => {
  const params = useParams();
  const planId = params.planId!;
  const [plan, setPlan] = useState<Plan>(() => {
    return plans.find((p) => p.plan === planId)!;
  });

  return (
    <div className="container mt-4 header-offset">
      <div className="row">
        <div className="col-md-6 mt-2">
          <h1>Payment Details</h1>
        </div>
        <div className="col-md-6">
          <div className="shadow-sm p-3 pt-4 bg-info text-white rounded">
            <h6>
              Selected Plan:{' '}
              <img
                src={plan.imageSrc}
                style={{ width: '30px' }}
              />{' '}
              {plan.name}, {plan.memory} GB, ${' '}
              {(plan.memory * 3).toFixed(2)} / month
            </h6>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          {error && (
            <div
              className="alert alert-danger"
              role="alert"
            >
              <div className="row">
                <div className="col-md-1 text-center">
                  <FontAwesomeIcon
                    size="lg"
                    icon="exclamation-circle"
                  />
                </div>
                <div className="col-md-11">{error}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Elements>
        <CheckoutForm stripe={null} planId={planId} />
      </Elements>
    </div>
  );
};

export default PaymentDetails;
