import {
  AppBar,
  Avatar,
  Box,
  Container,
  Dialog,
  IconButton,
  Rating,
  Slide,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { useValue } from "../../context/ContextProvider";
import { Close, StarBorder } from "@mui/icons-material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow, Lazy, Zoom } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/lazy";
import "swiper/css/zoom";
import "./swiper.css";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" {...props} ref={ref} />;
});

const Room = () => {
  const {
    state: { room },
    dispatch,
  } = useValue();

  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (room) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${room.lng},${room.lat}.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setPlace(data.features[0]));
    }
  }, [room]);

  const handleClose = () => {
    dispatch({ type: "UPDATE_ROOM", payload: null });
  };

  return (
    <Dialog
      fullScreen
      open={Boolean(room)}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar position="relative" sx={{ backgroundColor: "#040030f2" }}>
        <Toolbar>
          <Typography variant="h6" component="h3" sx={{ ml: 2, flex: 1 }}>
            {room?.title}
          </Typography>
          <IconButton color="inherit" onClick={handleClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ pt: 5, borderRadius: "15px" }}>
        <Swiper
          modules={[Navigation, Autoplay, EffectCoverflow, Lazy, Zoom]}
          centeredSlides
          slidesPerView={2}
          grabCursor
          navigation
          autoplay
          lazy
          zoom
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          className="images-sec"
        >
          {room?.images?.map((url) => (
            <SwiperSlide key={url}>
              <div className="swiper-zoom-container">
                <img src={url} alt="room" />
              </div>
            </SwiperSlide>
          ))}
          <Tooltip
            title={room?.uName || ""}
            sx={{
              position: "absolute",
              bottom: "8px",
              left: "8px",
              zIndex: 2,
            }}
          >
            <Avatar src={room?.uPhoto} />
          </Tooltip>
        </Swiper>
        <Stack sx={{ p: 3 }} spacing={2}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              flexWrap: "wrap",
              padding: "10px",
            }}
          >
            <Box
              sx={{
                background:
                  room?.type === "rent"
                    ? "linear-gradient(to right, #0b0178f2, #0f00aef2)"
                    : "linear-gradient(to right, #cc233c, #d60265)",
                color: "#fff",
                borderRadius: "8px",
                padding: "2px 8px",
                display: "inline-block",
                margin: "5px 0",
              }}
            >
              <Typography variant="h6" component="span">
                {room?.type === "rent" ? "A louer" : "A vendre"}
              </Typography>
            </Box>

            <Box sx={{ margin: "5px 0" }}>
              <Typography variant="h6" component="span">
                {room?.type === "rent" ? "Prix par Nuit: " : " Prix: "}
              </Typography>
              <Typography component="span">{room?.price} DA</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "5px 0",
              }}
            >
              <Typography variant="h6" component="span">
                {"Ratings: "}
              </Typography>
              <Rating
                name="room-ratings"
                defaultValue={3.5}
                precision={0.5}
                emptyIcon={<StarBorder />}
              />
            </Box>
          </Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography variant="h6" component="span">
                {"Lieu/wilaya: "}
              </Typography>
              <Typography component="span">{place?.text}</Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="span">
                {"Adresse: "}
              </Typography>
              <Typography component="span">{place?.place_name}</Typography>
            </Box>
          </Stack>
          <Stack>
            <Typography variant="h6" component="span">
              {"Détails: "}
            </Typography>
            <Typography component="span">{room?.description}</Typography>
          </Stack>
        </Stack>
      </Container>
    </Dialog>
  );
};

export default Room;
