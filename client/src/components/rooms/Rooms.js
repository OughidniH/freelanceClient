import {
  Avatar,
  Card,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip,
} from "@mui/material";
import { useValue } from "../../context/ContextProvider";
import { StarBorder } from "@mui/icons-material";

const Rooms = () => {
  const {
    state: { filteredRooms },
    dispatch,
  } = useValue();
  return (
    <Container>
      <div>
        <h3>Immobilier & Maisons à Vendre et à Louer</h3>
      </div>
      <div className="home-img-list">
        <ImageList
          gap={12}
          sx={{
            mb: 8,
            gridTemplateColumns:
              "repeat(auto-fill, minmax(260px, 1fr))!important",
          }}
        >
          {filteredRooms.map((room) => (
            <Card key={room._id} sx={{ maxHeight: 350 }}>
              <ImageListItem sx={{ height: "100% !important" }}>
                <ImageListItemBar
                  sx={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)",
                  }}
                  title={
                    room.type === "rent"
                      ? "A Louer " + room.price + " DA"
                      : "A Vendre " + room.price + " DA"
                  }
                  actionIcon={
                    <Tooltip title={room.uName} sx={{ mr: "5px" }}>
                      <Avatar src={room.uPhoto} />
                    </Tooltip>
                  }
                  position="top"
                />
                <img
                  className="img-card-home"
                  src={room.images[0]}
                  alt={room.title}
                  loading="lazy"
                  style={{ cursor: "pointer", height: "220px" }}
                  onClick={() =>
                    dispatch({ type: "UPDATE_ROOM", payload: room })
                  }
                />
                <ImageListItemBar
                  title={room.title}
                  actionIcon={
                    <Rating
                      sx={{ color: "rgba(255,255,255, 0.8)", mr: "5px" }}
                      name="room-rating"
                      defaultValue={3.5}
                      precision={0.5}
                      emptyIcon={
                        <StarBorder sx={{ color: "rgba(255,255,255, 0.8)" }} />
                      }
                    />
                  }
                />
              </ImageListItem>
            </Card>
          ))}
        </ImageList>
      </div>
    </Container>
  );
};

export default Rooms;
