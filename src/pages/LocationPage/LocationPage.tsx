import { useEffect, useState } from "react";
import "./LocationPage.scss";
import LocationComponent from "../../components/LocationComponent/LocationComponent";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Locations, Material } from "../../model";
import {
  getLocations,
  getRecievedMaterialonLcoation,
  updateMaterialLocation,
} from "../../utils/api";
import Loading from "../../components/Loading/Loading";
interface LocationContainer {
  location: Locations;
  materials: Material[];
}

const LocationPage = () => {
  const [locations, setLocations] = useState<LocationContainer[]>();
  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    const fetchLocaionsMaterial = async () => {
      const locations = await getLocations();
      const materialsOnLocation = await locations.map(
        async (location: Locations) => {
          const materials = await getRecievedMaterialonLcoation(
            location.location
          );
          return {
            location: location,
            materials: materials,
          };
        }
      );
      const materialWithLocations = await Promise.all(materialsOnLocation);
      setLocations(materialWithLocations);
    };
    fetchLocaionsMaterial();
  }, []);

  if (!locations) return <Loading />;

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const updatedLocation: LocationContainer[] = [...locations];
    const sourceLocation = updatedLocation.find(
      (loc) => loc.location.location === source.droppableId
    );
    const destinationLocation = updatedLocation.find(
      (loc) => loc.location.location === destination.droppableId
    );

    if (
      !sourceLocation ||
      !destinationLocation ||
      destinationLocation.materials.length >= 10
    ) {
      setIsLimitReached(true);
      setTimeout(() => setIsLimitReached(false), 5000);
      return;
    }

    const [removed] = sourceLocation.materials.splice(source.index, 1);
    destinationLocation.materials.splice(destination.index, 0, removed);
    setLocations(updatedLocation);

    // axios req to update material location
    updateMaterialLocation(draggableId, {
      location: Number(destinationLocation.location.location_id),
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className="location-table">
        <h1 className="location-table__heading">
          Geographical Material Mapping
        </h1>
        <div className="location-table__componnets">
          {locations.map((eachLocation) => {
            return (
              <LocationComponent
                location={eachLocation.location.location}
                materials={eachLocation.materials}
                key={eachLocation.location.location_id}
              />
            );
          })}
          {isLimitReached && (
            <div
              className={`notification ${
                isLimitReached ? "" : "notification-hidden"
              }`}
            >
              There is not enough space at this location
            </div>
          )}
        </div>
      </section>
    </DragDropContext>
  );
};

export default LocationPage;
