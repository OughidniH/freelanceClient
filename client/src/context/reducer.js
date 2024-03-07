const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_LOGIN":
      return { ...state, openLogin: true };
    case "CLOSE_LOGIN":
      return { ...state, openLogin: false };

    case "START_LOADING":
      return { ...state, loading: true };
    case "END_LOADING":
      return { ...state, loading: false };

    case "UPDATE_ALERT":
      return { ...state, alert: action.payload };

    case "UPDATE_PROFILE":
      return { ...state, profile: action.payload };

    case "UPDATE_USER":
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    case "UPDATE_IMAGES":
      console.log("Action Payload:", action.payload);
      return { ...state, images: [...state.images, ...action.payload] };
    case "DELETE_IMAGE":
      return {
        ...state,
        images: state.images.filter((image) => image !== action.payload),
      };
    case "UPDATE_DETAILS":
      return { ...state, details: { ...state.details, ...action.payload } };
    case "UPDATE_LOCATION":
      return { ...state, location: action.payload };
    case "UPDATE_UPDATED_ROOM":
      return { ...state, updatedRoom: action.payload };
    case "UPDATE_DELETED_IMAGES":
      return {
        ...state,
        deletedImages: [...state.deletedImages, ...action.payload],
      };
    case "UPDATE_ADDED_IMAGES":
      return {
        ...state,
        addedImages: [...state.addedImages, ...action.payload],
      };
    ////
    case "RESET_ROOM":
      return {
        ...state,
        images: [],
        details: {
          title: "",
          description: "",
          price: 0,
          type: "",
          costType: "rent",
          propertyType: "",
          numberOfRooms: 0,
          surfaceArea: 0,
          facilities: {},
        },
        location: { lng: 0, lat: 0 },
        updatedRoom: null,
        deletedImages: [],
        addedImages: [],
      };

    case "UPDATE_ROOMS":
      return {
        ...state,
        rooms: action.payload,
        addressFilter: null,
        priceFilter: 25000000,
        filteredRooms: applyFilter(
          action.payload,
          state.addressFilter,
          25000000,
          state.details.costType,
          state.details.propertyType,
          state.details.numberOfRooms,
          state.details.surfaceArea
        ),
      };

    case "FILTER_PRICE":
      return {
        ...state,
        priceFilter: action.payload,
        filteredRooms: applyFilter(
          state.rooms,
          state.addressFilter,
          action.payload,
          state.details.costType,
          state.details.propertyType,
          state.details.numberOfRooms,
          state.details.surfaceArea
        ),
      };

    case "FILTER_ADDRESS":
      return {
        ...state,
        addressFilter: action.payload,
        filteredRooms: applyFilter(
          state.rooms,
          action.payload,
          state.priceFilter,
          state.details.costType,
          state.details.propertyType,
          state.details.numberOfRooms,
          state.details.surfaceArea
        ),
      };

    case "CLEAR_ADDRESS":
      return {
        ...state,
        addressFilter: null,
        priceFilter: 25000000,
        filteredRooms: applyFilter(
          state.rooms,
          null,
          25000000,
          state.details.costType,
          state.details.propertyType,
          state.details.numberOfRooms,
          state.details.surfaceArea
        ),
      };

    /////
    case "UPDATE_ROOM":
      return { ...state, room: action.payload };

    case "UPDATE_USERS":
      return { ...state, users: action.payload };
    case "DELETE_ROOM":
      return {
        ...state,
        rooms: state.rooms.filter((room) => room._id !== action.payload),
      };

    case "UPDATE_SECTION":
      return { ...state, section: action.payload };

    default:
      throw new Error("No matched action!");
  }
};

export default reducer;

const applyFilter = (
  rooms,
  address,
  price,
  costType,
  propertyType,
  numberOfRooms,
  surfaceArea
) => {
  let filteredRooms = rooms;
  if (address) {
    const { lng, lat } = address;
    filteredRooms = filteredRooms.filter((room) => {
      const lngDifference = Math.abs(lng - room.lng);
      const latDifference = Math.abs(lat - room.lat);
      return lngDifference <= 1 && latDifference <= 1;
    });
  }

  if (price < 50000000) {
    filteredRooms = filteredRooms.filter((room) => room.price <= price);
  }
  if (costType) {
    filteredRooms = filteredRooms.filter((room) => room.costType === costType);
  }
  if (propertyType) {
    filteredRooms = filteredRooms.filter(
      (room) => room.propertyType === propertyType
    );
  }
  if (numberOfRooms) {
    filteredRooms = filteredRooms.filter(
      (room) => room.numberOfRooms === numberOfRooms
    );
  }
  if (surfaceArea) {
    filteredRooms = filteredRooms.filter(
      (room) => room.surfaceArea === surfaceArea
    );
  }

  return filteredRooms;
};
