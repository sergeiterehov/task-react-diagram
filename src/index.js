import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { fetchDashboard } from './api';
import { Diagram } from './Diagram';
import './index.css';


const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [dashboard, setDashboard] = useState();
   

    useEffect(() => {
        setIsLoading(true);

        fetchDashboard()
            .then(setDashboard)
            .catch(() => setDashboard(undefined))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return (<div>Загрузка...</div>);

    return (
        <div className="dashboard">
            {dashboard.widgets.map((widget) => {
                return (
                    <div key={widget.id} className="widget">
                     

                        <Diagram widget={widget}   />

                     
                    </div>
                );
            })}
        </div>
    );
};

ReactDOM.render(
	<Dashboard />,
  document.querySelector("#root"),
);
