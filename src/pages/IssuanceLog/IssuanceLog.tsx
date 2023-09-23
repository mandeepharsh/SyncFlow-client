import { useEffect, useState } from "react";
import IssuanceLogTable from "../../components/IssuanceLogTable/IssuanceLogTable";
import "./IssuanceLog.scss";
import { getIssuedMaterial } from "../../utils/api";
import { IssuedMaterialLog } from "../../model";
import Loading from "../../components/Loading/Loading";
import TablesHeader from "../../components/TablesHeader/TablesHeader";

const IssuanceLog = () => {
  const [searchField, setSearchField] = useState<string>("");
  const [issuedMaterials, setIssuedMaterials] = useState<IssuedMaterialLog[]>();
  useEffect(() => {
    const fetchIssuedMaterials = async () => {
      const { data } = await getIssuedMaterial();
      setIssuedMaterials(data);
    };
    fetchIssuedMaterials();
  }, []);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setSearchField(value);
  };

  if (!issuedMaterials) return <Loading />;

  // materinal number is the id of the material
  const filteredArray = issuedMaterials.filter((material) => {
    return material.material_number
      .toLowerCase()
      .includes(searchField.toLowerCase());
  });

  return (
    <section className="issuance-log">
      <TablesHeader
        title="Issuance Log"
        searchField={searchField}
        onChangeHandler={onChangeHandler}
      />

      <div className="issuance-log-table">
        <div className="issuance-log-table__header">
          <p className="issuance-log-table__title">MATERIAL NUMBER</p>
          <p className="issuance-log-table__title">Quantity</p>
          <p className="issuance-log-table__title">Size</p>
          <p className="issuance-log-table__title">Time Issued</p>
          <p className="issuance-log-table__title">Date Issued</p>
          <p className="issuance-log-table__title">Employees Issued</p>
        </div>
        <IssuanceLogTable issuedMaterial={filteredArray} />
      </div>
    </section>
  );
};

export default IssuanceLog;
