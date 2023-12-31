// TOOLS
import { useEffect, useState } from "react";
// Components
import WorkOrderPageHeader from "../../components/WorkOrderPageHeader/WorkOrderPageHeader";
import WorkOrderTableRow from "../../components/WorkOrderTableRow/WorkOrderTableRow";
import { WorkOrder } from "../../model";

import "./WorkOrderPage.scss";
import { getAllWorkOrders } from "../../utils/api";
import Loading from "../../components/Loading/Loading";
import TablesHeader from "../../components/TablesHeader/TablesHeader";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const WorkOrderPage = () => {
  const { auth } = useAuth();
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>();
  const [searchField, setSearchField] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    try {
      const fetchWorkOrders = async () => {
        const authToken = auth.accessToken;
        const response = await getAllWorkOrders(authToken, axiosPrivate);
        setWorkOrders(response);
      };
      fetchWorkOrders();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!workOrders) {
    return <Loading />;
  }

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(event.target.value);
  };
  const filteredArray = workOrders.filter((eachOrder) => {
    return eachOrder.project_name
      .toLowerCase()
      .includes(searchField.toLowerCase());
  });

  return (
    <section className="container">
      <TablesHeader
        title="WorkOrders"
        searchField={searchField}
        onChangeHandler={onChangeHandler}
      />

      <div className="container__card">
        <div className="container__card__overflow">
          <WorkOrderPageHeader />
          <div className="container__card__content">
            {filteredArray.map((workOrder) => {
              return (
                <WorkOrderTableRow
                  workOrder={workOrder}
                  key={workOrder.work_order_id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkOrderPage;
