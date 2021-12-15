import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plan, plans } from '../data/plans';
import { ConfigurationContext } from './Dashboard/context/ConfigurationContext';
// import { useNavigate, useParams } from 'react-router-dom';

export const PickVersionPage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const planId = params.planId;
  const [plan] = useState<Plan>(() => {
    return plans.find((p) => p.plan === planId)!;
  });
  const { configuration, setConfiguration } = useContext(
    ConfigurationContext
  )!;

  const confirmConfiguration = () => {
    navigate(`/plans/${planId}/purchase`);
  };

  return (
    <div className="container header-offset">
      <div className="row">
        <div className="col-md-6">
          <h1>Configure Server</h1>
          <div className="form-group">
            <label>Minecraft Version</label>
            <select
              className="form-control"
              value={configuration?.version}
              onChange={(e) => {
                setConfiguration({
                  ...configuration,
                  version: e.target.value,
                });
              }}
            >
              <option value="">- Select -</option>
              <option value="1.18.1">1.18.1</option>
              <option value="1.17.1">1.17.1</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => {
              confirmConfiguration();
            }}
            className="btn btn-outline-primary mt-2 w-100"
          >
            Continue
          </button>
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
    </div>
  );
};
