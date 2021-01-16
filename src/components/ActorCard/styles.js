import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  media: {
    height: 250,
    width: 150,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    filter: "drop-shadow(0 0 0.75rem black)",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    padding: "0 16px",
  },
  cardActions: {
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderBottom: "10px solid white",
  },
  activeCard: {
    borderBottom: "10px solid #22289a",
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },

  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
});
